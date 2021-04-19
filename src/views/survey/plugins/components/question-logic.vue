<template>
    <el-dialog title="跳转逻辑" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="true" @close="dialogClose" width="700px">
        <el-form ref="dataForm" :model="dataForm">
            <div class="data-box">
                <div class="row-number">共<i>{{dataForm.logicRow.length}}</i>条跳转逻辑</div>
                <el-row class="task-row" v-for="(st, index) in dataForm.logicRow" :key="index">
                    <el-col :span="11">
                        <el-form-item label="如果本题选中" label-width="110px" :prop="'logicRow.'+index+'.option'" :rules="dataRule.option">
                            <el-select v-model="st.option" placeholder="请选择" style="width: 100%;">
                                <el-option
                                    v-for="item in options"
                                    :key="item.uuid"
                                    :label="item.title"
                                    :title="item.title"
                                    :value="item.uuid"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="则跳转到" label-width="100px" :prop="'logicRow.'+index+'.question'" :rules="dataRule.question">
                            <el-select v-model="st.question" :disabled="!st.option" placeholder="请选择" style="width: 100%;">
                                <el-option
                                    v-for="item in questions"
                                    :key="item.uuid"
                                    :label="item.questiontitle"
                                    :title="item.questiontitle"
                                    :value="item.uuid"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label="" class="btn-act el-text-right">
                            <el-button type="text" title="删除" icon="el-icon-delete" class="btn-delete" @click="deleteRow(index)"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="tips" v-if="msg">
                {{msg}}
            </div>
            <el-row class="add-warp el-text-right1">
                <el-button icon="el-icon-plus" @click="add" :loading="loading" type="primary" plain size="mini">添加</el-button>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" :loading="loading" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            visible: false,
            options: [],
            questions: [],
            dataRule: {
                option: [{required: true, message: '请选择选项', trigger: 'change'}],
                question: [{required: true, message: '请选择跳转到', trigger: 'change'}]
            },
            dataForm: {
                logicRow: [{
                    option: '',
                    question: ''
                }]
            },
            loading: false,
            questionIndex: '',
            msg: ''
        }
    },
    computed: {
        ...mapState({
            questionnaireTitle: state => state.survey.questionnaireTitle,
            questionnaireDesc: state => state.survey.questionnaireDesc,
            questionList: state => state.survey.questionList
        })
    },
    methods: {
        dialogClose() {
            this.$refs.dataForm.clearValidate()
            this.dataForm = {
                logicRow: [{
                    option: '',
                    question: ''
                }]
            }
        },
        init(index) {
            this.visible = true
            this.questionIndex = index
            let {options} = this.questionList[index]
            let question = this.questionList.filter((v, i) => i > index)
            this.options = options
            this.questions = question
            let nextQuestion = this.questionList[index].nextQuestion
            if (nextQuestion && nextQuestion.length > 0) {
                nextQuestion.map((i, n) => {
                    if (n < nextQuestion.length - 1) {
                        this.dataForm.logicRow.push({
                            option: '',
                            question: ''
                        })
                    }
                    this.dataForm.logicRow[n].option = i.option
                    this.dataForm.logicRow[n].question = this.questions.some(m => m.uuid === i.question) ? i.question : ''
                })
            }
        },
        add() {
            this.dataForm.logicRow.push({
                option: '',
                question: ''
            })
        },
        deleteRow(e) {
            this.dataForm.logicRow.splice(e, 1)
        },
        isRepeat(arr, key) {
            let  hash = {}
            for (let i in arr) {
                if (hash[arr[i][key]]) {
                    return [true, i]
                }
                hash[arr[i][key]] = true
            }
            return [false, -1]
        },
        dataFormSubmit() {
            this.msg = ''
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    let d = this.isRepeat(this.dataForm.logicRow, 'option')
                    if (d[0]) {
                        this.msg = '已经有相同的选项了'
                        return false
                    }
                    // console.log(this.dataForm.logicRow)
                    let data = JSON.parse(JSON.stringify(this.questionList))
                    data[this.questionIndex].nextQuestion = this.dataForm.logicRow
                    this.saveLogic(data)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        async saveLogic(d) {
            this.loading = true
            let data = {questionnaireTitle: this.questionnaireTitle, questionnaireDesc: this.questionnaireDesc, questionList: d}
            let param = {
                id: this.$router.currentRoute.query.id,
                name: this.questionnaireTitle,
                description: this.questionnaireDesc,
                questionnaireJson: JSON.stringify(data)
            }
            let {code, msg} = await this.$post('/sino-resource/questionnaire/submit', param)
            if (code === 200) {
                this.$message.success('操作成功')
                this.visible = false
                this.$store.commit('survey/QUESTIONLIST', d)
            } else {
                this.$message.error(msg)
            }
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
.row-number {
    padding: 0 0 10px 0;
    color: #999;
    i {
        margin: 0 5px;
        font-weight: bold;
    }
}
.task-row {
    .btn-act {
        padding-left: 20px;
    }
}
.data-box {
    overflow: auto;
    max-height: 300px;
}
.add-warp {
    margin: 5px 0 10px 0;
}
.btn-delete {
    color: red;
}
.tips {
    color: red;
    padding-bottom: 8px;
}
</style>

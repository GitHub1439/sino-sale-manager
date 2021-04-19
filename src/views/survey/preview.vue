<template>
    <div class="question-wrap preview-page" v-loading.fullscreen="isloading">
        <template v-if="!isPerfection">
            <div class="question-header" v-if="questionList.length > 0">
                <div class="question-title">
                    {{questionnaireTitle}}
                </div>
                <div class="question-desc">
                    {{questionnaireDesc}}
                </div>
            </div>

            <div class="question-list" ref="parent-component">
                <div
                    class='element-item-pane'
                    v-for="(item, index) in questionList"
                    :key="item.id"
                    :data-uuid="item.uuid"
                >
                    <component
                        class="element-pane"
                        :is="item.elName"
                        :ref="'component' + index"
                        v-bind="{index: index, itemData: item, questiontitle: item.questiontitle, options: item.options}"
                    />
                </div>
                <tempty v-if="questionList.length === 0" class="bgff"></tempty>
                <div v-if="questionList.length > 0 && !this.queryParam.answerId" class="action-wrap">
                    <el-button class="btn-submit" type="primary" @click="submit" size="medium">提交</el-button>
                </div>
            </div>
            <!-- <div class="submit-wrap">
                <el-button type="primary" @click="submit">提交</el-button>
            </div> -->
        </template>
        <div v-else class="complate">
            感谢您参与本调查，您的意见对我们很重要。
        </div>
    </div>
</template>

<script>
import {registerComponentsObject} from './preview/index'
import {Base64} from 'js-base64'
export default {
    components: {
        // 批量注册组件
        ...registerComponentsObject
    },
    data() {
        return {
            queryParam: {
                answerId: '',
                questionnaireId: ''
            },
            questionnaireTitle: '',
            questionnaireDesc: '',
            questionList: '',
            isloading: false,
            isPerfection: false // 答完题后标示
        }
    },
    created() {
        this.queryParam = {
            answerId: this.$router.currentRoute.query.answerId,
            id: this.$router.currentRoute.query.id,
            userId: this.$router.currentRoute.query.userId,
            accountId: this.$router.currentRoute.query.accountId,
            ticketId: this.$router.currentRoute.query.ticketId
        }
        if (this.queryParam.answerId) { // 查看填写的问卷
            this.$message('获取答题id:' + this.queryParam.answerId)
            this.previewAnswerData()
        } else {
            this.getData()
        }
    },
    methods: {
        async previewAnswerData() {
            this.isloading = true
            let param = {
                answerId: this.queryParam.answerId,
                questionnaireId: this.queryParam.id,
                userId: this.queryParam.userId
            }
            let {data, code} = await this.$post('/sino-resource/questionnaire/answer/result/list', param)
            if (code === 200) {
                let {name, description, questionnaireJson, answerOptionList} = data
                document.title = name || '暂无数据'
                this.questionnaireTitle = name
                this.questionnaireDesc = description
                let questionList = questionnaireJson ? JSON.parse(questionnaireJson).questionList.map(m => {
                    return {...m, answerOptionList}
                }) : []
                this.questionList = questionList
            }
            this.isloading = false
        },
        async getData() {
            this.isloading = true
            let param = {
                id: this.queryParam.id
            }
            let {data, code} = await this.$get('/sino-resource/questionnaire/detail', param)
            if (code === 200) {
                let {name, description, questionnaireJson} = data
                document.title = name || '暂无数据'
                this.questionnaireTitle = name
                this.questionnaireDesc = description
                this.questionList = questionnaireJson ? JSON.parse(questionnaireJson).questionList : []
            }
            this.isloading = false
        },
        async submit() {
            if (!this.queryParam.userId) {
                this.$message.error('没有答题用户')
                return
            }
            let verify = []
            let answer = []
            this.questionList.map((v, index) => {
                let component = this.$refs['component' + index][0]
                // console.log(v.options, component.value)
                let data = component.validate && component.validate()
                verify.push(data)
                let questionType = {'sn-radio': 0, 'sn-checkbox': 1, 'sn-text': 2, 'sn-textarea': 3}
                if (v.elName === 'sn-radio' || v.elName === 'sn-checkbox') {
                    if (component.value) {
                        let op = v.options.filter(s => component.value.includes(s.uuid))
                        op.map(z => {
                            answer.push({title: z.title, content: z.content, optionId: z.uuid, optionType: questionType[v.elName], questionId: v.uuid})
                        })
                    }
                } else {
                    let item = v.options.find(x => x.uuid)
                    answer.push({title: item.title, content: item.content, optionId: item.uuid, optionType: questionType[v.elName], questionId: v.uuid})
                }
            })
            let param = {
                answer,
                questionnaireId: this.queryParam.id,
                accountId: this.queryParam.accountId,
                userId: this.queryParam.userId // 档案id
            }
            // console.log(verify)
            if (verify.every(v => v)) { // 验证通过
                this.isloading = true
                let data = await this.$post('/sino-resource/questionnaire/batch/answer', param)
                if (data) {
                    this.sendMsg(data.data)
                    this.isPerfection = true
                }
                this.isloading = false
            }
        },
        async sendMsg(e) {

            let url = 'https://platformdev.sinocare.com/#/preview?id='
            + this.queryParam.id
            + '&userId=' + this.queryParam.userId
            + '&answerId=' + e
            let param = {
                ticketId: this.queryParam.ticketId,
                answerId: e,
                url: Base64.encode(url)
            }
            await this.$post('/sino-chat/questionnaire/accept', param)

        }
    }
}
</script>

<style lang="scss" scoped>
.bgff {
    padding: 60px 0;
}
.element-item-pane, .question-header {
    margin-bottom: 0 !important;
}
.submit-wrap {
    text-align: center;
    background: #fff;
    position: fixed;
    height: 60px;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.action-wrap {
    background: #fff;
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid #DEE3EF;
    .btn-submit {
        width: 150px;
    }
}
.complate {
    background: #fff;
    max-width: 1000px;
    padding: 60px 0;
    text-align: center;
    font-size: 16px;
}
</style>

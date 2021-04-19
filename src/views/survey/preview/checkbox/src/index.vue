
<template>
    <div class="sur-item">
        <!-- <div class="sur-qus-box">
            <div class="sur-number">Q{{index+1}}</div>
        </div> -->
        <div class="sur-content">
            <div class="sur-title">Q{{index+1}}、{{questiontitle}}</div>
            <div class="sur-option-list">
                <div class="sur-checkbox">
                    <el-checkbox-group v-model="value" size="mini" :disabled="isPreview">
                        <el-checkbox :label="item.uuid" v-for="(item, key) in options" :key="key">
                            {{item.title}}
                            <el-input
                                class="mgl30"
                                type="text"
                                :disabled="isPreview"
                                :maxlength="item.customattr.charcountlimit ? item.customattr.charcount : ''"
                                v-model="item.content"
                                v-if="value.indexOf(item.uuid) > -1 && item.customattr.allownull"
                            ></el-input>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="error-msg" v-if="isShow">{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import initConfig from '../../../config/init-config'
export default {
    name: 'SnCheckbox', // 标签名<sn-checkbox></sn-checkbox>
    props: {
        itemData: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: null
        },
        questiontitle: {
            type: String,
            default: '多选题'
        },
        options: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            value: [],
            msg: '',
            isShow: false,
            isPreview: false
        }
    },
    mounted() {
        // 查看答题信息
        if (this.itemData.answerOptionList && this.itemData.answerOptionList.length > 0) {
            let checked = []
            this.itemData.answerOptionList.map(v => {
                if (v.questionId === this.itemData.uuid) {
                    this.isPreview = true
                    checked.push(v.optionId)
                    let index = this.options.findIndex(s => s.uuid === v.optionId)
                    this.options[index].content = v.content
                }
                this.value = checked
            })
        }
    },
    methods: {
        validate() {
            this.isShow = false
            if (this.value.length === 0) {
                this.isShow = true
                this.msg = '请选择一个选项'
                return false
            }
            
            return this.options.map(v => {
                if (Object.keys(v.customattr).length > 0) {
                    if ((!v.content || !v.customattr.notfilled) && this.value.indexOf(v.uuid) > -1) {
                        if (v.customattr.checkmethod) {
                            let {reg, title} = initConfig.ruleOption.find(m => m.method === v.customattr.checkmethod) // 获取验证规则
                            let regEp = new RegExp(reg)
                            console.log(regEp.test(v.content))

                            if (!regEp.test(v.content))  {
                                this.isShow = true
                                this.msg = `请输入正确的${title}`
                                return false
                            }
                            return true
                        }
                        return true
                    }
                    return true
                }
                return true
            }).every(s => s)
        }
    }
}
</script>

<style lang="scss" scoped>
.sur-checkbox {
    .el-checkbox {
        height: 32px;
        line-height: 32px;
        margin-bottom: 5px;
        display: block;
    }
}
</style>

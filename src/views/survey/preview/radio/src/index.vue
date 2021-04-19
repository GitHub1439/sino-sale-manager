
<template>
    <div class="sur-item">
        <!-- <div class="sur-qus-box">
            <div class="sur-number">Q{{index+1}}</div>
        </div> -->
        <div class="sur-content">
            <div class="sur-title">Q{{index+1}}、{{questiontitle}}</div>
            <div class="sur-option-list">
                <div class="sur-radio">
                    <el-radio-group v-model="value" size="mini" :disabled="isPreview">
                        <el-radio :label="item.uuid" v-for="(item, key) in options" :key="key">
                            {{item.title}}
                            <el-input
                                class="mgl30"
                                type="text"
                                :disabled="isPreview"
                                :maxlength="item.customattr.charcountlimit ? item.customattr.charcount : ''"
                                v-model="item.content"
                                v-if="item.uuid === value && item.customattr.allownull"
                            >
                            </el-input>
                        </el-radio>
                    </el-radio-group>
                    <div class="error-msg" v-if="isShow">{{msg}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import initConfig from '../../../config/init-config'
export default {
    name: 'SnRadio', // 标签名<sn-radio></sn-radio>
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
            default: '单选题'
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
            value: '',
            msg: '',
            isShow: false,
            isPreview: false
        }
    },
    mounted() {
        // 查看答题信息
        if (this.itemData.answerOptionList && this.itemData.answerOptionList.length > 0) {
            this.itemData.answerOptionList.map(v => {
                if (v.questionId === this.itemData.uuid) {
                    this.isPreview = true
                    this.value = v.optionId
                    let index = this.options.findIndex(s => s.uuid === v.optionId)
                    this.options[index].content = v.content
                }
            })
        }
    },
    methods: {
        validate() {
            this.isShow = false
            if (!this.value) {
                this.isShow = true
                this.msg = '请选择一个选项'
                return false
            }
            return this.options.map(v => {
                if (Object.keys(v.customattr).length > 0) {
                    if ((!v.content || !v.customattr.notfilled) && this.value === v.uuid) {
                        if (v.customattr.checkmethod) {
                            let {reg, title} = initConfig.ruleOption.find(m => m.method === v.customattr.checkmethod) // 获取验证规则
                            let regEp = new RegExp(reg)
                            console.log(regEp.test(v.content))
                            if (!regEp.test(v.content) || v.content === '')  {
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
            }).find(s => s)
        }
    }
}
</script>

<style lang="scss" scoped>
.sur-radio {
    .el-radio {
        height: 32px;
        line-height: 32px;
        margin-bottom: 5px;
        display: block;
    }
}
</style>

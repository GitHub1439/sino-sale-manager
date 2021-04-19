
<template>
    <div class="sur-item">
        <!-- <div class="sur-qus-box">
            <div class="sur-number">Q{{index+1}}</div>
        </div> -->
        <div class="sur-content">
            <div class="sur-title">Q{{index+1}}、{{questiontitle}}</div>
            <div class="sur-option-list">
                <div v-for="(item, key) in options" :key="key" class="input-wrrap">
                    <el-input v-model="item.content" type="textarea" rows="5" :disabled="isPreview" :maxlength="itemData.customattr.charcountlimit ? itemData.customattr.charcount : ''"></el-input>
                </div>
            </div>
            <div class="error-msg mgl10" v-if="isShow">{{msg}}</div>
        </div>
    </div>
</template>

<script>
import initConfig from '../../../config/init-config'
export default {
    name: 'SnTextarea', // 标签名<sn-textarea></sn-textarea>
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
            default: '多行填空题'
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
            msg: '请输入内容',
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
            })
        }
    },
    methods: {
        validate() {
            this.isShow = false
            /* return this.options.map(v => {
                if (v.content) {
                    return true
                }
                this.isShow = true
                return false
            }).find(s => s) */
            let content = this.options[0].content
            if (content === '') {
                this.isShow = true
                return false
            }
            let v = this.itemData
            if (Object.keys(v.customattr).length > 0) {
                if (content && v.customattr.checkmethod) {
                    let {reg, title} = initConfig.ruleOption.find(m => m.method === v.customattr.checkmethod) // 获取验证规则
                    let regEp = new RegExp(reg)
                    if (!regEp.test(content) || content === '')  {
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
    }
}
</script>

<style lang="scss" scoped>
</style>

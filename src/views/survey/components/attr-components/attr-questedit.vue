<template>
    <div class="components-attr-wrapper scrollbar-wrapper">
        <div class="attr-title text-center">
            <span>Q{{getActiveQuestionIndex+1}}. 题目设置</span>
        </div>
        <div class="attr-wrapper">
            <div class="attr-item-edit" v-if="logic">
                <div class="lable ellipsis">
                    逻辑设置
                </div>
                <div class="content">
                    <a href="javascript:void(0);" @click="setting">设置</a>
                </div>
            </div>
        </div>
        <div class="attr-wrapper" v-if="isInput">
            <div class="attr-item-edit">
                <div class="lable ellipsis">
                    在选项后增加填空框
                </div>
                <div class="content">
                    <el-switch v-model="activeEle.allownull" size="mini"></el-switch>
                </div>
            </div>
            <div class="attr-item-edit" v-if="activeEle.allownull">
                <div class="lable">
                    内容限制
                </div>
                <div class="content">
                    <el-select v-model="activeEle.checkmethod" placeholder="请选择" style="width: 100px;" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.method"
                            :label="item.title"
                            :value="item.method"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="attr-item-edit" v-if="activeEle.allownull">
                <div class="lable">
                    <template v-if="activeEle.charcountlimit">
                        字数限制<el-input v-model="activeEle.charcount" @input="input" size="mini" style="width: 70px; margin: 0 5px;"></el-input>字内
                    </template>
                    <template v-else>
                        字数限制
                    </template>
                </div>
                <div class="content">
                    <el-switch v-model="activeEle.charcountlimit" size="mini"></el-switch>
                </div>
            </div>
            <!-- <div class="attr-item-edit" v-if="activeEle.allownull">
                <div class="lable">
                    该空可不填
                </div>
                <div class="content">
                    <el-switch v-model="activeEle.notfilled" size="mini"></el-switch>
                </div>
            </div> -->
        </div>
        <!-- <div>选项设置</div>
        <div class="attr-wrapper">
            <div class="attr-item-edit">
                <div class="lable">
                    选项随机排列
                </div>
                <div class="content">
                    <el-switch v-model="activeEle.isrequired" size="mini"></el-switch>
                </div>
            </div>
            <div class="attr-item-edit">
                <div class="lable ellipsis">
                    选项布局
                </div>
                <div class="content">
                    <el-radio-group v-model="activeEle.columncount">
                        <el-radio-button label="1">单列</el-radio-button>
                        <el-radio-button label="2">2列</el-radio-button>
                        <el-radio-button label="3">3列</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div> -->
        <question-logic v-if="logicVisible" ref="reflogic"></question-logic>
    </div>
</template>

<script>
import questionLogic from '@/views/survey/plugins/components/question-logic'
import {mapGetters} from 'vuex'
import initConfig from '../../config/init-config'
export default {
    components: {
        questionLogic
    },
    data() {
        return {
            logicVisible: false,
            options: initConfig.ruleOption
        }
    },
    computed: {
        ...mapGetters('survey', [
            'getActiveQuestion',
            'getActiveQuestionIndex'
        ]),
        activeEle() {
            if (this.getActiveQuestion) {
                return this.getActiveQuestion.customattr
            }  // crucial initialization processing
            return {}
        },
        isInput() {
            return this.getActiveQuestion && (this.getActiveQuestion.elName === 'sn-text' || this.getActiveQuestion.elName === 'sn-textarea')
        },
        logic() {
            return this.getActiveQuestion && this.getActiveQuestion.elName === 'sn-radio'
        }
    },
    methods: {
        input(e) { // 只能输入数字
            if (!e) return
            let str = e.replace(/[^0-9]/ig, '')
            this.activeEle.charcount = str
        },
        setting() {
            this.logicVisible = true
            this.$nextTick(() => {
                this.$refs.reflogic.init(this.getActiveQuestionIndex)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.components-attr-wrapper {
    padding: 10px;
}
.attr-title {
    padding: 10px 0;
    position: relative;
    span {
        padding: 5px;
        background: #495165;
        color: #fff;
    }
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        background: #ddd;
        height: 1px;
        left: 0;
        bottom: -10px;
    }
}

.attr-wrapper {
    margin-top: 20px;
}
.attr-item-edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    line-height: 30px;
    height: 30px;
    .content {
        padding-right: 10px;
    }
}
</style>

<template>
    <div class="components-attr-wrapper scrollbar-wrapper">
        <div class="attr-title text-center">
            <span>Q{{getActiveQuestionIndex+1}}. 选项{{getActiveOptionIndex+1}} 的设置</span>
        </div>
        <div class="attr-wrapper">
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
            <div class="attr-item-edit" v-if="activeEle.allownull">
                <div class="lable">
                    该空可不填
                </div>
                <div class="content">
                    <el-switch v-model="activeEle.notfilled" size="mini"></el-switch>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import initConfig from '../../config/init-config'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            options: initConfig.ruleOption
        }
    },
    computed: {
        ...mapGetters('survey', [
            'getActiveQuestionIndex',
            'getActiveQuestion',
            'getActiveOptionIndex'
        ]),
        activeEle() {
            if (this.getActiveQuestion) {
                return this.getActiveQuestion.options[this.getActiveOptionIndex].customattr
            }  // crucial initialization processing
            return {}
            
        }
    },
    methods: {
        input(e) { // 只能输入数字
            if (!e) return
            let str = e.replace(/[^0-9]/ig, '')
            this.activeEle.charcount = str
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
    height: 30px;
    .content {
        padding-right: 10px;
    }
}
</style>


<template>
    <quesionItemwrap v-bind="{index: index, questiontitle}">
        <div class="sur-option-list">
            <ul class="sur-radio">
                <li v-for="(item, key) in options" :key="key">
                    <div class="sur-item-wrap">
                        <span class="icon"></span>
                        <span
                            class="label sur-hoverbg"
                            contenteditable
                            @keydown="pasteKeydown"
                            @paste="pasteTextFormat"
                            @blur="titleHanlder('UPDATEOPTIONTITLE', $event, {index, key})"
                        >{{item.title}}</span>
                        <span class="label-input" v-if="item.customattr && item.customattr.allownull">
                            <span class="sur-option-input"></span>
                            <!-- <el-input size="small" placeholder="请输入"></el-input> -->
                        </span>
                        <optionCommon :data="{qindex: index, oindex: key, ...item}"></optionCommon>
                    </div>
                </li>
            </ul>
            <div class="sur-action-wrap">
                <a class="sur-action-btnitem" href="javascript:void(0);" @click="addOption({index})"><i class="el-icon-plus"></i>添加选项</a>
                <el-popover
                    class="sur-action-btnitem"
                    popper-class="sur-popover"
                    placement="top"
                    width="400"
                    trigger="click"
                    @hide="text=''"
                    v-model="visible"
                >
                    <div class="sur-action-popover-title">
                        <div class="title">批量添加选项</div>
                        <div>每行代表一个选项，可以添加多个选项</div>
                    </div>
                    <el-input v-model="text" type="textarea" rows="4"></el-input>
                    <div class="sur-popover-btn">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="batchAdd({index})">确定</el-button>
                    </div>
                    <a href="javascript:void(0);" slot="reference">
                        <i class="el-icon-finished"></i>
                        批量添加选项
                    </a>
                </el-popover>
            </div>
        </div>
    </quesionItemwrap>
</template>

<script>
import mixin from '@/views/survey/utils/mixin'
import {createUUID} from '@/views/survey/utils/index'
import optionCommon from '../../components/option-common'
import quesionItemwrap from '../../components/quesion-itemwrap'
export default {
    name: 'SnRadio', // 标签名<sn-radio></sn-radio>
    props: {
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
                let options = []
                for (let i = 0; i < 3; i++) {
                    options.push({
                        uuid: createUUID(),
                        title: '选项' + (i + 1),
                        content: '',
                        customattr: {}
                    })
                }
                return options
            }
        }
    },
    inject: ['regist'],
    mixins: [mixin],
    components: {
        quesionItemwrap,
        optionCommon
    },
    data() {
        return {
            visible: false,
            text: ''
        }
    },

    methods: {
        editormainScroll() { // 滚动时隐藏popver ， 防止遮挡顶部导航
            this.visible = false
        },
        titleHanlder(type, e, arg) {
            let data = {
                qindex: arg.index,
                oindex: arg.key,
                title: e.target.textContent
            }
            this.$store.commit(`survey/${type}`, data)
        },
        addOption(arg) { // 添加单个选项
            let number = this.options.length + 1
            let data = {qindex: arg.index, title: '选项' + number, uuid: createUUID()}
            this.$store.commit('survey/ADDOPTION', data)
        },
        batchAdd(arg) { // 添加多个选项
            if (!this.text) {
                this.$message({type: 'warning', message: '请输入选项名称'})
                return
            }
            let text = this.text.split('\n')
            for (let i = 0; i < text.length; i++) {
                const element = text[i]
                if (element !== '') {
                    let data = {qindex: arg.index, title: element, uuid: createUUID()}
                    this.$store.commit('survey/ADDOPTION', data)
                }
            }
            this.visible = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

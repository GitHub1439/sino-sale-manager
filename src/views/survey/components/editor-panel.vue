<template>
    <div class="question-wrap">
        <div class="question-header">
            <div
                @keydown="pasteKeydown"
                @paste="pasteTextFormat"
                @blur="titleHanlder('title', $event)"
                maxlength="300"
                class="question-title sur-hoverbg"
                contenteditable="true"
            >
                {{questionnaireTitle}}
            </div>
            <div
                @keydown="pasteKeydown"
                @paste="pasteTextFormat"
                @blur="titleHanlder('desc', $event)"
                maxlength="255"
                class="question-desc sur-hoverbg"
                contenteditable="true"
            >
                {{questionnaireDesc}}
            </div>
        </div>
        <div :class="['question-list', {'dragwrap-list': dragwrap}]" ref="parent-component">
            <draggable
                v-model="comList"
                :options="{scroll: true, animation: 150}"
                :scroll-sensitivity="150"
                :force-fallback="true"
                handle=".dragclass"
                @start="dragwrap=true"
                @end="dragwrap=false"
                ghost-class="ghost"
            >
                <div
                    :class="['element-item-pane', {'active': item.uuid === activeElementUUID}]"
                    v-for="(item, index) in comList"
                    :key="item.id"
                    :data-uuid="item.uuid"
                    @click="handleTopWrapperClick"
                    @mouseup="handleMouseDownOnElement(item.uuid)"
                >
                    <span class="el-icon-rank dragclass"></span>
                    <component class="element-pane" :is="item.elName" v-bind="{index: index, itemData: item, questiontitle: item.questiontitle, options: item.options}" />
                </div>
            </draggable>
            <tempty v-if="comList.length === 0" class="bgff"></tempty>
        </div>
    </div>
</template>

<script>
import $bus from '@/views/survey/utils/bus'
import draggable from 'vuedraggable'
import {registerComponentsObject} from '../plugins/index'
import {mapState} from 'vuex'
import mixin from '@/views/survey/utils/mixin'
export default {
    mixins: [mixin],
    components: {
        draggable,
        // 批量注册组件
        ...registerComponentsObject
    },
    provide() {
        return {
            regist: registerComponentsObject
        }
    },
    data() {
        return {
            dragwrap: false
        }
    },
    computed: {
        ...mapState({
            questionnaireTitle: state => state.survey.questionnaireTitle,
            questionnaireDesc: state => state.survey.questionnaireDesc,
            questionList: state => state.survey.questionList,
            activeElementUUID: state => state.survey.activeElementUUID
        }),
        comList: {
            get() {
                return this.$store.state.survey.questionList
            },
            set(value) {
                console.log(value)
                this.$store.commit('survey/QUESTIONLIST', value)
            }
        }
    },
    created() {
        $bus.$on('item-focus', this.itemFocus)
        $bus.$on('item-copyfocus', this.itemFocus)
    },
    methods: {
        handleMouseDownOnElement(e) {
            this.$store.commit('survey/ATTRRIGHTOPEDITOR', false)
            if (e !== this.activeElementUUID) {  // 如果已经是当前选择的element，则不做处理
                this.$store.commit('survey/ACTIVEELEMENTUUID', e)
                this.$store.commit('survey/ATTRRIGHTEDITOR', false)
                setTimeout(() => {
                    this.$store.commit('survey/ATTRRIGHTEDITOR', true)
                }, 300)
            }
        },
        handleTopWrapperClick(e) {
            e.stopPropagation()
            e.preventDefault()
        },
        // element：dom元素
        // to：滚动到哪个位置
        // duration: 动画时长
        scrollToTop(element, to, duration) {
            if (duration <= 0) return
            const diff = to - element.scrollTop
            const perTick = diff / duration * 10
            this.timer = setTimeout(() => {
                element.scrollTop += perTick
                if (element.scrollTop === to) return
                this.scrollToTop(element, to, duration - 10)
            }, 10)
        },
        itemFocus(jumpLength, iscopyScoll) {
            let item = this.$refs['parent-component']
            const element = document.querySelector('.editor-main .el-scrollbar__wrap')
            if (item) {
                const ele = item.children[0].children[jumpLength - 1].children
                this.elementFocus(ele)
                if (iscopyScoll) { // 复制后滚动到对应位置
                    let elepanl = document.querySelectorAll('.element-item-pane')
                    let scrollTop = 0 // 计算滚动位置的高度
                    for (let i = 0; i < elepanl.length; i++) {
                        const v = elepanl[i]
                        scrollTop += 10 + v.offsetHeight // +10px 为margin-bottom 的距离
                        if (i === jumpLength - 1) break
                    }
                    this.scrollToTop(element, scrollTop - 150, 300)
                }
            }
        },
        elementFocus(ele) {
            if (ele.length === 0) return;
            [].some.call(ele, e => {
                // 注意：这里的 clss="sur-title" 每一个题目中只能存在一个
                if (e.className.indexOf('sur-title') !== -1) {
                    e.focus()
                    this.keepLastIndex(e)
                    return true
                }
                if (e.children.length > 0) {
                    this.elementFocus(e.children)
                }
            })
        },
        keepLastIndex(obj) { // 光标移至最后
            if (window.getSelection) {
                obj.focus()
                let range = window.getSelection()
                range.selectAllChildren(obj)
                range.collapseToEnd()
            } else if (document.selection) {
                let range = document.selection.createRange()
                range.moveToElementText(obj)
                range.collapse(false)
                range.select()
            }
        },
        titleHanlder(type, e) {
            if (type === 'title') {
                this.$store.commit('survey/UPDATEQUESTIONNAIRETITLE', e.target.textContent)
            }
            if (type === 'desc') {
                this.$store.commit('survey/UPDATEQUESTIONNAIREDESC', e.target.textContent)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

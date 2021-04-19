<template>
    <div class="components-libs-wrapper scrollbar-wrapper">
        <p class="page-title text-center">组件库</p>
        <el-scrollbar style="height: 100%;">
            <ul class="scrollbar-wrapper">
                <li v-for="(item, index) in componentsList" :key="index" class="clearfix paddingB30">
                    <div class="components-libs-title">
                        <p>{{item.title}}</p>
                    </div>
                    <div v-if="item.components && item.components.length">
                        <div class="components-lib-item" v-for="(element,i) in item.components" :key="i" @click="handleClick(element)">
                            <div class="lib-item-img">
                                <icon-svg :name="element.pluginIcon"></icon-svg>
                            </div>
                            <p class="lib-item-title">{{element.pluginTitle}}</p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="gray text-center paddingT20">待完善...</p>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {camelCase} from 'lodash'
import $bus from '@/views/survey/utils/bus'
import {createUUID} from '@/views/survey/utils/index'
import eleConfig from '../config/ele-config'
import {registerComponentsObject} from '../plugins/index'
console.log(registerComponentsObject)
export default {
    name: 'ComponentLibs',
    data() {
        return {
            componentsList: eleConfig
        }
    },
    computed: {
        ...mapState({
            jumpLength: state => state.survey.questionList.length
        })
    },
    methods: {
        handleClick(item) {
            let props = this.getComponentProps(item.elName)
            let uuid = createUUID()
            let data = {uuid, elName: item.elName, plugin: item, customattr: {}, ...props}
            this.$store.commit('survey/ADDQUESTION', data)
            this.$nextTick(() => {
                const element = document.querySelector('.editor-main .el-scrollbar__wrap')
                if (element) {
                    // 滚动至最后
                    this.scrollToTop(element, element.scrollHeight, 300)
                    this.$store.commit('survey/ACTIVEELEMENTUUID', uuid)
                    this.$store.commit('survey/ATTRRIGHTEDITOR', false)
                    // 等待动画执行完成，在触发获取焦点事件
                    setTimeout(() => {
                        $bus.$emit('item-focus', this.jumpLength)
                        this.$store.commit('survey/ATTRRIGHTEDITOR', true)
                    }, 300)
                }
            })
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
        /**
         * 根据elname获取组件默认props数据
         * @param elName
         */
        getComponentProps(elName) {
            let elComponentData
            for (let key in registerComponentsObject) {
                if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
                    elComponentData = registerComponentsObject[key]
                    break
                }
            }
            if (!elComponentData) return {}
            let props = {}
            for (let key in elComponentData.props) {
                props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
            }
            return props
        }
    }
}
</script>

<style lang="scss" scoped>
.components-libs-wrapper {
    user-select: none;
    height: 100%;
    padding-top: 60px;
    position: relative;
    & ul {
        padding: 10px;
    }
}

.page-title {
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
}

.components-libs-title {
    margin-bottom: 16px;
}

.components-lib-item {
    color: #424242;
    text-align: center;
    background: #f4f4f4;
    width: 80px;
    float: left;
    padding: 6px 0;
    margin: 5px;
    border: 1px solid #dddddd;
    font-size: 12px;
    cursor: pointer;
    transition: All 0.3s ease-in-out;
    &:hover {
        background: #fff;
        border: 1px solid #0073cf;
        color: #0073cf;
    }
}
.lib-item-img {
    font-size: 16px;
}
.lib-item-title {
    margin: 0;
}
.gray {
    color: #7f8593;
    text-align: center;
}
</style>

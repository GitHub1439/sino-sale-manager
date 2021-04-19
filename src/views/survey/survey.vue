<template>
    <div class="page-survey" @click="handleClickOut" v-loading="loading">
        <div class="page-header-wrapper">
            <page-header></page-header>
            <controlBar @save="save" @show-preview="showPreviewPage" @publish="publish" />
        </div>
        <div class="page-editor editor-wrapper sub-page">
            <div class="pane-side-left el-side-edit-wrapper">
                <!--左侧导航-->
                <div class="editor-side-bar border-R">
                    <el-tabs tab-position="left" v-model="activeSideBar" style="height: 100%;">
                        <template v-for="(item, index) in sidebarMenus">
                            <el-tab-pane :name="item.value" :key="index">
                                <el-tooltip slot="label" class="item" effect="dark" :content="item.label" placement="right">
                                    <i :class="item.elementUiIcon"></i>
                                </el-tooltip>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
                <!--组件&模板-->
                <div class="editor-page-edit-wrapper">
                    <componentLibs v-if="activeSideBar === 'componentLibs'" />
                    <templateLibs v-if="activeSideBar === 'templateLibs'" />
                </div>
            </div>
            <!--页面编辑区域-->
            <div class="editor-main">
                <el-scrollbar style="height: 100%;" :active="true">
                    <editorPanel />
                </el-scrollbar>
            </div>
            <!--属性编辑区域-->
            <div class="pane-side-right el-attr-edit-wrapper">
                <el-scrollbar @click.native="handleClick" style="height: 100%;" :class="['el-attr-side-wrapper', {'active': attrRightEditor}]">
                    <transition name="animate">
                        <attrOpEdit v-if="attrRightOpEditor"></attrOpEdit>
                    </transition>
                    <transition name="animate">
                        <attrQuestEdit v-if="!attrRightOpEditor"></attrQuestEdit>
                    </transition>
                </el-scrollbar>
            <!-- <el-tabs v-model="activeAttr">
                <el-tab-pane label="整题设置" name="整题设置">
                    <attrQuestEdit></attrQuestEdit>
                </el-tab-pane>
                <el-tab-pane label="选项设置" name="选项设置">
                    <attrOpEdit></attrOpEdit>
                </el-tab-pane>
            </el-tabs> -->
            </div>
        </div>
    </div>
</template>

<script>
import editorPanel from './components/editor-panel'
import PageHeader from './components/page-header'
import componentLibs from './components/componentlibs'
import templateLibs from './components/templatelibs'
import controlBar from './components/control-bar'
import attrQuestEdit from './components/attr-components/attr-questedit'
import attrOpEdit from './components/attr-components/attr-opedit'
import {mapState} from 'vuex'

export default {
    components: {
        componentLibs,
        templateLibs,
        editorPanel,
        PageHeader,
        controlBar,
        attrQuestEdit,
        attrOpEdit
    },
    data() {
        return {
            loading: false,
            showPreview: false,
            activeAttr: '整题设置',
            activeSideBar: 'componentLibs',
            sidebarMenus: [{
                label: '组件列表',
                value: 'componentLibs',
                elementUiIcon: 'el-icon-s-operation'
            }/* ,
            {
                label: '模板库',
                value: 'templateLibs',
                elementUiIcon: 'el-icon-files'
            } */]
        }
    },
    computed: {
        ...mapState({
            attrRightEditor: state => state.survey.attrRightEditor,
            attrRightOpEditor: state => state.survey.attrRightOpEditor,

            questionnaireTitle: state => state.survey.questionnaireTitle,
            questionnaireDesc: state => state.survey.questionnaireDesc,
            questionList: state => state.survey.questionList
        })
    },
    beforeRouteLeave (to, from, next) {
        this.$confirm('确定要返回吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            next()
        }).catch(() => {
            next(false)
        })
    },
    created() {
        this.initPageData()
    },
    methods: {
        async initPageData() {
            this.loading = true
            // "questionnaireDesc":"感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
            let param = {
                id: this.$router.currentRoute.query.id
            }

            let {data, code} = await this.$get('/sino-resource/questionnaire/detail', param)
            if (code === 200) {
                let {name, description, questionnaireJson} = data
                this.$store.commit('survey/UPDATEQUESTIONNAIRETITLE', name)
                this.$store.commit('survey/UPDATEQUESTIONNAIREDESC', description)
                this.$store.commit('survey/QUESTIONLIST', questionnaireJson ? JSON.parse(questionnaireJson).questionList : [])
            }
            this.loading = false
        },
        handleClick(e) {
            e.stopPropagation()
            e.preventDefault()
        },
        handleClickOut(e) {
            if (!e.target.classList.contains('element-item-pane') && !e.target.classList.contains('el-attr-side-wrapper')) {
                this.$store.commit('survey/ACTIVEELEMENTUUID', '')  // 清空选中的问题uuid
                this.$store.commit('survey/ACTIVEELEMENTOPTIONID', '') // 清空选中的选项的索引
                this.$store.commit('survey/ATTRRIGHTEDITOR', false) // 隐藏右侧面板
                this.$store.commit('survey/ATTRRIGHTOPEDITOR', false) // 隐藏右侧编辑属性面板
            }
        },
        showPreviewPage() {
            console.log('预览')
            let id = this.$router.currentRoute.query.id
            window.open(location.origin + `/#/preview?id=${id}`)
        },
        async publish() {
            console.log('发布')
            let id = this.$router.currentRoute.query.id
            let res = await this.$post(`/sino-resource/questionnaire/publish?id=${id}`)
            if (res && res.code === 200) {
                this.$message.success('发布成功！')
            }
        },
        async save() {
            this.loading = true
            let d = {questionnaireTitle: this.questionnaireTitle, questionnaireDesc: this.questionnaireDesc, questionList: this.questionList}
            console.log(d)
            let param = {
                id: this.$router.currentRoute.query.id,
                name: this.questionnaireTitle,
                description: this.questionnaireDesc,
                questionnaireJson: JSON.stringify(d)
            }
            let {code, msg} = await this.$post('/sino-resource/questionnaire/submit', param)
            if (code === 200) {
                this.$message.success('操作成功')
                this.initPageData()
            } else {
                this.$message.error(msg)
            }
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
.page-survey {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    height: 100%;
    padding-top: 48px;
    /deep/ .el-loading-mask {
        z-index: 2000 !important;
    }
    .page-header-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2000;
    }
    &.hideHeader{
        padding-top: 0;
    }
}
.editor-wrapper {
    display: flex;
    height: 100%;
    position: relative;
    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .editor-side-bar {
        width: 55px;
    }
    .editor-page-edit-wrapper {
        width: 210px;
        padding: 0 1px;
    }
    .editor-main {
        flex: 1;
        background: #E3E6EC;
        position: relative;
        overflow: auto;
    }
    .el-attr-edit-wrapper {
        width: 280px;
        padding: 0;
    }
}

.animate-enter{
    opacity:  0;
}
.animate-enter-active{
    transition: all 1s ease;
}
/* .animate-enter {
    animation: animate .5s;
}
.animate-leave {
    animation: animate .5s reverse;
}
@keyframes animate {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
} */
.control-bar-wrapper {
    position: absolute;
    top: -44px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1000;
}

</style>
<style lang="scss">
html,body{
  position: relative;
  height: 100%;
}
.editor-side-bar {
    .el-tabs__item.is-active {
        background: rgba(37, 165, 137, 0.09);
    }
}
.pane-side-left {
    display: flex;
    background: #fff;
}
.pane-side-right {
    position: relative;
    overflow: hidden;
    .el-attr-side-wrapper {
        transition: all .3s;
        position: absolute;
        right: -100%;
        width: 100%;
        background: #fff;
        &.active {
            right: 0;
        }
    }
}
.el-attr-edit-wrapper {
    .el-tabs {
        height: 100%;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 10px;
    }
    .el-tabs__content {
        height: calc(100% - 55px);
        & > div {
            height: 100%;
        }
        .attr-edit-inner {
            padding-left: 16px;
            padding-right: 16px;
        }
    }
}
.sub-page{
  position: relative;
  height: 100%;
}
</style>

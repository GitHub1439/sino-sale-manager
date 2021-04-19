<template>
    <div class="components-page-header">
        <div class="logo-wrapper cursor-pointer">
            <span class="el-icon-back btn-back" @click="$router.push('moudulequestion-question-index')"></span>
            <span>问卷管理</span>
        </div>
        <slot></slot>
        <div class="pull-right">
            <!-- <el-button type="primary" @click="save">发布</el-button> -->
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'PageHeader',
    components: {},
    data() {
        return {}
    },
    computed: {
        ...mapState({
            questionnaireTitle: state => state.survey.questionnaireTitle,
            questionnaireDesc: state => state.survey.questionnaireDesc,
            questionList: state => state.survey.questionList
        })
    },
    methods: {
        async save() {
            let d = {questionnaireTitle: this.questionnaireTitle, questionnaireDesc: this.questionnaireDesc, questionList: this.questionList}
            console.log(d)
            let param = {
                id: this.$router.currentRoute.query.id,
                name: this.questionnaireTitle,
                description: this.questionnaireDesc,
                questionnaireJson: JSON.stringify(this.questionList)
            }
            let {code, msg} = await this.$post('/sino-resource/questionnaire/update', param)
            if (code === 200) {
                this.$message.success('修改成功')
            } else {
                this.$message.error(msg)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-back {
    margin-right: 25px;
    cursor: pointer;
}
.components-page-header {
    height: 48px;
    line-height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(195, 195, 195, 0.6);
}

.logo-wrapper {
    font-size: 18px;
    color: #000;
    line-height: 44px;
    font-weight: bold;
    display: inline-block;
    img {
        position: relative;
        top: 6px;
        width: 26px;
        height: 28px;
        display: inline-block;
        margin-right: 8px;
    }
}

.el-dropdown-link {
    color: white;
}
.user-header-image {
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 4px;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    margin-top: -5px;
}
.pull-right {
    float: right;
}
</style>

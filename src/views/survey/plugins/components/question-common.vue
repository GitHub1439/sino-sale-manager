
<template>
    <div class="sur-qus-action">
        <el-tooltip class="item" effect="light" content="上移" placement="left">
            <span class="el-icon-arrow-up" @click="action('up')"></span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="下移" placement="left">
            <span class="el-icon-arrow-down" @click="action('down')"></span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="逻辑设置" placement="left" v-if="logic">
            <span>
                <el-badge :value="badge.length" class="item" v-if="badge.length > 0">
                    <span class="el-icon-link" @click="action('logic')"></span>
                </el-badge>
                <span v-else class="el-icon-link" @click="action('logic')"></span>
            </span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="复制" placement="left">
            <span class="el-icon-copy-document" @click="action('copy')"></span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="left">
            <span class="el-icon-delete" @click="action('delete')"></span>
        </el-tooltip>
        <question-logic v-if="logicVisible" ref="reflogic"></question-logic>
    </div>
</template>

<script>
import $bus from '@/views/survey/utils/bus'
import questionLogic from './question-logic'
import {mapState} from 'vuex'
export default {
    components: {
        questionLogic
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            logicVisible: false
        }
    },
    computed: {
        ...mapState({
            questionList: state => state.survey.questionList
        }),
        logic() {
            return this.questionList[this.data.index].elName === 'sn-radio'
        },
        badge() {
            return this.questionList[this.data.index].nextQuestion || ''
        }
    },
    methods: {
        action(type) {
            switch (type) {
            case 'up':
            case 'down':
                this.$store.commit('survey/MOVEQUESTION', {direct: type, qindex: this.data.index})
                break
            case 'logic':
                this.logicVisible = true
                this.$nextTick(() => {
                    this.$refs.reflogic.init(this.data.index)
                })
                break
            case 'copy':
                this.$store.commit('survey/COPYQUESTION', {qindex: this.data.index})
                this.$store.commit('survey/ACTIVEELEMENTUUID', this.questionList[this.data.index + 1].uuid)
                this.$nextTick(() => {
                    $bus.$emit('item-copyfocus', this.data.index + 2, true)
                })
                break
            case 'delete':
                this.$confirm('是否确认删除?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
                    this.$store.commit('survey/DELETEQUESTION', {qindex: this.data.index})
                }).catch(() => {/*  */})
                break
            default: break
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

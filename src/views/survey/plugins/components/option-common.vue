
<template>
    <span class="sur-option-astion">
        <!-- <el-tooltip class="sur-tooltip" effect="light" content="上移" placement="top"> -->
        <span class="sur-tooltip el-icon-top" @click="action('up')" title="上移"></span>
        <!--   </el-tooltip>
        <el-tooltip class="sur-tooltip" effect="light" content="下移" placement="top"> -->
        <span class="sur-tooltip el-icon-bottom" @click="action('down')" title="下移"></span>
        <!--  </el-tooltip>
        <el-tooltip class="sur-tooltip" effect="light" content="设置" placement="top"> -->
        <span class="sur-tooltip el-icon-setting" @click="action('setting')" title="设置"></span>
        <!--   </el-tooltip>
        <el-tooltip class="sur-tooltip" effect="light" content="删除" placement="top"> -->
        <span class="sur-tooltip el-icon-delete" @click="action('delete')" title="删除"></span>
        <!--  </el-tooltip> -->
    </span>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    components: {
    },
    data() {
        return {

        }
    },
    methods: {
        action(type) {
            let data = {direct: type, qindex: this.data.qindex, oindex: this.data.oindex}
            switch (type) {
            case 'up':
            case 'down':
                this.$store.commit('survey/MOVEOPTION', data)
                break
            case 'setting':
                this.$store.commit('survey/ATTRRIGHTOPEDITOR', true)  // 显示右侧属性编辑
                this.$store.commit('survey/ACTIVEELEMENTOPTIONID', this.data.oindex) // 选择的option ID
                break
            case 'delete':
                this.$store.commit('survey/DELETEOPTION', data)
                break
            default: break
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

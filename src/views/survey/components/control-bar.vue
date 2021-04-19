<template>
    <div class="components-contrl-bar">
        <div class="button-item" @click="showPreview">
            <i class="el-icon-view"></i>
            <p>预览</p>
        </div>
        <div class="button-item" @click="save">
            <i class="el-icon-collection"></i>
            <p>保存</p>
        </div>
        <div class="button-item" @click="publishFn">
            <i class="el-icon-edit-outline"></i>
            <p>发布</p>
        </div>
        <!-- <div class="button-item" @click="cancelFn">
            <i class="el-icon-suitcase"></i>
            <p>退出</p>
        </div> -->
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        // 是否loading
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        save() { // 保存
            this.$emit('save')
        },
        showPreview() { // 显示预览
            this.$emit('show-preview')
        },
        publishFn() { // 发布
            this.$emit('publish')
        },
        cancelFn() {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss" scoped>
.components-contrl-bar {
    display: inline-block;
    z-index: 3;
    height: 48px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .button-item {
        display: inline-block;
        width: 60px;
        cursor: pointer;
        text-align: center;
        vertical-align: bottom;
        font-size: 14px;
        transition: color 0.1s, transform 0.1s;
        user-select: none;
        &:hover {
            color: #0073cf;
        }
        &.disabled {
            cursor: not-allowed;
            color: #ccc !important;
        }
        & > i {
            font-size: 18px;
            display: inline-block;
            transition: all 0.1s;
        }
        & > p {
            font-size: 14px;
            margin: 0;
        }
    }
}

</style>

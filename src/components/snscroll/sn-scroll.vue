<template>
    <div :style="{height: boxHeight}" class="internet">
        <!-- <el-scrollbar style="height:100%"> -->
        <div class="infinite-list-wrapper sn-scroll" style="overflow:auto" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <slot></slot>
            <div class="load-status" v-if="!noMore">
                <span>加载中</span>
                <div class="loading-ani"></div>
            </div>
            <p class="load-status" v-else>没有更多了</p>
        </div>
        <!-- </el-scrollbar> -->
    </div>
</template>
<script>
/**
 * @name SnScroll (组件名称)
 * @module @/components/snscroll/sn-scroll
 * @desc 组件-滚动翻页组件
 * @author Wangming
 * @date 2020-08-03
 * @param {Boolean} [noMore]    - 是否已加载完所有数据
 * @param {Boolean} [loading]    - 是否正在请求数据中
 * @param {String} [heightReduce]    - 滚动盒子相对于父级需要减去的高度
 * @param {Function} [loadMore]    - 翻页时的回调
 * @example 调用示例
 *  <sn-scroll
 *     :no-more="false"
 *     :loading="false"
 *     heightReduce="32px"
 *     loadMore="loadMore"
 * ></sn-scroll>
 */
export default {
    props: {
        heightReduce: {
            type: String,
            default: '0px'
        },
        noMore: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        boxHeight() {
            return `calc(100% - ${this.heightReduce})`
        },
        disabled() {
            return this.loading || this.noMore
        }
    },
    methods: {
        load() {
            console.error(444)
            this.$emit('loadMore')
        }
    }
}
</script>
<style lang="scss" scoped>
.internet {
    .infinite-list-wrapper {
        height: 100%;
        overflow: auto;
    }
}
// ::-webkit-scrollbar {
//     display: none; /* Chrome Safari */
// }
</style>

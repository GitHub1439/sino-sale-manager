<template>
    <div :class="['empty-wrap', classname]">
        <img v-if="isshowimg" :src="imgUrl" alt="" />
        <div class="empty-text">{{description}}</div>
        <slot name="content"></slot>
    </div>
</template>
<script>
/**
 * @name Empty (组件名称)
 * @module @/components/Empty/index
 * @desc 组件- 无数据提示
 * @author wanmin
 * @date 2020-08-04
 * @param {Boolean} [isshowimg]    - 是否显示图片
 * @param {String} [className]    - 自定义class
 */
export default {
    name: 'Empty',
    props: {
        classname: {
            default: '',
            type: String
        },
        description: {
            default: '暂无数据',
            type: String
        },
        imgUrl: {
            default: require('@/assets/images/icon-nodata.png'),
            type: String
        },
        isshowimg: {
            default: true,
            type: Boolean
        }
    }
}
</script>
<style lang="scss">
.empty-wrap {
    text-align: center;
    padding: 20px 0;
    img{
        width: 100px;
    }
    .nodata-class {
        width: 100px;
        height: 100px;
        overflow: hidden;
    }
    .empty-text {
        line-height: 30px;
        color: #9BABC8;
    }
}
</style>

<template>
    <svg :class="getClassName" aria-hidden="true">
        <use :xlink:href="getName"></use>
    </svg>
</template>

<script>
/**
 * @name IconSvg (组件名称)
 * @module @/components/iconsvg/index
 * @desc 组件-svg图表
 * @author wanmin
 * @date 2020-08-04
 * @param {String} [name]    - svg名称
 * @param {String} [className]    - 自定义class
 */
export default {
    name: 'IconSvg',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        getName() {
            return `#icon-${this.name}`
        },
        getClassName() {
            return [
                'icon-svg',
                `icon-svg__${this.name}`,
                this.className && /\S/.test(this.className) ? `${this.className}` : ''
            ]
        }
    }
}
</script>

<style>
.icon-svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>


<template>
    <div class="sur-item">
        <div class="sur-qus-box">
            <div class="sur-number">Q{{index+1}}</div>
            <questionCommon :data="{index}"></questionCommon>
        </div>
        <div class="sur-content">
            <div class="sur-title sur-hoverbg" contenteditable @keydown="pasteKeydown" @paste="pasteTextFormat" @blur="titleHanlder('UPDATEQUESTIONTITLE', $event, {index})">{{questiontitle}}</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import mixin from '@/views/survey/utils/mixin'
import questionCommon from './question-common'
export default {
    props: {
        index: {
            type: Number,
            default: null
        },
        questiontitle: {
            type: String,
            default: ''
        }
    },
    mixins: [mixin],
    components: {
        questionCommon
    },
    data() {
        return {

        }
    },
    created() {
        // console.log(this.$props)
    },
    methods: {
        titleHanlder(type, e, arg) {
            let data = {
                qindex: arg.index,
                oindex: arg.key,
                title: e.target.textContent
            }
            this.$store.dispatch(`survey/${type}`, data)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

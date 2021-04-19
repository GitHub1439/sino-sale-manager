
<template>
    <div class="sur-item">
        <div class="sur-qus-box">
            <div class="sur-number">Q{{index+1}}</div>
            <questionCommon :data="{index}"></questionCommon>
        </div>
        <div class="sur-content">
            <div class="sur-title sur-hoverbg" contenteditable @keydown="pasteKeydown" @paste="pasteTextFormat" @blur="titleHanlder('UPDATEQUESTIONTITLE', $event, {index})">{{questiontitle}}</div>
            <div class="sur-option-list">
                <div v-for="(item, key) in options" :key="key" class="input-wrrap">
                    <el-input v-model="item.content"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '@/views/survey/utils/mixin'
import {createUUID} from '@/views/survey/utils/index'
import questionCommon from '../../components/question-common'
export default {
    name: 'SnText', // 标签名<sn-text></sn-text>
    props: {
        index: {
            type: Number,
            default: null
        },
        questiontitle: {
            type: String,
            default: '填空题'
        },
        options: {
            type: Array,
            default: () => {
                return [{uuid: createUUID(), title: '', content: '', customattr: {}}]
            }
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
    methods: {
        titleHanlder(type, e, arg) {
            let data = {
                qindex: arg.index,
                oindex: arg.key,
                title: e.target.textContent
            }
            this.$store.commit(`survey/${type}`, data)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

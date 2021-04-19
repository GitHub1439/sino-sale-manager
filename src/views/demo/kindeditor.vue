<template>
    <div class="mod-wrap">
        <schedule></schedule>
        <div class="kind-wrap bgff">
            <kind-editor ref="kindeditor" :content="content" @input="getContent"></kind-editor>
        </div>
    </div>
</template>

<script>
import KindEditor from '@/components/kindeditor'
export default {
    components: {
        KindEditor
    },
    data() {
        return {
            content: '<strong><span style="font-size:32px;">component: _import(\'global/home\'),</span><span style="font-size:32px;"></span></strong>'
        }
    },
    methods: {
        // 获取编辑器内容
        getContent(content) {
            console.log(content)
            this.content = content
        }
    }
}
</script>
<style lang="scss" scoped>
    .kind-wrap {
        padding: 10px;
    }
</style>

<template>
    <div
        class="edit-div"
        v-html="innerText"
        :contenteditable="canEdit"
        @focus="isLocked = true"
        @blur="blur"
        @input="changeText"
        @keydown="pasteKeydown"
        @paste="pasteTextFormat"
        @keyup.enter="submit"
    >
    </div>
</template>
<script>
export default {
    name: 'SnInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        canEdit: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            innerText: this.value,
            isLocked: false
        }
    },
    watch: {
        value() {
            if (!this.isLocked && !this.innerText) {
                this.innerText = this.value
            }
        }
    },
    methods: {
        reflush() { // 暴露手动更新
            this.innerText = this.value
        },
        clear() {
            this.innerText = ''
            this.$el.innerHTML = ''
        },
        focus() { // 暴露手动获取焦点
            this.$el.focus()
            this.$nextTick(() => {
                this.keepLastIndex(this.$el)
            })
        },
        changeText() {
            this.$emit('input', this.$el.innerHTML)
        },
        blur() {
            this.isLocked = false
            // this.$emit('blur', e);
            /* [].forEach.call(document.querySelector('.edit-div').querySelectorAll('.video-wrap'), (ev) => {
                ev.onfocus = function() {
                    console.log(ev)
                    ev.blur()
                }
            }) */
        },
        submit(e) {
            this.$emit('submit', e)
        },
        pasteKeydown(e) {
            if (e.keyCode === 13) {
                e.preventDefault()// 禁用回车的默认事件
            }
        },
        keepLastIndex(obj) {
            if (window.getSelection) { // ie11 10 9 ff safari
                obj.focus() // 解决ff不获取焦点无法定位问题
                const range = window.getSelection() // 创建range
                range.selectAllChildren(obj) // range 选择obj下所有子内容
                range.collapseToEnd() // 光标移至最后
            } else if (document.selection) { // ie10 9 8 7 6 5
                const range = document.selection.createRange() // 创建选择对象
                // const range = document.body.createTextRange();
                range.moveToElementText(obj) // range定位到obj
                range.collapse(false) // 光标移至最后
                range.select()
            }
        },
        pasteTextFormat (e) { // 去除复制时的格式
            e.preventDefault()
            let text
            let clp = (e.originalEvent || e).clipboardData
            if (clp === undefined || clp === null) {
                text = window.clipboardData.getData('text') || ''
                if (text !== '') {
                    if (window.getSelection) {
                        let newNode = document.createElement('span')
                        newNode.innerHTML = text
                        window.getSelection().getRangeAt(0).insertNode(newNode)
                    } else {
                        document.selection.createRange().pasteHTML(text)
                    }
                }
            } else {
                text = clp.getData('text/plain') || ''
                // console.log(text.replace(/[\r\n]/g, ''))
                if (text !== '') {
                    document.execCommand('insertText', false, text.replace(/\r\n/g, ''))  // .replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
                }
            }
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.edit-div {
    width: 100%;
    height: 90px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    &[contenteditable=true]{
        user-modify: read-write-plaintext-only;
        &:empty:before {
            content: attr(placeholder);
            display: block;
            color: #ccc;
        }
    }
}
</style>

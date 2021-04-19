/**
 * 编辑标题相关
 */
export default {
    beforeDestroy() {
        const element = document.querySelector('.editor-main .el-scrollbar__wrap')
        element.removeEventListener('scroll', this.editormainScroll)
    },
    mounted() {
        const element = document.querySelector('.editor-main .el-scrollbar__wrap')
        element.addEventListener('scroll', this.editormainScroll)
    },
    methods: {
        pasteKeydown(e) {
            // console.dir(e.target.attributes.maxlength.value)
            if (e.target.innerText.length >= 200 && e.keyCode !== 8) e.preventDefault()
            if (e.keyCode === 13) {
                e.preventDefault()// 禁用回车的默认事件
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
                if (text !== '') {
                    document.execCommand('insertText', false, text.replace(/[\r\n]/g, ''))  // .replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
                }
            }
        }
    }
}

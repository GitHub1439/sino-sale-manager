/* 元素class 的操作类 */

/* 是否存在class xxx */
export const hasClass = function(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/* 添加样式 */
export const addClass = function(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls
}

/* 移除某个样式 */
export const removeClass = function(obj, cls) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
    }
}

/* 切换某个样式 */
export const toggleClass = function(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls)
    } else {
        addClass(obj, cls)
    }
}

/* 打开一个新的页面 */
export const open = function(url) {
    let a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'link-temp')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('link-temp'))
}

// 获取滚动条的宽度
let scrollBarWidth
export const getScrollBarWidth = function() {
    if (scrollBarWidth !== undefined) return scrollBarWidth

    const outer = document.createElement('div')
    outer.className = 'scrollbar__wrap'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth
    outer.parentNode.removeChild(outer)
    scrollBarWidth = widthNoScroll - widthWithScroll

    return scrollBarWidth
}

// 正整数 包含0
export const isInteger = (e) => {
    return Number.isInteger(e)
}

// 特殊字符串
export const isSpecialCharacters = (e) => {
    // ~!@#$%^&*()_+
    return /^[\u4e00-\u9fa5\w{},:;'",/\.，。；‘：’“”]+$/g.test(e)
}

// 只能输入英文-_3种字符
export const character1Rule = (e) => {
    return /^[a-zA-Z-_]+$/g.test(e)
}

// 是否为url
export const isUrl = (url) => {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(url)
}

/**
 * 判断是否是字符串
 * @param {*} str 权限标识
 * @return true or false
 */
export const isString = (str) => {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * 判断是否是数组
 * @param {*} str 权限标识
 * @return true or false
 */
export const isArray = (arg) => {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

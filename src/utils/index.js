/* eslint-disable prefer-rest-params */
/* eslint-disable dot-notation */
import router from '@/router'
import store from '@/store'
import axios from 'axios'


 	// 全局自定义url字符串拼接的方法
     export function  setPathQuery(url,query) {
        var url = url;
        if (JSON.stringify(query) != '{}') {
            let queryArr = [];
            for (const key in query) {
                if (query.hasOwnProperty(key)) {
                    if (key === 'url') {
                        queryArr.push(`${key}=${encodeURIComponent(query[key])}`)
                    } else {
                        queryArr.push(`${key}=${query[key]}`)
                    }
                }
            }
            if (url.indexOf('?') !== -1) {
                url = `${url}&${queryArr.join('&')}`
            } else {
                url = `${url}?${queryArr.join('&')}`
            }
        }
        return url;
    }

/**
 * 生成uuid
 * @return 一个字符串
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x'
            ? (Math.random() * 16) | 0
            : 'r&0x3' | '0x8'
        ).toString(16)
    })
}

/**
 * 判断权限标识
 * @param {*} key 权限标识
 * @return true or false
 */
export function isAuth(key) {
    return (
        JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(
            key
        ) !== -1 || false
    )
}

/**
 * 树形数据转换
 * @param {*} data 数据 array 格式
 * @param {*} id   树形数据的id
 * @param {*} pid  树形数据的父级id
 * @param {*} childrenKey  嵌套数据children 的 key
 * @param {*} levelKey  数据层级深度
 * @return 转化成新的数组
 */
export function treeDataTranslate(
    data,
    id = 'id',
    pid = 'parentId',
    childrenKey = 'snbMenuList',
    levelKey = '_level'
) {
    let res = []
    let temp = {}
    for (let i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (let k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]][childrenKey]) {
                temp[data[k][pid]][childrenKey] = []
            }
            if (!temp[data[k][pid]][levelKey]) {
                temp[data[k][pid]][levelKey] = 1
            }
            data[k][levelKey] = temp[data[k][pid]][levelKey] + 1
            temp[data[k][pid]][childrenKey].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

/**
 * 设置页面的title
 * @param {*} text title字符串
 * @return void
 */
export function title(text) {
    window.document.title = `${text ? `${text}` : ''}`
}

/**
 * 清除登录信息
 * @return void
 */
export function clearLoginInfo() {
    // console.log('清除登录信息')
    window.localStorage.removeItem('Sino-Auth')
    window.localStorage.removeItem('userInfo')
    store.commit('resetStore')
    router.options.isAddDynamicMenuRoutes = false
}

/**
 * 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
 * @param {*} fn 执行的函数
 * @param {*} interval 间隔的时间
 * @return function
 */
export function throttle(fn, interval = 200) {
    let _self = fn // 保存需要被延迟执行的函数引用
    let firstTime = true // 是否初次调用
    let timer // 定时器
    return function() {
        let args = arguments
        let _me = this
        if (firstTime) {
            // 如果是第一次调用不需要延迟执行
            _self.call(_me, args)
        }
        if (timer) {
            // 如果定时器还在，说明前一次延迟执行还没有完成
            return false
        }
        timer = setTimeout(() => {
            // 延迟一段时间执行
            clearTimeout(timer) // 清除定时器 避免下一次return false
            timer = null
            _self.call(_me, args)
        }, interval)
    }
}

/**
 * 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
 * @param {*} fn 执行的函数
 * @param {*} interval 间隔的时间
 * @return function
 */
export function debounce(fn, interval = 200) {
    let timer
    let _self = fn
    return function() {
        clearTimeout(timer)
        let args = arguments // fn所需要的参数
        let _me = this // 当前的this
        timer = setTimeout(() => {
            _self.call(_me, args)
        }, interval)
    }
}

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 树形数据
 * @param {*} childs 嵌套数据的key
 * @return 新的数组
 */
export function flattenDeep(arr = [], childs) {
    return arr.reduce((flat, item) => {
        return flat.concat(
            item,
            item[childs] ? flattenDeep(item[childs], childs) : []
        )
    }, [])
}

/**
 * 取两个集合的交集
 * @param {*} arrayOne 一个数组
 * @param {*} arrayTwo 另一个数组
 * @return 新的数组
 */
export function intersection(arrayOne, arrayTwo) {
    if (isArray(arrayOne) && isArray(arrayTwo)) {
        return arrayOne.filter(v => arrayTwo.includes(v))
    }
    return []
}

/**
 * 根据字符串拆分成数组
 * @param {*} arr 一个数组
 * @param {*} len 另一个数组
 * @return 数组
 * ex: 如 splitArray('abcdef',3) ->  ["abc", "def"]
          splitArray('abcdef',2) -> ["ab", "cd", "ef"]
 */
export function splitArray(arr, len) {
    if (!arr) return
    let arrlen = arr.length
    let result = []
    for (let i = 0; i < arrlen; i += len) {
        result.push(arr.slice(i, i + len))
    }
    return result
}

/**
 * 解决IE11中Backspace按键会返回到历史记录的问题
 * @return void
 */
export const banBackSpace = () => {
    function onkey(e) {
        let ev = e || window.event
        // 各种浏览器下获取事件对象
        let obj =
            ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget
        // 按下Backspace键
        if (ev.keyCode === 8) {
            // 标签名称
            let tagName = obj.nodeName.toLowerCase()
            // 如果标签不是input或者textarea则阻止Backspace
            if (ieVersion() < 0) {
                if (tagName === 'div' || tagName === 'span') {
                    // question events
                    if (obj.className.indexOf('sur-hoverbg') !== -1) {
                        return true
                    }
                }
            } else {
                if (tagName !== 'input' && tagName !== 'textarea') {
                    return stopIt(ev)
                }
                let tagType = obj.type.toLowerCase() // 标签类型
                // input标签除了下面几种类型，全部阻止Backspace
                if (
                    tagName === 'input' &&
                    tagType !== 'text' &&
                        tagType !== 'textarea' &&
                        tagType !== 'password'
                ) {
                    return stopIt(ev)
                }
                // input或者textarea输入框如果不可编辑则阻止Backspace
                if (
                    (tagName === 'input' || tagName === 'textarea') &&
                    (obj.readOnly === true || obj.disabled === true)
                ) {
                    return stopIt(ev)
                }
            }
        }
        function stopIt(event) {
            if (event.returnValue) {
                // IE浏览器下用 实现阻止元素发生默认的行为
                event.returnValue = false
            }
            if (event.preventDefault) {
                // preventDefault()方法阻止元素发生默认的行为
                event.preventDefault()
            }
            return false
        }
    }
    document.onkeypress = onkey
    document.onkeydown = onkey
}

/**
 * 判断IE版本
 * @return 返回版本号  -1 >时 则为IE浏览器，并返回版本号
 */
export function ieVersion() {
    let {userAgent} = navigator // 取得浏览器的userAgent字符串
    let isIE =
        userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    let isIE11 =
        userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion === 7) {
            return 7
        } else if (fIEVersion === 8) {
            return 8
        } else if (fIEVersion === 9) {
            return 9
        } else if (fIEVersion === 10) {
            return 10
        }
        return 6 // IE版本<=7
    } else if (isEdge) {
        return 'edge' // edge
    } else if (isIE11) {
        return 11 // IE11
    }
    return -1 // 不是ie浏览器
}

/**
 * 获取chrome浏览器的版本
 * @return 返回版本号  -1 >时 则为chrome浏览器，并返回版本号
 */
export function getChromeVersion() {
    let arr = navigator.userAgent.split(' ')
    let chromeVersion = ''
    for (let i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) {
            chromeVersion = arr[i]
        }
    }
    if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0])
    }
    return -1
}

/**
 * 获取字符串所在的索引(中文2字节)
 * @param {*} str 字符串
 * @param {*} index 设置字符的长度
 * @return 索引
 * ex getStrIndex("hi这里是一个字符串glob", 7) -> 4
 *    getStrIndex("hi这里是一个字符串glob", 8) -> 5
 */
export function getStrIndex(str, index) {
    let number = 0
    for (let i = 0; i < str.length; i++) {
        const element = str[i]
        if (/^[\u4e00-\u9fa5]{0,}$/.test(element)) {
            number = number + 2
        } else {
            number = number + 1
        }
        if (number > index) {
            return i
        }
    }
    return number
}

/**
 * 获取字符串的长度(中文占2个字符)
 * @param {*} str 字符串
 * @param {*} index 设置字符的长度
 * @return 字符串的长度
 */
export function getStrLength(e) {
    let num = 0
    for (let i = 0; i < e.length; i++) {
        const element = e[i]
        if (/^[\u4e00-\u9fa5]{0,}$/.test(element)) {
            num = num + 2
        } else {
            num = num + 1
        }
    }
    return num
}

/**
 * 处理elementui下拉框赋值显示key的问题
 * @param {*} refs 组件的refs对象
 * @param {*} context 当前refs所在的上下文
 * @return void
 * ex: 在组件上 <el-select v-model="dataForm.bedId" ref="bedId">
 * 注意这里的ref值 需要和v-model的key保持一致
 * 如  v-model="form1.bedId"  则 ref应该为bedId
 * 在下拉数据处理完成后(包含一些赋值时)， 一定要执行到最后时去处理，不然造成不必要的性能浪费
 */
export function opValue(refs, context) {
    const setValue = (obj, keys, index = 0) => {
        if (index === keys.length - 1) {
            if (context.$refs[keys].multiple) {
                // 如果是多选
                obj[keys[index]] = []
            } else {
                obj[keys[index]] = ''
            }
        } else {
            setValue(obj[keys[index]], keys, ++index)
        }
    }
    for (let i = 0; i < refs.length; i++) {
        const val = context.$refs[refs[i]]
        if (val) {
            let form = val.elForm
            let o = val.options.some(e => e.value === val.value) // 如果将要赋值的值 如果在option中有
            if (!o) {
                let keys = refs[i].split('.')
                setValue(form.model, keys)
            }
        }
    }
}

/**
 * 转换Url参数
 * @export
 * @param {Object} data
 * @return {String}
 * ex: 对象 {name: '张胜男', age: 23}
 * 会转换成 name=张胜男&age=23
 */
export const serialize = data => {
    let list = []
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&')
}

/**
 * 利用 document.title 做新消息提示
 * @export
 * @param {Number} count
 */
export function titleNotify(count) {
    const hasNewMessage = count > 0
    if (hasNewMessage) {
        if (document.title.search(/\((.*?)\)/) >= 0) {
            document.title = document.title.replace(
                /\((.*?)\)/,
                `(${count > 99 ? '99+' : count})`
            )
        } else {
            document.title = `(${count})${document.title}`
        }
    } else {
        document.title = document.title.replace(/\((.*?)\)/, '')
    }
}

/**
 * 根据某个时间查找该时间的上一周（开始时间，结束时间）
 * @export
 * @param {Date}} argTime
 * @return [开始时间，结束时间]
 * ex:
 * let gapTime = new Date('2020-08-12')
 * let [startDate, endDate] = this.getSomeTimesWeekDate(gapTime)
 */
export function getSomeTimesWeekDate(argTime = new Date()) {
    let weekNum = argTime.getDay() // 获取当前是周几
    weekNum = weekNum === 0 ? 7 : weekNum
    let lastDate = new Date(argTime.getTime() - weekNum * 24 * 60 * 60 * 1000)
    let fitstDate = new Date(
        argTime.getTime() - (weekNum + 6) * 24 * 60 * 60 * 1000
    )
    let fitstMonth = `${
        fitstDate.getMonth() + 1 < 10
            ? '0' + (fitstDate.getMonth() + 1)
            : fitstDate.getMonth() + 1
    }`
    let lastMonth = `${
        lastDate.getMonth() + 1 < 10
            ? '0' + (lastDate.getMonth() + 1)
            : lastDate.getMonth() + 1
    }`
    let fitstDay = `${
        fitstDate.getDate() < 10
            ? '0' + fitstDate.getDate()
            : fitstDate.getDate()
    }`
    let lastDay = `${
        lastDate.getDate() < 10 ? '0' + lastDate.getDate() : lastDate.getDate()
    }`

    let startDate = `${fitstDate.getFullYear()}-${fitstMonth}-${fitstDay}`
    let endDate = `${lastDate.getFullYear()}-${lastMonth}-${lastDay}`
    return [startDate, endDate]
}
export function formatSeconds(value) {
    let theTime = parseInt(value) // 秒
    let theTime1 = 0 // 秒
    let theTime2 = 0 // 分
    let theTime3 = 0 // 小时
    let result = ''
    theTime1 =
        parseInt(theTime % 60) > 9
            ? parseInt(theTime % 60)
            : '' + 0 + parseInt(theTime % 60)
    result = '00:' + theTime1
    if (theTime > 59) {
        theTime2 = parseInt(theTime / 60)
        theTime2 > 9 ? '' : (theTime2 = '' + 0 + theTime2)
        result = theTime2 + ':' + theTime1
    }
    if (theTime / 60 > 59) {
        theTime3 = parseInt(theTime2 / 60)
        theTime3 > 9 ? '' : (theTime3 = '' + 0 + theTime3)
        result = theTime3 + ':' + theTime2 + ':' + theTime1
    }
    return result
}
/**
 * 根据身份证获取性别及生日
 * @export
 * @param {Date}} idCard
 * @return {sex: 1，birthday: 1999-02-05}
 * ex:
 */
export function getBasicInfoFromIdcard(idcard) {
    if (!idcard || idcard.length < 15 || idcard.length > 18) return
    let iden = idcard
    let val = idcard.length
    let sex = null
    let birth = null
    let myDate = new Date()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let age = 0

    if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1
        sex = iden.substring(16, 17)
        birth =
            iden.substring(6, 10) +
            '-' +
            iden.substring(10, 12) +
            '-' +
            iden.substring(12, 14)
        if (
            iden.substring(10, 12) < month ||
            (iden.substring(10, 12) === month && iden.substring(12, 14) <= day)
        )
            age++
    }
    if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901
        sex = iden.substring(13, 14)
        birth =
            '19' +
            iden.substring(6, 8) +
            '-' +
            iden.substring(8, 10) +
            '-' +
            iden.substring(10, 12)
        if (
            iden.substring(8, 10) < month ||
            (iden.substring(8, 10) === month && iden.substring(10, 12) <= day)
        )
            age++
    }

    if (sex % 2 === 0) {
        sex = '女'
    } else {
        sex = '男'
    }
    return {
        sex,
        age,
        birthday: birth
    }
}

/**
 * 把数组中的某个数据放到第一
 * @param {*} arr 数组
 * @return 索引
 */
export function sortArrayData(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].ticketId === item.ticketId) {
            arr.splice(i, 1)
            break
        }
    }
    arr.unshift(item)
    return arr
}

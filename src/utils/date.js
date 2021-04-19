export function formatDate(date, fmt) {
    date = new Date(date)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }

    return fmt
}

export function timeParse(time, format) {
    if (time === '' || time === undefined || time === null) { return '' }
    let t = new Date(time)
    t = t.getFullYear() > 0 ? t : new Date(Date.parse(time.replace(/-/g, '/'))) // Safari 出现日期转换的问题
    let tf = function(i) {
        return (i < 10 ? '0' : '') + i
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear())
        case 'MM':
            return tf(t.getMonth() + 1)
        case 'mm':
            return tf(t.getMinutes())
        case 'dd':
            return tf(t.getDate())
        case 'HH':
            return tf(t.getHours())
        case 'ss':
            return tf(t.getSeconds())
        default: break
        }

    })
}
// 最近7天
export function getWeekDay() {
    let nowDate = new Date().getTime()
    return new Date(nowDate - 1000 * 60 * 60 * 24 * 6)
}

export function getDay(day) {
    let nowDate = new Date().getTime()
    return new Date(nowDate - 1000 * 60 * 60 * 24 * day)
}

// 获取当天后n天
export function getNextDay(n) {
    let nextDate = formatDate(new Date(new Date().getTime() + n * 24 * 60 * 60 * 1000))// 后一天
    return nextDate
}

// 最近一个月
export function getMonth(monthNumber) {
    let number = monthNumber || 1
    let end = new Date()
    end.setMonth(end.getMonth() - number)
    return (end.getFullYear()) + '-' + ((end.getMonth() + 1) < 10 ? '0' : '') + (end.getMonth() + 1) + '-' + (end.getDate() < 10 ? '0' : '') + end.getDate()
}

// 最近一年
export function getYear(yearNumber) {
    let number = yearNumber || 1
    let end = new Date()
    end.setFullYear(end.getFullYear() - number)
    return (end.getFullYear()) + '-' + ((end.getMonth() + 1) < 10 ? '0' : '') + (end.getMonth() + 1) + '-' + (end.getDate() < 10 ? '0' : '') + end.getDate()
}

//
export function isToday(date) {
    return date.toDateString() === new Date().toDateString()
}
/**
 * 返回年月日
 * @export
 * @param {Date} date
 * @param {string} [splitor='-']
 * @returns
 */
export function getDate(date, splitor = '-') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
}

/**
 * 返回时分秒/时分
 * @export
 * @param {*} date
 * @param {boolean} [withSecond=false]
 * @returns
 */
export function getTime(date, withSecond = false) {
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return withSecond ? `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}` : `${hour}:${addZeroPrefix(minute)}`
}
/**
 * 个位数，加0前缀
 * @param {*} number
 * @returns
 */
function addZeroPrefix(number) {
    return number < 10 ? `0${number}` : number
}

/**
 * 把秒转成时分秒格式
 * @param {*} result
 * @returns
 */
export function  secondToDate(result) {
    let hour = Math.floor(result / 3600)
    let minute = Math.floor((result / 60 % 60))
    let second = Math.floor((result % 60))
    return  `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}`
}

/**
 * 把时间戳转成标准日期格式
 * @param {*} time
 * @returns
 */
export function formatTime(time) {
    let date = new Date(time * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()
    return Y + M + D + h + m + s
}

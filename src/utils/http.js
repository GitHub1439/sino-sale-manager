import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import {
    clearLoginInfo
} from '@/utils'
import {
    Message
} from 'element-ui'
import {
    Base64
} from 'js-base64'
import website from '@/config/website'
import crypto from '@/utils/crypto'
const http = axios.create({
    timeout: 1000 * 600,
    // withCredentials: true, // 注释解决跨域问题
    validateStatus(status) {
        return status >= 200 && status <= 500
    },
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    let pr = JSON.parse(config.data || null)
    if (pr && pr.isLogin === 1) { // 'Basic c2luby1qaDpzaW5vLWpoLXBsYXRmb3Jt'//lo
        config.headers.Authorization = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`
    }
    config.headers['Sino-Auth'] = localStorage.getItem('Sino-Auth') // 请求头带上token
    // 请求参数处理
    config.data = JSON.stringify(pr)
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    // {code: 200, data: [], msg: "操作成功", success: true}
    if (!(typeof(response.data) === 'object' && Object.prototype.toString.call(response.data).toLowerCase() ===
            '[object object]' && !response.data.length)) {
        response.data = JSON.parse(crypto.decryptAES(response.data, crypto.aesKey))
    }
    // 获取状态码
    const status = response.data.code || response.status
    const isLogin = JSON.parse(response.config.data) && JSON.parse(response.config.data).isLogin
    // const message = response.data.msg || response.data.error_description || '未知错误'
    if (status === 401 && !isLogin) {
        Message({
            type: 'error',
            message: 'token失效，请重新登录',
            customClass: 'hp-outmessage'
        })
        clearLoginInfo()
        router.push({
            replace: true,
            name: 'login',
            params: {
                out: true
            }
        })
    }
    /* if (status !== 200) {
        Message({message, type: 'error'})
        return Promise.reject(new Error(message))
    } */
    return response.data
}, error => {
    return Promise.reject(error)
})

/**
 * 请求地址处理  非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY) ? '/proxyApi/' : window.SITE_CONFIG.baseUrl +
        actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    let defaults = {
        t: new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    let defaults = {
        t: new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * @param {*} url 请求action
 * @param {*} params 请求参数
 */
http.getData = (url, params = {}, openDefultParams = true) => {
    return http({
        url: http.adornUrl(url),
        method: 'get',
        params: http.adornParams(params, openDefultParams)
    })
}

/**
 * @param {*} url 请求action
 * @param {*} params 请求参数
 */
http.postData = (url, params = {}, contentType = 'json') => {
    return http({
        url: http.adornUrl(url),
        method: 'post',
        data: http.adornData(params, true, contentType)
    })
}

/**
 * @param {*} awaitFn promise函数
 */
http.errorCaptured = async (awaitFn) => {
    try {
        let res = await awaitFn
        return [null, res]
    } catch (e) {
        return [e, null]
    }
}

export default http

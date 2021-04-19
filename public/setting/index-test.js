/**
 * 测试环境
 */

(function () {
    window.SITE_CONFIG = {}
    // api接口请求地址
    // window.SITE_CONFIG.baseUrl = 'https://fxdev.sinocare.com/api'
    window.SITE_CONFIG.baseUrl = 'http://192.168.150.137'
    window.SITE_CONFIG.wsUrl = 'https://mpdev.sinocare.com'
    // cdn地址 = 域名 + 版本号
    window.SITE_CONFIG.domain = './' // 域名
    window.SITE_CONFIG.version = '202103091417' // 版本号(年月日时分)
    window.SITE_CONFIG.cdnUrl = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
    window.SITE_CONFIG.tmloginUrl = 'https://supporttest.glucosemanage.com'
    window.SITE_CONFIG.tmfromUrl = 'https://tianmidev.tmqyt.com'
}())

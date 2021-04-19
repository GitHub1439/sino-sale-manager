/**
 * 开发环境 'https://mpdev.sinocare.com'
 * 正式环境 'https://mp.sinocare.com'
 */

(function () {
    window.SITE_CONFIG = {}
    // api接口请求地址
    // window.SITE_CONFIG.baseUrl = 'http://192.168.187.18:7009/framework'
    // window.SITE_CONFIG.baseUrl = 'https://mptest.sinocare.com'
    // window.SITE_CONFIG.wsUrl = 'https://mptest.sinocare.com'
    // window.SITE_CONFIG.baseUrl = 'https://fxdev.sinocare.com/api'
    window.SITE_CONFIG.baseUrl = 'http://192.168.150.137'
    window.SITE_CONFIG.wsUrl = 'http://192.168.150.31:5008'
    // cdn地址 = 域名 + 版本号
    window.SITE_CONFIG.domain = './' // 域名
    window.SITE_CONFIG.version = '2021031501' // 版本号(年月日时分)
    window.SITE_CONFIG.cdnUrl = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
    window.SITE_CONFIG.tmloginUrl = 'https://supporttest.glucosemanage.com'
    window.SITE_CONFIG.tmfromUrl = 'https://tianmidev.tmqyt.com'
}())

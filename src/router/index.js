/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import httpRequest from '@/utils/http'
import {title, clearLoginInfo} from '@/utils'
import {isUrl} from '@/utils/validation'

 import mockRouter from './mockRouter'
    import facmockRouter from './facmockRouter'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import_' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)

const globalRoutes = [{
    path: '/404',
    component: _import('global/404'),
    name: '404',
    meta: {
        title: '404未找到'
    }
}, {
    path: '/login',
    component: _import('global/login'),
    name: 'login',
    meta: {
        title: '登录'
    }
}, {
    path: '/shopInit',
    component: _import('global/shopInit'),
    name: 'shopInit',
    meta: {
        title: '店铺初始化'
    }
}, {
    path: '/test',
    component: _import('demo/test'),
    name: 'test',
    meta: {
        title: 'test'
    }
}, {
    path: '/survey',
    component: _import('survey/survey'),
    name: 'survey',
    meta: {
        title: '问卷编辑'
    }
}, {
    path: '/preview',
    component: _import('survey/preview'),
    name: 'preview',
    meta: {
        title: '预览'
    }
}, {
    path: '/basicinfo',
    component: _import('survey/basicinfo'),
    name: 'basicinfo',
    meta: {
        title: '数据查询'
    }
}, {
    path: '/reportMount',
    component: _import('survey/reportMount'),
    name: 'reportMount',
    meta: {
        title: '数据查询'
    }
}]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: _import('layout/main'),
    name: 'main',
    redirect: {
        name: 'login'
    },
    meta: {
        title: '主入口'
    },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        {
            path: '/home',
            component: _import('global/home'),
            name: 'home',
            meta: {
                title: '首页'
            }
        },
        {
            path: '/editor',
            component: _import('demo/kindeditor'),
            name: 'editor',
            meta: {
                title: 'editor'
            }
        }
    ],
    beforeEnter(to, from, next) {
        let token = window.localStorage.getItem('Sino-Auth')
        if (!token || !/\S/.test(token)) {
            console.log('无token，跳转登录')
            clearLoginInfo()
            next({path: '/login', replace: true, params: {out: true}})
        } else {
            next()
        }
    }
}

const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0
    }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
        next()
    } else {
        // httpRequest.getData('/sino-dst/menu/routes', {}).then((data) => {
        //     if (data && data.code === 200 && data.data.length > 0) {
        //         fnAddDynamicMenuRoutes(data.data)
        //         router.options.isAddDynamicMenuRoutes = true
        //         sessionStorage.setItem('menuList', JSON.stringify(data.data || '[]'))
        //         sessionStorage.setItem('permissions', JSON.stringify(data.data.permissions || '[]'))
        //         NProgress.done()
        //         let checkMenu = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes'))
        //         let is = checkMenu.some(v => v.path.replace('/', '') === to.path.replace('/', ''))
        //               || checkMenu.some(v => v.name.replace('/', '') === to.name.replace('/', ''))
        //         if (is) {
        //             next({...to, replace: true})
        //         } else {
        //             router.push({name: 'home', replace: true, params: {out: true}})
        //         }
        //     } else {
        //         sessionStorage.setItem('menuList', '[]')
        //         sessionStorage.setItem('permissions', '[]')
        //         console.log('%c请求菜单列表和权限失败，跳转至登录页', 'color:#fff; background: #41b883;')
        //         NProgress.done()
        //         router.push({name: 'login', replace: true, params: {out: true}})
        //     }
        // }).catch((e) => {
        //     console.log(`%c${e}请求菜单列表和权限失败，跳转至登录页`, 'color:#fff; background: #41b883;')
        //     next({path: '/login', replace: true, params: {out: true}})
        // })
        if(localStorage.getItem('account_type')=='inner')
        {
            fnAddDynamicMenuRoutes(mockRouter)
            router.options.isAddDynamicMenuRoutes = true
            sessionStorage.setItem('menuList', JSON.stringify(mockRouter || '[]'))
            sessionStorage.setItem('headerMenuList', JSON.stringify(mockRouter || '[]'))
            // sessionStorage.setItem('permissions', JSON.stringify(data.data.permissions || '[]'))
            NProgress.done()
        }else if(localStorage.getItem('account_type')=='syser'){
            fnAddDynamicMenuRoutes(facmockRouter)
            router.options.isAddDynamicMenuRoutes = true
            sessionStorage.setItem('menuList', JSON.stringify(facmockRouter || '[]'))
            sessionStorage.setItem('headerMenuList', JSON.stringify(facmockRouter || '[]'))
            // sessionStorage.setItem('permissions', JSON.stringify(data.data.permissions || '[]'))
            NProgress.done()
        }

        next({...to, replace: true})

    }
})

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 更改标题
    title(to.meta.title)
})
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutesList = []) {
    let temp = []
    for (let i = 0; i < globalRoutesList.length; i++) {
        if (route.path === globalRoutesList[i].path) {
            return 'global'
        } else if (globalRoutesList[i].children && globalRoutesList[i].children.length >= 1) {
            temp = temp.concat(globalRoutesList[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}
// 额外的路由配置
let routerInfo = [
    // /video-interrogation
    {
        name: 'order-list',
        path: 'order-list',
        modules: _import('pages/order/order-list'),
        title: '订单管理'
    },
    {
        name: 'edit-activity',
        path: 'edit-activity',
        modules: _import('pages/activity/edit-activity'),
        title: '编辑活动'
    },
    {
        name: 'edit-factory',
        path: 'edit-factory',
        modules: _import('pages/activity/edit-factory'),
        title: '编辑厂家'
    }
]

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
    let temp = []
    for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
            temp = temp.concat(menuList[i].children)
        } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
            menuList[i].path = menuList[i].path.replace(/^\//, '')
            let route = {
                path: menuList[i].path.replace(/\//g, '-'),
                component: null,
                name: menuList[i].path.replace(/\//g, '-'),
                meta: {
                    id: menuList[i].id,
                    title: menuList[i].name,
                    isDynamic: true,
                    isTab: false,
                    iframeUrl: ''
                }
            }
            // url以http[s]://开头, 通过iframe展示
            if (isUrl(menuList[i].path)) {
                route.path = `i-${menuList[i].id}`
                route.name = `i-${menuList[i].name}`
                route.meta.iframeUrl = menuList[i].path
            } else {
                try {
                    route.component = _import(`pages/${menuList[i].path}`) || null
                } catch (e) {}
            }
            routes.push(route)

            routerInfo.forEach(item => { // 额外的路由处理
                if (routes.every(e => { return e.name !== item.name})) {
                    let rou = {
                        path: item.path,
                        component: item.modules,
                        name: item.name,
                        meta: {title: item.title, isDynamic: true, isTab: true, isMain: false}
                    }
                    routes.push(rou)
                }
            })
        }
    }
    if (temp.length >= 1) {
        fnAddDynamicMenuRoutes(temp, routes)
    } else {
        mainRoutes.name = 'main-dynamic'
        mainRoutes.children = routes
        router.addRoutes([ mainRoutes, {path: '*', redirect: {name: '404'}} ])
        sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    }
}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router

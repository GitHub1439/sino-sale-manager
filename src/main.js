import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/locales'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
import '@/directive/index'
import directive from '@/utils/directive';
import '@/assets/icons/index' // svg图标
import '@/components/index'
import httpRequest from '@/utils/http'
import {isAuth, banBackSpace} from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import mixins from '@/mixins'
import tim from '@/utils/timClient'
import TIM from 'tim-js-sdk'
import API from '@/config/api'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.use(directive)

//   import Print from 'vue-print-nb'
// 　Vue.use(Print);  //注册

import Print from '@/utils/print'
Vue.use(Print) // 注册



Vue.mixin(mixins)
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = {
    size: 'small'
}
Vue.config.productionTip = true
banBackSpace()
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
    require('@/mock')
}
// 挂载全局
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$get = httpRequest.getData // ajax get请求方法
Vue.prototype.$post = httpRequest.postData // ajax post请求方法
Vue.prototype.$cap = httpRequest.errorCaptured // 错误捕获
Vue.prototype.$api = API
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM

Vue.prototype.isAuth = isAuth // 权限方法
// 保存整站vuex本地储存初始状态
window.SITE_CONFIG.storeState = cloneDeep(store.state)




new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

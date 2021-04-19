import Vue from 'vue'
import App from '@/draw/App'
import httpRequest from '@/utils/http'
import 'element-ui/lib/theme-chalk/index.css'
import {Message} from 'element-ui'

Vue.config.productionTip = true
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$get = httpRequest.getData // ajax get请求方法
Vue.prototype.$post = httpRequest.postData // ajax post请求方法
Vue.prototype.$cap = httpRequest.errorCaptured // 错误铺货
Message.install = function (v) {
    v.prototype.$message = Message
}
Vue.use(Message)// 消息提示
new Vue({
    render: h => h(App)
}).$mount('#app')

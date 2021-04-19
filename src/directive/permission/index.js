import Vue from 'vue'
import permission from './permission'

const install = function (vue) {
    vue.directive('permission', permission)
}
Vue.use(install)

export default permission

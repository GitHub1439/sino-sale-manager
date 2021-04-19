import Vue from 'vue'
import {throttle} from '@/utils/'
function onResize(ev, el) {
    const height = document.documentElement.clientHeight - el.offsetTop
    el.style.height = height + 'px'
}
const install = function (vue) {
    vue.directive('auto', {
        bind(el) {
            // console.log(el, binding, vnode)
            setTimeout(() => {
                onResize(null, el)
                window.addEventListener('resize', throttle((event) => onResize(event, el), 1000))
            }, 200)
        },
        unbind() {
            window.removeEventListener('resize', onResize)
        }
    })
}
Vue.use(install)

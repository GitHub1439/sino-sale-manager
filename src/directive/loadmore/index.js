import Vue from 'vue'
const install = function (vue) {
    vue.directive('loadmore', {
        bind(el, binding) {
            const selectWrap = el.querySelector('.el-table__body-wrapper')
            setTimeout(() => {
                selectWrap.addEventListener('scroll', function() {
                    let sign = 100
                    const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
                    if (scrollDistance <= sign) {
                        binding.value()
                    }
                })
                console.log('绑定more事件')
            }, 3000)
        }
    })
}
Vue.use(install)

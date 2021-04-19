import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import locale from 'element-ui/lib/locale';
import cn from './lang/cn'
import en from './lang/en'

Vue.use(VueI18n)

let i18n = new VueI18n({
    locale: 'cn',
    messages: {
        cn,
        en
    }
})

// locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换
export default i18n

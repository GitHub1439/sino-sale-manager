import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import interrogation from './modules/interrogation'
import conversation from './modules/conversation'
import session from './modules/session'
import user from './modules/user'
import healthchat from './modules/healthchat'
import survey from './modules/survey'
import {Message} from 'element-ui'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        current: Date.now(),
        intervalID: 0
    },
    getters: {
        hidden(state) {
            // eslint-disable-next-line no-unused-vars
            const temp = state.current
            // 该方法可以用来判断当前文档中的活动元素是否获得了焦点。
            if (typeof document.hasFocus !== 'function') {
                return document.hidden // 表示页面是（true）否（false）隐藏。
            }
            return !document.hasFocus()
        }
    },
    modules: {
        common,
        interrogation,
        conversation,
        session,
        user,
        healthchat,
        survey
    },
    mutations: {
        // 获取最新时间current,从而更新未读和已读
        STARTCOMPUTECURRENT(state) {
            state.intervalID = setInterval(() => {
                state.current = Date.now()
            }, 500)
        },
        resetStore(state) {
            Object.keys(state).forEach(key => {
                state[key] = cloneDeep(window.SITE_CONFIG.storeState[key])
            })
        },
        showMessage(state, options) {
            if (state.message) {
                state.message.close()
            }
            state.message = Message({
                message: options.message,
                type: options.type || 'success',
                duration: options.duration || 2000,
                offset: 40
            })
        }
    }
})

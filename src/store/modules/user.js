import tim from '@/utils/timClient'
const user = {
    state: {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false, // TIM SDK 是否 ready
        userID: 0,
        userSig: '',
        sdkAppID: 0
    },
    mutations: {
        updateCurrentUserProfile(state, userProfile) {
            state.currentUserProfile = userProfile
        },
        toggleIsLogin(state, isLogin) {
            state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
        },
        toggleIsSDKReady(state, isSDKReady) {
            state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
        },
        reset(state) {
            Object.assign(state, {
                currentUserProfile: {},
                isLogin: false,
                isSDKReady: false // TIM SDK 是否 ready
            })
        },
        // 获取用户信息，id和签名
        GET_USER_INFO(state, payload) {
            state.userID = payload.userID
            state.userSig = payload.userSig
            state.sdkAppID = payload.sdkAppID
        }
    },
    actions: {
        LOGOUT(context) {
            // 若有当前会话，在退出登录时已读上报  context.state.currentConversationPro.godImAcount
            if (context.rootState.session.currentConversationPro.godImAcount) {
                const prevConversationID = 'C2C' + context.rootState.session.currentConversationPro.godImAcount
                tim.setMessageRead({conversationID: prevConversationID})
            }
            tim.logout().then(() => {
                console.log('退出登录了')
                context.commit('reset')
            })
        }
    }
}

export default user

/* eslint-disable no-shadow */
const state = {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'inverse',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'light',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 顶部菜单
    headerMenuList: [],
    headermenuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
}

const mutations = {
    UPDATEDOCUMENTCLIENTHEIGHT(state, height) {
        state.documentClientHeight = height
    },
    UPDATENAVBARLAYOUTTYPE(state, type) {
        state.navbarLayoutType = type
    },
    UPDATESIDEBARLAYOUTSKIN(state, skin) {
        state.sidebarLayoutSkin = skin
    },
    UPDATESIDEBARFOLD(state, fold) {
        state.sidebarFold = fold
    },
    UPDATEMENULIST(state, list) {
        state.menuList = list
    },
    UPDATEMENUACTIVENAME(state, name) {
        state.menuActiveName = name
    },
    UPDATEHEADERMENULIST(state, list) {
        state.headerMenuList = list
    },
    UPDATEHEADERMENUACTIVENAME(state, name) {
        state.headermenuActiveName = name
    },
    UPDATEMAINTABS(state, tabs) {
        state.mainTabs = tabs
    },
    UPDATEMAINTABSACTIVENAME(state, name) {
        state.mainTabsActiveName = name
    },
    UPDATEUSERINFO(state, val) {
        state.userInfo = val
    }
}

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

<template>
    <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
        <div class="site-sidebar__inner">
            <el-menu
                class="site-sidebar__menu"
                :default-active="menuActiveName || 'home'"
                :collapse="sidebarFold"
                :collapse-transition="false"
                :unique-opened="true"
            >
                <template v-if="menuList.length == 0">
                    <div class="nodata-tips">
                        没有侧栏菜单
                    </div>
                </template>
                <template v-else>
                    <sub-menu v-for="menu in menuList" :key="menu.menuId" :menu="menu" :dynamicmenuroutes="dynamicMenuRoutes"></sub-menu>
                </template>
            </el-menu>
        </div>
    </aside>
</template>

<script>
import SubMenu from './main-sidebar-submenu'
import {isUrl} from '@/utils/validation'
import extraRouter from '@/router/extrarouter'
export default {
    data() {
        return {
            dynamicMenuRoutes: []
        }
    },
    components: {
        SubMenu
    },
    computed: {
        sidebarLayoutSkin: {
            get() {
                return this.$store.state.common.sidebarLayoutSkin
            }
        },
        sidebarFold: {
            get() {
                return this.$store.state.common.sidebarFold
            }
        },
        menuList: {
            get() {
                return this.$store.state.common.menuList
            },
            set(val) {
                this.$store.commit('common/UPDATEMENULIST', val)
            }
        },
        menuActiveName: {
            get() {
                return this.$store.state.common.menuActiveName
            },
            set(val) {
                this.$store.commit('common/UPDATEMENUACTIVENAME', val)
            }
        },
        mainTabs: {
            get() {
                return this.$store.state.common.mainTabs
            },
            set(val) {
                this.$store.commit('common/UPDATEMAINTABS', val)
            }
        },
        mainTabsActiveName: {
            get() {
                return this.$store.state.common.mainTabsActiveName
            },
            set(val) {
                this.$store.commit('common/UPDATEMAINTABSACTIVENAME', val)
            }
        }
    },
    watch: {
        $route: 'routeHandle'
    },
    created() {
        this.menuList = this.getMenuList(this.$route) ? this.getMenuList(this.$route) : []
        this.dynamicMenuRoutes = JSON.parse(
            sessionStorage.getItem('dynamicMenuRoutes') || '[]'
        )
        this.routeHandle(this.$route)
    },
    methods: {
        // 路由操作
        routeHandle(route) {
            // console.log(route)
            if (route.meta.isTab) {
                // tab选中, 不存在先添加
                let tab = this.mainTabs.filter(item => item.name === route.name)[0]
                if (!tab) {
                    let filterRoute = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
                    if (route.meta.isDynamic) {
                        if (!filterRoute) {
                            // eslint-disable-next-line no-console
                            return console.error('未能找到可用标签页!')
                        }
                    }
                    tab = {
                        id: filterRoute.meta.id || filterRoute.name,
                        name: filterRoute.name,
                        title: filterRoute.meta.title,
                        type: isUrl(filterRoute.meta.iframeUrl) ? 'iframe' : 'module',
                        iframeUrl: filterRoute.meta.iframeUrl || ''
                    }
                    this.mainTabs = this.mainTabs.concat(tab)
                }
                let additionRouter = extraRouter
                let defroute = ''
                let keyAry = Object.keys(additionRouter)
                if (keyAry.indexOf(this.$route.path) !== -1) {
                    defroute = {path: additionRouter[this.$route.path]}
                    let temproute = this.dynamicMenuRoutes.filter(item => '/' + item.name === additionRouter[this.$route.path])[0]
                    tab.id = temproute.meta.id
                } else {
                    defroute = this.$route
                }

                this.menuActiveName = tab.id + '' // xxxxxxxxxxxxx
                this.menuList = this.getMenuList(defroute) ? this.getMenuList(defroute) : []
                this.mainTabsActiveName = tab.name
            }
        },
        getMenuList() {  // 刷新页面重新过滤左侧菜单的数据
            let data = JSON.parse(sessionStorage.getItem('menuList') || '[]')
            return data
            /* for (let i = 0; i < data.length; i++) {
                const element = data[i].subMenuList
                for (let j = 0; j < element.length; j++) {
                    const item = element[j].subMenuList
                    for (let k = 0; k < item.length; k++) {
                        const temp = item[k]
                        if ('/' + temp.menuUrl.replace('/', '-') === route.path) {
                            return data[i].subMenuList
                        }
                    }
                }
            }
            return null */
        }
    }
}
</script>

<style lang="scss" scoped>
.nodata-tips {
    background: #eee;
    padding: 50px 0;
    margin: 20px;
    text-align: center;
    font-size: 14px;
    transition: all .4s;
    &:hover {
        background: #e2e2e2;
        border-radius: 6px;
    }
}
</style>

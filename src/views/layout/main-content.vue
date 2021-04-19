<template>
    <main class="site-content"  :class="{'site-content--tabs': $route.meta.isTab}">
        <!-- <el-tabs
            v-if="$route.meta.isTab"
            v-model="mainTabsActiveName"
            :closable="true"
            @tab-click="selectedTabHandle"
            @tab-remove="removeTabHandle">
            <el-dropdown class="site-tabs__tools" :show-timeout="0">
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-tab-pane
                v-for="item in mainTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name">
                <el-card :body-style="siteContentViewHeight">
                    <iframe
                        v-if="item.type === 'iframe'"
                        :src="item.iframeUrl"
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="yes">
                    </iframe>
                    <keep-alive v-else>
                        <router-view v-if="item.name === mainTabsActiveName" />
                    </keep-alive>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-card v-else :body-style="siteContentViewHeight">
            <keep-alive>
                <router-view />
            </keep-alive>
        </el-card>-->
        <breadcrumb v-if="menuActiveName" class="breadcrumb-container" />
        <div
            :body-style="JSON.stringify(siteContentViewHeight)"
            :style="{'min-height': parseInt(siteContentViewHeight.minHeight) + 'px', 'position': 'relative', 'background':'#F3F4F5'}"
        >
            <router-view />
        </div>
    </main>
</template>

<style>
</style>

<script>
import {isUrl} from '@/utils/validation'
import Breadcrumb from '@/components/breadcrumb'
export default {
    data() {
        return {}
    },
    components: {
        Breadcrumb
    },
    created () {
        console.log(this.menuActiveName)
    },
    computed: {
        documentClientHeight: {
            get() {
                return this.$store.state.common.documentClientHeight
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
        },
        siteContentViewHeight() {
            let height = this.documentClientHeight - 30 - 10 - 2
            height -= 65
            if (this.$route.meta.isTab) {
                height -= 70
                return isUrl(this.$route.meta.iframeUrl)
                    ? {height: height + 'px'}
                    : {minHeight: height + 'px'}
            }
            return {
                minHeight: height + 'px'
            }
        }
    },
    methods: {
        // tabs, 选中tab
        selectedTabHandle(tab) {
            tab = this.mainTabs.filter((item) => item.name === tab.name)
            if (tab.length >= 1) {
                this.$router.push({
                    name: tab[0].name,
                    query: tab[0].query,
                    params: tab[0].params
                })
            }
        },
        // tabs, 删除tab
        removeTabHandle(tabName) {
            this.mainTabs = this.mainTabs.filter(
                (item) => item.name !== tabName
            )
            if (this.mainTabs.length >= 1) {
                // 当前选中tab被删除
                if (tabName === this.mainTabsActiveName) {
                    this.$router.push(
                        {name: this.mainTabs[this.mainTabs.length - 1].name},
                        () => {
                            this.mainTabsActiveName = this.$route.name
                        }
                    )
                }
            } else {
                this.menuActiveName = ''
                this.$router.push({name: 'home'})
            }
        },
        // tabs, 关闭当前
        tabsCloseCurrentHandle() {
            this.removeTabHandle(this.mainTabsActiveName)
        },
        // tabs, 关闭其它
        tabsCloseOtherHandle() {
            this.mainTabs = this.mainTabs.filter(
                (item) => item.name === this.mainTabsActiveName
            )
        },
        // tabs, 关闭全部
        tabsCloseAllHandle() {
            this.mainTabs = []
            this.menuActiveName = ''
            this.$router.push({name: 'home'})
        },
        // tabs, 刷新当前
        tabsRefreshCurrentHandle() {
            let tempTabName = this.mainTabsActiveName
            this.removeTabHandle(tempTabName)
            this.$nextTick(() => {
                this.$router.push({name: tempTabName})
            })
        }
    }
}
</script>

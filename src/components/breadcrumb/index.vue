<template>
    <el-breadcrumb class="app-breadcrumb" separator=">">
        <!-- <transition-group name="breadcrumb"> -->
        <template v-for="(item,index) in levelList">
            <el-breadcrumb-item v-if="item.meta.title" :key="item.meta.title+index">
                <template v-if="levelList.length === 4 && index === 2">
                    <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
                    <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
                </template>
                <template v-else>
                    <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
                    <span v-else class="bread-redirect">{{item.meta.title}}</span>
                </template>
            </el-breadcrumb-item>
        </template>
        <!-- </transition-group> -->
    </el-breadcrumb>
</template>

<script>
/**
 * @name Breadcrumb (组件名称)
 * @module @/components/breadcrumb/index
 * @desc 组件-公共面包屑导航
 * @author wanmin
 * @date 2020-08-04
 */
import pathToRegexp from 'path-to-regexp'
import extraRouter from '@/router/extrarouter'
export default {
    name: 'Breadcrumb',
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            let data = JSON.parse(sessionStorage.getItem('menuList') || '[]')
            let list = []
            let $router = ''
            let additionRouter = extraRouter
            let keyAry = Object.keys(additionRouter)
            if (keyAry.indexOf(this.$route.path) !== -1) {
                $router = {path: additionRouter[this.$route.path]}
            } else {
                $router = this.$route
            }
            let crumbdata = this.getBreadcrumbData($router, data)
            for (let i = 0; i < crumbdata.length; i++) {
                const element = crumbdata[i]
                list.push({path: element.path, meta: {title: element.name}})
            }
            if (keyAry.indexOf(this.$route.path) !== -1) {
                list.push({path: '', meta: {title: this.$route.meta.title}})
            }

            this.levelList = list
        },
        pathCompile(path) {
            const {params} = this.$route
            let toPath = pathToRegexp.compile(path)
            return toPath(params)
        },
        handleLink(item) {
            const {redirect, path} = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push({path: path.replace(/\//g, '-')})
        },
        getBreadcrumbData(route, data) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i].children
                if (element && element.length > 0) {
                    for (let j = 0; j < element.length; j++) {
                        const itemlast = element[j]
                        if ('/' + itemlast.path.replace(/\//g, '-') === route.path) {
                            return [data[i], element[j]]
                        }
                    }
                }
            }
            return ''
            /* for (let i = 0; i < data.length; i++) {
                const element = data[i].subMenuList
                if (element && element.length > 0) {
                    for (let j = 0; j < element.length; j++) {
                        const item = element[j].subMenuList
                        if (item && item.length > 0) {
                            for (let n = 0; n < item.length; n++) {
                                const itemlast = item[n]
                                if ('/' + itemlast.menuUrl.replace('/', '-') === route.path) {
                                    return [data[i], element[j], item[n]]
                                }
                            }
                        }
                    }
                }
            }
            return '' */
        }
    }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 3px;
    .no-redirect {
        color: #333;
        cursor: text;
    }
    .bread-redirect {
        color: #606266;
    }
}
.el-breadcrumb__inner a {
    font-weight: normal;
}
</style>

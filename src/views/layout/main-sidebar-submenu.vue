<template>
    <div class="submenu-wrap">
        <el-menu-item :index="menu.id + ''" @click="gotoRouteHandle(menu)">
            <icon-svg :name="menu.source || 'system'"  style="font-size: 24px;"></icon-svg>
            <span style="padding-left: 10px;">{{menu.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
import SubMenu from './main-sidebar-submenu'
export default {
    name: 'SubMenu',
    props: {
        menu: {
            type: Object,
            required: true
        },
        dynamicmenuroutes: {
            type: Array,
            required: true
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
        }
    },
    methods: {
        // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由

        gotoRouteHandle(menu) {
            let route = this.dynamicmenuroutes.filter(item => item.meta.id === menu.id)
            if (route.length >= 1) {
                this.$router.push({name: route[0].name})
            }
        }
    }
}
</script>

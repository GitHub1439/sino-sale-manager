<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
            <span :class="toggleClass(scope.row)" @click.prevent="toggleHandle(scope.$index, scope.row)" :style="childStyles(scope.row)">
                <i :class="iconClasses(scope.row)" :style="iconStyles(scope.row)"></i>
                {{scope.row[prop]}}
            </span>
        </template>
    </el-table-column>
</template>
<script>
/**
 * @name TableTreeColumn (组件名称)
 * @module @/components/tabletreecolumn/index
 * @desc 组件- 表格可展开行组件
 * @author wanmin
 * @date 2020-08-04
 * @param {String} [prop]    - 需显示数据的字段key
 * @param {String} [treeKey]    - 父级数据pid key
 * @param {String} [parentKey]    - 父级数据pid key
 * @param {String} [levelKey]    - 嵌套数据层级深度key
 * @param {String} [childKey]    - 嵌套数据的Key
 */
import isArray from 'lodash/isArray'
export default {
    name: 'TableTreeColumn',
    props: {
        prop: {
            type: String,
            default: ''
        },
        treeKey: {
            type: String,
            default: 'id'
        },
        parentKey: {
            type: String,
            default: 'parentId'
        },
        levelKey: {
            type: String,
            default: 'level'
        },
        childKey: {
            type: String,
            default: 'children'
        }
    },
    methods: {
        retract(row) {
            if (row[this.levelKey] === 0 || row[this.levelKey] === 1) {
                return 0 // 目录
            } else if (row[this.levelKey] === 2) {
                return 1 // 菜单
            }
            return 2 // 权限

        },
        childStyles(row) {
            return {
                'padding-left': (row[this.levelKey] + 1 > 1 ? row[this.levelKey] * 10 : 0) + 'px'
                // "padding-left": this.retract(row) * 10 + "px"
            }
        },
        toggleClass(row) {
            return this.retract(row) === 0 ? 'hand child-one' : this.retract(row) === 1 ? 'hand child-two' : 'hand child-three'
        },
        iconClasses(row) {
            return [!row._expanded ? 'el-icon-caret-right' : 'el-icon-caret-bottom']
        },
        iconStyles(row) {
            return {visibility: this.hasChild(row) ? 'visible' : 'hidden'}
        },
        hasChild(row) {
            return ((isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false)
        },
        // 切换处理
        toggleHandle(index, row) {
            if (this.hasChild(row)) {
                let data = this.$parent.store.states.data.slice(0)
                data[index]._expanded = !data[index]._expanded
                if (data[index]._expanded) {
                    data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data)
                } else {
                    data = this.removeChildNode(data, row[this.treeKey])
                }
                this.$parent.store.commit('setData', data)
                this.$nextTick(() => {
                    this.$parent.doLayout()
                })
            }
        },
        // 移除子节点
        removeChildNode(data, parentId) {
            let parentIds = isArray(parentId) ? parentId : [parentId]
            if (parentId.length <= 0) {
                return data
            }
            let ids = []
            for (let i = 0; i < data.length; i++) {
                if (parentIds.indexOf(data[i][this.parentKey]) !== -1 && parentIds.indexOf(data[i][this.treeKey]) === -1) {
                    data[i]._expanded = false
                    ids.push(data.splice(i, 1)[0][this.treeKey])
                    i--
                }
            }
            return this.removeChildNode(data, ids)
        }
    }
}
</script>

<style lang="scss" scope>
.hand {
    cursor: pointer;
}
</style>

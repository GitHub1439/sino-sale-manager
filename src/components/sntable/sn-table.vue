
<template>
    <div class="data-table">
        <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            border
            :height="tableHeight"
            v-loading="loading"
            v-on="$listeners"
            v-bind="$attrs"
            @row-click="rowClick"
            class="sn-table"
            @selection-change="handleSelectionChange"
        >
            <el-table-column v-if="orderNum" label="序号" type="index" width="60" align="center">
                <template slot-scope="scope">
                    <!-- 有分页时，序号显示 -->
                    <span v-if="pageObj">{{(pageObj.currentPage - 1)*pageObj.size + scope.$index + 1}}</span>
                    <!-- 无分页时，序号显示 -->
                    <span v-else>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="isSelection"
                type="selection"
                width="40"
            >
            </el-table-column>
            <template v-for="(col, index) in columns">
                <el-table-column
                    v-if="col.slot"
                    :key="index"
                    :label="col.label"
                    :width="col.width"
                    :fixed="col.fixed"
                    :formatter="col.formatter"
                    :align="col.align?col.align:'center'"
                    :sortable="tableSortable"
                >
                    <template slot-scope="scope">
                        <slot :name="col.slot" :scope="scope.row"></slot>
                    </template>
                    <template v-if='col.header' slot="header">
                        <slot :name="col.header"></slot>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="!col.slot && !col.isHide"
                    :key="index"
                    :prop="col.prop"
                    :label="col.label"
                    :width="col.width"
                    :formatter="col.formatter"
                    align="center"
                    :sortable="tableSortable"
                >
                    <template v-if='col.header' slot="header">
                        <slot :name="col.header"></slot>
                    </template>
                </el-table-column>
            </template>
            <template slot="empty">
                <tempty></tempty>
            </template>
        </el-table>
        <!-- 是否调用分页 -->
        <!-- v-if="pageObj.total > pageObj.size" -->
        <div class="sn-row flex-end">
            <el-pagination
                class="width-auto"
                v-if="isPaginationShow"
                background
                :layout="layout"
                :page-size="pageObj.size"
                :total="pageObj.total"
                :current-page="pageObj.currentPage"
                @current-change="pageObj.func"
                @size-change="pageObj.handleSizeChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>

/**
 * @name SnTable (组件名称)
 * @module @/components/sntable/sn-table
 * @desc 组件-公共表格组件表格
 * @author Wangming
 * @date 2020-08-03
 * @param {Boolean} [isFit]    - 是否开启表格自适应高度
 * @param {Object} [pageObj] - 分页配置
 * @param {Object} [tableData] - 表格数据
 * @param {Boolean} [orderNum] - 是否开启第一列的默认序号，第二页会累计条数
 * @param {Object} [columns] - 表格头信息
 * @param {Number} [tableHeightDefault] - 设置表格的默认最小高度
 * @param {Boolean} [isAnotherPage] - 开启自适应高度后是否需要减去单独分页的高度，用于组件外分页
 * @example 调用示例
 *  <sn-table
 *     :is-fit="true"
 *     :page-obj="pageObj"
 *     :table-data="tableData"
 *     :order-num="orderNum"
 *     :columns="columns"
 *     :table-height-default="tableHeightDefault"
 * ></sn-table>
 */

import {throttle} from '@/utils/index'
export default {
    name: 'SnTable',
    props: {
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        columns: {
            type: Array,
            required: true
        },
        pageObj: {
            type: Object,
            default() {
                return {}
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        orderNum: {
            type: Boolean,
            default: false
        },
        isFit: {
            type: Boolean,
            default: false
        },
        tableHeightDefault: {
            type: Number,
            default: 220
        },
        layout: {
            type: String,
            default: 'total, prev, pager, next, sizes, jumper'
        },
        offetDefault: {
            type: Number,
            default: 75
        },
        isSelection: {
            type: Boolean,
            default: false
        },
        isAnotherPage: {
            type: Boolean,
            default: false
        },
        isPaginationShow: {
            type: Boolean,
            default: true
        },
        tableSortable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableHeight: this.tableHeightDefault
        }
    },
    mounted() {
        if (this.isFit) {
            this.$nextTick(() => {
                this.onResize()
                window.addEventListener('resize', this.onResize, {
                    passive: true
                })
            })
            this.$on('hook:destroyed', () => {
                window.removeEventListener('resize', this.onResize, {
                    passive: true
                })
            })
        }
    },
    methods: {
        rowClick(row, column, event) {
            // 点击表格每一行时触发
            this.$listeners.rowClick && this.$listeners.rowClick(row, column, event)
        },
        sizeChangeDefault() {
            console.log('sizeChange')
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        handleCancelSelect() {
            this.$refs.multipleTable.clearSelection()
        },
        onResize: throttle(function () {
            let offset = this.offetDefault // this.pageObj.total > 0 ? 75 : 32
            let tableHeight = document.documentElement.clientHeight - this.$el.getBoundingClientRect().top - offset
            this.isAnotherPage ? tableHeight -= 75 : ''
            this.tableHeight = tableHeight
            if (this.tableHeight < this.tableHeightDefault) {
                this.tableHeight = this.tableHeightDefault
            }
            this.$emit('table-height-change', this.tableHeight)
        }, 100)
    }
}
</script>
<style lang="scss" scoped>
.sn-table /deep/ tbody tr:hover>td {
    background-color:#fff!important
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF4E07;   // 进行修改选中项背景和字体
}
</style>

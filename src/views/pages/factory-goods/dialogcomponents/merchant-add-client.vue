<template>
    <el-dialog
        :visible.sync="showVisible"
        top="3%"
        width="80%"
        title="选择客户"
        class="reply-dia"
        :show-close="true">
        <div class="form-wrap bgff">
            <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="col">
                            <span class="lab">客户名称</span>
                            <el-input
                                @keyup.enter.native="search()"
                                placeholder="请输入内容"
                                v-model="customerName"
                                clearable
                            >
                            </el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="col">
                            <span class="lab">客户代码</span>
                            <el-input
                                @keyup.enter.native="search()"
                                placeholder="请输入内容"
                                v-model="customerCode"
                                clearable
                            >
                            </el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="btnlist" style="padding-top: 0">
                        <button @click="search" style="margin-top: 0;">
                            <icon-svg name="sousuo"></icon-svg><span>搜索</span>
                        </button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <sn-table
            v-loading="loading"
            :table-data="customerData"
            :columns="columns"
            :page-obj="pageObj"
            :is-selection="true"
            :table-height-default="419"
            @handleSelectionChange="selectionChange"
        >
            <template slot="status" slot-scope="{scope}">
                <div>
                    <div v-if="scope.status == 0">是</div>
                    <div v-if="scope.status == 1">否</div>
                </div>
            </template>
        </sn-table>
        <div class="b-btn">
            <el-button @click="handlClose">取消</el-button
            >
            <el-button type="primary" @click="submitCheck()">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'MerchantAddClient',
    data() {
        return {
            loading: false,
            showVisible: false,
            customerName: '',
            customerCode: '',
            columns: [
                {label: '客户名称', prop: 'customerName', width: '140'},
                {label: '客户代码', prop: 'customerCode', width: 180},
                {label: '客户类型', prop: 'customerType'},
                {label: '客户联系人', prop: 'contactName'},
                {label: '联系电话', prop: 'contactPhone', width: 180},
                {label: '客户标签', prop: 'customerLabel'},
                {label: '是否冻结', slot: 'status'},
                {label: '客户地址', slot: 'address'}
            ],
            customerData: [],
            pageObj: {
                size: 10,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.sizeChange(size)
                }
            },

        }
    },
    created() {
        // this.listCust()
    },
    methods: {
        init() {
            this.showVisible = true
            this.listCust()
        },
        handlClose() {
            this.showVisible = !this.showVisible
        },
        submitCheck() {
            this.showVisible = !this.showVisible
            this.$emit('clientSelectionChange', this.clientList)
        },
        search() {
            this.listCust()
        },
        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.listCust()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.listCust()
        },
        listCust() {
            this.loading = true
            let param = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                customerName: this.customerName,
                customerCode: this.customerCode,
            }
            this.$get(this.$api.customermanage.listCust, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.pageObj.total = data.data.total
                    this.customerData = data.data.records
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        selectionChange(val) {
            this.clientList = val
        },
    }
}
</script>

<style lang="scss" scoped>
    .form-wrap {
        border-radius: 6px;
        .col {
            display: flex;
            .lab {
                margin-right: 28px;
                min-width: 69px;
                font-size: 14px;
                line-height: 32px;
            }
        }
    }
    .b-btn {
        border-top: 1px solid #f5f5f5;
        margin: 10px 0 20px;
        display: flex;
        justify-content: space-around;
        button {
            margin-top: 10px;
        }
    }
</style>

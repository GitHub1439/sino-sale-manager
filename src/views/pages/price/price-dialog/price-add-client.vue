<template>
    <el-dialog
        :visible.sync="showVisible"
        top="1%"
        width="80%"
        title="选择客户"
        class="reply-dia"
        :before-close="handlClose"
        :show-close="true"
    >
        <div class="form-wrap bgff">
            <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="7">
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
                    <div class="grid-content bg-purple">
                        <div class="col">
                            <span class="lab">客户标签</span>
                            <el-select v-model="customerValue" placeholder="请选择">
                                <el-option value>请选择</el-option>
                                <el-option
                                    v-for="item in customerTag"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    clearable
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
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
            :table-height-default="319"
            @handleSelectionChange="selectionChange"
        >
            <template slot="customerType" slot-scope="scope">
                <div>
                    <div>{{customerTypeArr[scope.scope.customerType - 1]}}</div>
                </div>
            </template>
            <template slot="status" slot-scope="{scope}">
                <div>
                    <div v-if="scope.status == 0">是</div>
                    <div v-if="scope.status == 1">否</div>
                </div>
            </template>
        </sn-table>
        <div class="b-btn">
            <el-button @click="handlClose">取消</el-button>
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
            customerTypeArr: ['器械批发', '器械店', '连锁药房', '单体药房', '医药公司', '医疗机构', '连锁器械', '连锁无糖', '其它'],
            columns: [
                {label: '客户名称', prop: 'customerName', width: '120'},
                {label: '客户代码', prop: 'customerCode', width: 160},
                {label: '客户类型', slot: 'customerType'},
                {label: '客户联系人', prop: 'contactName', width: 120},
                {label: '联系电话', prop: 'contactPhone', width: 160},
                {label: '客户标签', prop: 'customerLabel'},
                {label: '是否冻结', slot: 'status'},
                {label: '客户地址', prop: 'Address', width: 450}
            ],
            customerData: [],
            pageObj: {
                size: 100,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.sizeChange(size)
                }
            },
            customerTag: [], // 客户标签
            customerValue: ''
        }
    },
    props: {
        productId: {
            type: String,
            default: ''
        }
    },
    created() {
        // this.listCust()
    },
    methods: {
        init() {
            this.showVisible = true
            this.customerValue = ''
            this.listCust()
            this.getCustomerLabel()
        },
        handlClose() {
            this.showVisible = !this.showVisible
            this.$emit('showCustList')
        },
        submitCheck() {
            this.showVisible = !this.showVisible
            this.$emit('clientSelectionChange', this.clientList)
            this.$emit('showCustList')
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
                customerLabel: this.customerTag[this.customerValue] ? this.customerTag[this.customerValue].label : '',
                filter: 1
            }
            this.$get(this.$api.customermanage.listCust, param).then((data) => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.pageObj.total = data.data.total
                    data.data.records.forEach(item=>{
                        item.Address = item.province + item.city + item.region + item.address
                    })
                    this.customerData = data.data.records
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        selectionChange(val) {
            this.clientList = val
        },
        getCustomerLabel() {
            this.$get(this.$api.customermanage.getCustomerLabel, {mchId: localStorage.getItem('mch_id')}).then((data) => {
                if (data && data.code === 200) {
                    let arr = []
                    data.data.forEach((item, index)=>{
                        arr.push({
                            label: item,
                            value: index
                        })
                    })
                    this.customerTag = arr
                } else {
                    this.$message.error(data.msg)
                }
            })
        }
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

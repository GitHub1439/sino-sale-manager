<template>
    <div class="form-wrap bgff mgt10">
        <div>
            <el-form :inline="true">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="客户名称">
                            <el-input v-model="name" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <div class="btnlist">
                                <button @click="getPresentList" style="margin-top: 0;"><span>查询</span></button>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <sn-table
                :order-num="true"
                :table-data="customerData"
                :columns="columns"
                :page-obj="pageObj"
                :is-fit="true"
            >
                <template slot="operate" slot-scope="scope">
                    <el-button type="text" size="mini" @click="openDialog(scope.scope)">发放赠品</el-button>
                </template>
            </sn-table>
        </div>
        <div v-if="showVisible">
            <el-dialog
                :visible.sync="showVisible"
                title="快递配置"
                class="reply-dia"
                :show-close="true"
            >
                <div>
                    <el-form label-width="80px">
                        <el-form-item label="快递公司:">
                            <el-col :span="8">
                                <el-select v-model="deliveryCompany" placeholder="请选择快递公司">
                                    <el-option
                                        v-for="item in companyList"
                                        :key="item.dictKey"
                                        :label="item.dictValue"
                                        :value="item.dictKey"
                                    >
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="订单号:">
                            <el-row>
                                <el-col :span="8"><el-input v-model="deliverySn"></el-input></el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="配送方式:">
                            <el-col :span="8">
                                <el-select v-model="deliveryWay" placeholder="选择配送方式">
                                    <el-option
                                        v-for="item in wayList"
                                        :key="item.dictKey"
                                        :label="item.dictValue"
                                        :value="item.dictKey"
                                    >
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div class="b-btn mgb15 mgt10">
                        <el-button @click="openDialog">取消</el-button>
                        <el-button type="primary" @click="senPresent()">确定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FactoryPool',
    data() {
        return {
            customerData: [],
            showVisible: false,
            name: '',
            columns: [
                {label: '订单号', prop: 'customerOrderSn'},
                {label: '订单日期', prop: 'orderTime'},
                {label: '订单价格', prop: 'orderAmount'},
                {label: '客户名称', prop: 'customerName'},
                {label: '经销商名称', prop: 'mchName'},
                {label: '赠品代码', prop: 'giftSn'},
                {label: '赠品名称', prop: 'giftName'},
                {label: '赠品数量', prop: 'quantity'},
                // {label: '兑付数量', prop: 'status'},
                {label: '兑付时间', prop: 'address'},
                {label: '兑付单号', prop: 'address'}
                // {label: '操作', slot: 'operate'}
            ],
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
            deliveryCompany: '',
            deliverySn: '',
            deliveryWay: '',
            id: '',
            companyList: [],
            wayList: []
        }
    },
    created() {
        this.getPresentList()
        this.initDict()
        this.initDictWay()
    },
    methods: {
        async initDict() {
            let {data, code} = await this.$get(this.$api.shopInit.dictionary + '?code=delivery_company')
            if (code === 200) {
                this.companyList = data[0].children
            }
        },
        async initDictWay() {
            let {data, code} = await this.$get(this.$api.shopInit.dictionary + '?code=delivery_way')
            if (code === 200) {
                this.wayList = data[0].children
            }
        },
        sizeChange(size) {
            this.pageObj.size = size
            this.getPresentList()
        },
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.getPresentList()
        },
        // 获取列表
        async getPresentList() {
            let par = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                customerName: this.name
            }
            let {data, code, msg}  = await this.$get(this.$api.activity.facGiftList, par)
            if (data && code === 200) {
                this.pageObj.total = data.total
                this.customerData = data.records
            } else {
                this.$message.error(msg)
            }
        },
        openDialog(row) {
            this.showVisible = !this.showVisible
            if (row) {
                this.id = row.customerId
            }
        },
        // 发放赠品
        async senPresent() {
            let params = {
                deliveryCompany: this.deliveryCompany,
                deliverySn: this.deliverySn,
                deliveryWay: this.deliveryWay,
                id: this.id
            }
            let {data, code, msg}  = await this.$post(this.$api.activity.delivery, params)
            if (data && code === 200) {
                this.$message.success(msg)
            } else {
                this.$message.error(msg)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .b-btn {
        display: flex;
        justify-content: space-around;
    }

</style>

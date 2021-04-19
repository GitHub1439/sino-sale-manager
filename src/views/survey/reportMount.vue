<template>
    <div  v-loading="loading" class="common">
        <div v-show="showIndex">
            <div class="tabs-main baseinfo" v-if="activeName == 1">这是基本信息</div>
            <div class="form-wrap bgff mgt10" v-if="activeName == 0">
                <el-form ref="form" label-width="80px">
                    <el-row :gutter="20" style="margin-bottom: 6px;">
                        <el-col :span="12">
                            <el-input v-model="dataForm.salesman" placeholder="姓名"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="dataForm.customerName" placeholder="终端门店"></el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-bottom: 6px;">
                        <!-- <el-col :span="12">
                            <el-input v-model="dataForm.mchName" placeholder="经销商"></el-input>
                        </el-col> -->
                        <el-col :span="12">
                            <el-date-picker v-model="dataForm.orderTimeStart" value-format="yyyy-MM-dd" align="right" type="date" placeholder="开始下单日期"></el-date-picker>
                        </el-col>
                        <el-col :span="12">
                            <el-date-picker v-model="dataForm.orderTime" value-format="yyyy-MM-dd" align="right" type="date" placeholder="结束下单日期"></el-date-picker>
                        </el-col>
                        
                    </el-row>

                    <el-row :gutter="20" style="margin-bottom: 6px;">
                        <el-col :span="12">
                            <el-input v-model="dataForm.area" clearable placeholder="大区"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="dataForm.region" clearable placeholder="省办"></el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-bottom: 6px;">
                        <el-col :span="12">
                            <el-input v-model="dataForm.mchName" placeholder="经销商"></el-input>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-date-picker v-model="dataForm.orderTimeDate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="下单日期"></el-date-picker>
                        </el-col> -->
                    </el-row>
                </el-form>


                <div class="mini-switch-navorbtn">
                    <div class="btnlist">
                        <div class="totalAmount">总金额：{{totalAmount}}</div>
                        <button @click="getOrderList">
                            <icon-svg name="sousuo"></icon-svg>
                            <span>搜索</span>
                        </button>
                    </div>
                </div>
                <sn-table
                    ref="orderTable"
                    :table-data="tableData"
                    :columns="columns"
                    layout="total, prev, pager, next, sizes"
                    :page-obj="pageObj"
                    :is-fit="true"
                >
                    <template slot="status" slot-scope="{ scope }">
                        <div style="color: orange" v-if="scope.status == 1 || scope.status == 2">{{orderStatusOption[scope.status]}}</div>
                        <div style="color: red" v-else-if="scope.status == 6">{{orderStatusOption[scope.status]}}</div>
                        <div v-else>{{orderStatusOption[scope.status]}}</div>
                    </template>
                    <template slot="deliveryWay" slot-scope="{ scope }">
                        <div>{{deliveryWayOption[scope.deliveryWay]}}</div>
                    </template>
                    <template slot="payType" slot-scope="{ scope }">
                        <div>{{payTypeOption[scope.payType]}}</div>
                    </template>
                    <template slot="billType" slot-scope="{ scope }">
                        <div>{{billTypeOption[scope.billType]}}</div>
                    </template>
                    <template slot="hasPay" slot-scope="{ scope }">
                        <div>{{hasPayOption[scope.hasPay]}}</div>
                    </template>
                    <template slot="hasShipped" slot-scope="{ scope }">
                        <div>{{hasShippedOption[scope.hasShipped]}}</div>
                    </template>
                    <template slot="drugName" slot-scope="scope">
                        <div v-for="item in scope.scope.orderItemList" :key="item.name">
                            <div>{{item.name + item.specs}}</div>
                        </div>
                    </template>
                    <template slot="payAmount" slot-scope="{ scope }">
                        <div>
                            <div>{{scope.payAmount}}</div>
                        </div>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <div class="evtbtn">
                            <el-button size="small" type="text" @click="toDetail(scope.scope)">编辑</el-button>
                            <el-button size="small" type="text" @click="toDetail(scope.scope)">查看</el-button>
                            <el-button v-if="scope.scope.status == 1" size="small" type="text" @click="audit(scope.scope, 0)">确认</el-button>
                            <el-button v-if="scope.scope.status == 2" size="small" type="text" @click="openDialog(scope.scope)">发货</el-button>
                        </div>
                    </template>
                </sn-table>
            </div>
        </div>

        <!-- <detailIndexPage v-if="detailIndexVisible" :order-id="orderId" :audit="audit" :delivery="delivery" :change-show-index="changeShowIndex"></detailIndexPage> -->

        <div v-if="showVisible">
            <el-dialog :visible.sync="showVisible" title="快递配置" class="reply-dia" :show-close="true">
                <div>
                    <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="配送方式:" prop="deliveryWay" class="me-row-item" label-width="140">
                            <el-col :span="8">
                                <el-select v-model="ruleForm.deliveryWay" placeholder="选择配送方式">
                                    <el-option v-for="item in wayList" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="快递公司:" prop="deliveryCompany" label-width="140" v-if="ruleForm.deliveryWay === '1'">
                            <el-col :span="8">
                                <el-select v-model="ruleForm.deliveryCompany" placeholder="请选择快递公司" @change="changeDeliveryCompany">
                                    <el-option v-for="item in companyList" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="快递单号:" prop="deliverySn" label-width="140" v-if="ruleForm.deliveryWay === '1'">
                            <el-row>
                                <el-col :span="8"><el-input v-model="ruleForm.deliverySn"></el-input></el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <div class="b-btn mgb15 mgt10">
                        <el-button @click="openDialog">取消</el-button>
                        <el-button type="primary" @click="delivery()">确定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
// import detailIndexPage from './detail-index'
import axios from 'axios'
import fileDownload from 'js-file-download'

export default {
    components: {
        // detailIndexPage
    },
    data() {
        return {
            showIndex: true,
            detailIndexVisible: false,
            orderStatusOption: {
                0: '待支付',
                1: '待审核',
                2: '待发货',
                3: '待收货',
                4: '已收货',
                5: '已取消',
                6: '已拒绝'
            },
            deliveryWayOption: {
                0: '商家配送',
                1: '物流快递',
                2: '自提'
            },
            payTypeOption: {
                0: '授信',
                1: '商家收款码',
                2: '物流代收',
                3: '银行转账',
                4: '微信在线支付'
            },
            billTypeOption: {
                0: '不开发票',
                1: '普通发票',
                2: '普通电子发票',
                3: '增值税专用发票'
            },
            hasPayOption: {
                0: '未支付',
                1: '已支付'
            },
            hasShippedOption: {
                0: '未发货',
                1: '已发货'
            },
            columns: [

                {label: '姓名', prop: 'salesman'},
                {label: '终端门店', prop: 'customerName', width: 150},
                {label: '经销商', prop: 'mchName', width: 255},
                {label: '下单日期', prop: 'orderTime', width: 160},
                {label: '金额', prop: 'amount', width: 80},
                {label: '大区', prop: 'area'},
                {label: '省办', prop: 'region'},
                // {label: '总金额', prop: 'receiverDetailAddress', width: 250},
                // {label: '下单日期', prop: 'orderTime', width: 160},
                // {slot: 'operate', label: '操作', width: 200, algin: 'left', fixed: 'right'}
            ], // 操作列
            loading: false,
            pageObj: {
                size: 10,
                total: 0,
                currentPage: 1,
                func: currentPage => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: size => {
                    this.sizeChange(size)
                }
            },
            searchLoading: false,
            tableData: [],
            showVisible: false,
            dataForm: {
                area: '',
                salesman: '',
                region: '',
                customerName: '',
                mchName: '',
                // orderTimeDate: '',
                // timeRange: '',
                orderTimeStart: '',
                orderTime: ''
            },
            totalAmount: '',
            ruleForm: {
                deliverySn: '',
                deliveryWay: '',
                deliveryCompany: '',
                remark: ''
            },
            companyList: [],
            dialogVisible: false,
            recipeDialogVisible: false,
            valueTime: '',
            wayList: [],
            orderId: '',
            activeName: '0',
            activeProtype: '99',
            rules: {
                deliverySn: [{required: true, message: '请输入快递单号', trigger: 'blur'}],
                deliveryCompany: [{required: true, message: '请输入快递公司', trigger: 'blur'}],
                deliveryWay: [{required: true, message: '请输入配送方式', trigger: 'blur'}]
            },
            selectList: [] // 选中项
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        search() {
            this.getOrderList()
        },
        handleClickType(e) {
            let type = this.activeProtype
            this.dataForm.status = e.name
            this.getOrderList()
        },
        reset() {
            this.activeName = '1'
            this.dataForm.searchKey = ''
            this.dataForm.valueTime = ''
        },
        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.getOrderList()
        },
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
        async openDialog(row) {
            this.showVisible = !this.showVisible
            if (row) {
                this.id = row.id
                await this.initDict()
                await this.initDictWay()
            }
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.getOrderList()
        },
        // 切换状态
        handleClick() {
            this.pageObj.size = 10
            this.pageObj.total = 0
            this.pageObj.currentPage = 1
        },

        toDetail(row) {
            this.orderId = row.id
            this.showIndex = false
            this.detailIndexVisible = true
        },
        changeShowIndex() {
            this.showIndex = true
            this.detailIndexVisible = false
        },

        // 订单确认 审核状态 status（0：同意 1：拒绝）
        async audit(row, status) {
            let params = {
                id: row.id,
                auditStatus: status,
                sellerNote: row.sellerNote
            }
            let tip = '是否确认'
            if (status === 1) {
                tip = '是否拒绝'
            }

            this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(async () => {
                if (status == 1) {
                    let sendLog = row.sellerNote
                    if (sendLog == '') {
                        this.$message.info('拒绝订单需填写描述')
                        return
                    }
                }
                let {code, msg} = await this.$post(this.$api.order.orderAudit, params)
                if (code === 200) {
                    this.getOrderList()
                    this.changeShowIndex()
                    this.$message.success('操作成功')
                } else {
                    this.$message.error(msg)
                }
            })
        },
        // 发货
        async delivery(row) {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let params = {
                        id: this.id,
                        deliverySn: this.ruleForm.deliverySn,
                        deliveryWay: this.ruleForm.deliveryWay,
                        deliveryCompany: this.ruleForm.deliveryCompany,
                        remark: this.ruleForm.remark
                    }

                    let {code, msg} = await this.$post(this.$api.order.orderDelivery, params)
                    if (code === 200) {
                        this.showVisible = false
                        this.getOrderList()
                        this.$message.success('发货成功')
                    } else {
                        this.$message.error(msg)
                    }
                }
            })
        },

        // 获取订单列表数据
        async getOrderList() {
            let typeId = this.activeProtype
            this.dataForm.size = this.pageObj.size
            this.dataForm.current = this.pageObj.currentPage
            if (this.dataForm.orderTime != '') {
                this.dataForm.orderTimeEnd = this.dataForm.orderTime + ' 23:59:59'
            }
            // this.dataForm.status = status
            this.loading = true
            let {code, data} = await this.$post(this.$api.order.statisticsList, this.dataForm)
            if (code === 200) {
                this.pageObj.total = data.total
                // data.records.forEach(item => {
                //     item.orderSelect = false
                // })
                this.tableData = data.list
                this.totalAmount = data.totalAmount
                this.loading=false
                console.log('this.tableData')
                console.log(this.tableData)
            }
        },
        // 导出
        async getExport() {
            this.dataForm.size = this.pageObj.size
            this.dataForm.current = this.pageObj.currentPage

            let baseUrl = window.SITE_CONFIG.baseUrl + this.$api.order.exportOrder
            axios.post(baseUrl,this.dataForm, {
                headers: {
                    responseType: 'arraybuffer',
                    'Content-Type': 'multipart/form-data',
                    'Sino-Auth': localStorage.getItem('Sino-Auth')
                }
            })
                .then(res => {
                        if (res.status === 200 && res.data) {
                            const fileName = new Date() + '订单数据'
                            fileDownload(res.data, `${fileName}.xls`)
                        }
                    })
        },
        // 记录选中项
        // handleSelectChange(val) {
        //     this.selectList = val
        // },
        // 批量确认
        getSelectAll() {
            let tip = '是否批量确认'

            if (this.selectList <= 0) {
                this.$message.error('请选择订单')
                return false
            }
            this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(async () => {
                let params = new Object()
                this.selectList.forEach(item => {
                    item.auditStatus = 0
                })
                params.auditOrderReqList = this.selectList
                let res = await this.$post(this.$api.order.orderSelectAll, params)
                if (res && res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '批量确认成功'
                    })
                    this.getOrderList()
                    this.$refs.orderTable.handleCancelSelect()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        },
        changeDeliveryCompany(val){
            this.ruleForm.remark = this.companyList[val-1].remark;
        }
    }
}
</script>

<style lang="scss" scoped>
.common {
    width: 100vw;
    height: 100vh;
    background: #fff;
    overflow: auto;
}
.tabs-main {
    background: $white;
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
}
.baseinfo {
}
.form-wrap {
    border-radius: 6px;
}

.el-row {
    .col {
        span {
            display: block;
            width: 60px;
            float: left;
            line-height: 30px;
        }
        .el-input,
        el-select {
            float: left;
            width: 124px;
        }
    }
}

.el-tabs__nav {
    border: 0;
}
.btnlist {
    padding-right: 0;
    margin-bottom: 10px;
}
.totalAmount {
    // width: 191px;
    height: 30px;
    display: inline-block;
    float: left;
    text-align: left;
    line-height: 30px;
    vertical-align: middle;
    margin-top: 10px;
    font-size: 16px;
}
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>

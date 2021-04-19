<template>
    <div v-loading="loading">
        <div v-if="detail">
            <div class="top-nav">
                <div class="tabs-card">
                    <el-tabs
                        v-model="activeNavName"
                        type="card"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane label="经销商档案" name="0"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="form-wrap bgff mgt10" v-if="activeNavName == 0">
                <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户名称</span>
                                <el-input
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
                                <span class="lab">客户类型</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerType"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">所属区域</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="region"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">客户地址</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="address"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">联系电话</span>
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="contactPhone"
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
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="customerLabel"
                                    clearable
                                >
                                </el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="mini-switch-navorbtn">
                    <div class="tabs-card" style="flex: 0.5">
                        <el-tabs
                            v-model="myScope"
                            type="card"
                            @tab-click="noCustTypeClick"
                        >
                            <el-tab-pane
                                label="所有客户"
                                name="all"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="冻结客户"
                                name="froze"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="未分类客户"
                                name="notype"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="授信客户"
                                name="credit"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="超3个月未下单"
                                name="noorder"
                            ></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="btnlist">
                        <!-- <button><icon-svg name="tianjia"></icon-svg><span>导出明细</span></button>
                    <button><icon-svg name="bianji"></icon-svg><span>批量出库</span></button>
                    <button><icon-svg name="success"></icon-svg><span>批量确认</span></button> -->
                        <button @click="search">
                            <icon-svg name="sousuo"></icon-svg><span>搜索</span>
                        </button>
                    </div>
                </div>
                <sn-table
                    :table-data="customerData"
                    :columns="columns"
                    :page-obj="pageObj"
                    :is-fit="true"
                >
                    <template slot="status" slot-scope="{scope}">
                        <div>
                            <div v-if="scope.status == 0">否</div>
                            <div v-if="scope.status == 1">是</div>
                        </div>
                    </template>
                    <template slot="customerType" slot-scope="{scope}">
                        <div>
                            <div v-if="scope.customerType== 1">药店</div>
                            <div v-else-if="scope.customerType== 2">基层医疗</div>
                            <div v-else="scope.customerType== 3">二批商</div>
                        </div>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <div class="evtbtn">
                            <el-button
                                size="small"
                                type="text"
                                @click="editCustomer(scope.scope)"
                            >产品授权</el-button
                            >
                        </div>
                    </template>
                </sn-table>
            </div>
        </div>
    </div>
</template>

<script>
    // import { delete } from 'vue/types/umd'
    import snAddressSelect from '@/components/snaddressselect/sn-address-select'
    import addDialog from './add-dialog'
    export default {
        components: {
            addDialog,
            snAddressSelect
        },
        data() {
            return {
                // 上传文件
                action:
                    window.SITE_CONFIG.baseUrl +
                    '/sino-resource/oss/endpoint/put-file',
                headers: {
                    'Sino-Auth': localStorage.getItem('Sino-Auth')
                },
                title: '授信收款登记',
                isEdit: false,
                dialogVisible: false,
                detail: true,
                showCheck:'',
                customerData: [],
                waitcustomerData: [],
                curPayType:{
                    wxzf:'0',
                    yhzf:'0',
                    sxzf:'0',
                    wuzf:'0'
                },
                wxzfTag: false,
                yhzfTag: false,
                sxzfTag: false,
                wuzfTag: false,
                addressData: [],
                columns: [
                    {label: '客户名称', prop: 'customerName', width: '140'},
                    {label: '客户代码', prop: 'customerCode', width: 180},
                    {label: '客户类型', prop: 'customerType'},
                    {label: '客户联系人', prop: 'contactName'},
                    {label: '联系电话', prop: 'contactPhone', width: 180},
                    {label: '客户标签', prop: 'customerLabel'},
                    {label: '是否冻结', slot: 'status'},
                    {label: '客户地址', slot: 'address'},
                    {slot: 'operate', label: '操作'}
                ], // 操作列
                loading: false,
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
                pricepageObj: {
                    size: 10,
                    total: 0,
                    currentPage: 1,
                    func: (currentPage) => {
                        this.pricepageTurning(currentPage)
                    },
                    handleSizeChange: (size) => {
                        this.pricesizeChange(size)
                    }
                },
                waitpageObj: {
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
                searchLoading: false,
                tableData: [],
                pricetableData:[],
                dataForm: {
                    dept: '',
                    ward: '',
                    searchKey: '',
                    advice: '',
                    bedType: '0',
                    emptyBed: '1'
                },
                // dialogVisible: false,
                recipeDialogVisible: false,
                valueTime: '',
                orderId: '',
                activeName: '0',
                activeNavName: '0',
                activeProtype: '0',
                activeChecktype: '0',
                orderStatus: null,
                ruleForm: {
                    name: ''
                },
                rules: {
                    customerName: [
                        {
                            required: true,
                            message: '请输入客户名称',
                            trigger: 'blur'
                        }
                    ],
                    customerCode: [
                        {
                            required: true,
                            message: '请输入客户编码',
                            trigger: 'blur'
                        }
                    ],
                    factoryCode: [
                        {
                            required: true,
                            message: '请输入厂商编码',
                            trigger: 'blur'
                        }
                    ],
                    customerType: [
                        {
                            required: true,
                            message: '请输入所属分类',
                            trigger: 'blur'
                        }
                    ],
                    customerCertificateNum: [
                        {
                            required: true,
                            message: '请输入营业执照',
                            trigger: 'blur'
                        }
                    ],
                    customerPhone: [
                        {
                            required: true,
                            message: '请输入注册手机',
                            trigger: 'blur'
                        }
                    ],
                    creditValue: [
                        {
                            required: true,
                            message: '请输入授信额度',
                            trigger: 'blur'
                        }
                    ],
                    creditDay: [
                        {
                            required: true,
                            message: '请输入授信账期',
                            trigger: 'blur'
                        }
                    ],
                    billCompany: [
                        {
                            required: true,
                            message: '请输入开票单位',
                            trigger: 'blur'
                        }
                    ],
                    billNumber: [
                        {
                            required: true,
                            message: '请输入开票税号',
                            trigger: 'blur'
                        }
                    ],
                    billRate: [
                        {
                            required: true,
                            message: '请输入开票税率',
                            trigger: 'blur'
                        }
                    ]
                },
                // 客户档案-搜索
                customerName: '',
                customerCode: '',
                customerType: '',
                region: '',
                address: '',
                contactPhone: '',
                customerLabel: '',
                myScope: 'all',
                idCustomer: '',
                // 客户档案编辑
                editForm: {
                    customerName: '',
                    customerCode: '',
                    factoryCode: '',
                    customerType: '',
                    customerCertificateNum: '',
                    customerPhone: '',
                    status: '',
                    contactName: '',
                    contactPhone: '',
                    creditValue: '', // 授信额度
                    creditDay: '',
                    address: '',
                    description: '',
                    billCompany: '', // 开票单位
                    billNumber: '',
                    billRate: '',
                    customerCertificate: '',
                    customerPermit: '',
                    payMethod: '' // 支付方式
                }
            }
        },
        created() {
            this.listCust()
        },
        methods: {
            // 上传文件
            handleAvatarSuccess(res) {
                this.editForm.customerCertificate = res.data.link // URL.createObjectURL(file.raw)
            },
            handleAvatarSuccessStore(res) {
                this.editForm.customerPermit = res.data.link // URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 9
                if (!isIMAGE) {
                    this.$message.error('上传文件只能是图片格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 9MB!')
                }
                return isIMAGE && isLt2M
            },
            addressInfo(addressInfo) {
                console.log(addressInfo)
                // Object.assign(this.ruleForm, addressInfo)
            },
            noCustTypeClick(tab, event) {
                this.myScope = tab.name
                this.listCust()
            },
            cancelDialog() {
                this.dialogVisible = false
            },
            back() {
                this.detail = true
            },
            link() {
                this.detail = false
            },
            selectPay(row){
                if (row === 0) {
                    this.wxzfTag = !this.wxzfTag
                }
                if (row === 1) {
                    this.yhzfTag = !this.yhzfTag
                }
                if (row === 2) {
                    this.sxzfTag = !this.sxzfTag
                }
                if (row === 3) {
                    this.wuzfTag = !this.wuzfTag
                }
            },
            search() {},
            shouxin() {
                console.log(12121)
                this.dialogVisible = true
            },
            // 保存
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         alert('submit!')
                //     } else {
                //         console.log('error submit!!')
                //         return false
                //     }
                // })
                let temp = []
                if(this.wxzfTag) {
                    temp.push('0')
                }
                if(this.yhzfTag) {
                    temp.push('1')
                }
                if(this.sxzfTag) {
                    temp.push('2')
                }
                if(this.wuzfTag) {
                    temp.push('3')
                }
                this.editForm.payMethod = temp.join(',')
                this.loading = true
                this.$post(this.$api.customermanage.update_cust, this.editForm).then(
                    (data) => {
                        if (data && data.code === 200) {
                            this.loading = false
                            this.$message(data.msg);
                            this.back()
                        }
                    }
                )
            },
            resetForm(formName) {
                this.back()
                // this.$refs[formName].resetFields()
            },
            search() {
                this.listCust()
            },
            reset() {
                this.activeName = '1'
                this.dataForm.searchKey = ''
                this.dataForm.valueTime = ''
            },
            getId(id) {
                this.orderId = id
            },
            deptChange() {
                console.log('search')
            },
            // 页码改变
            pageTurning(page) {
                this.pageObj.currentPage = page
                this.listCust()
            },
            pricepageTurning(page) {
                this.pricepageObj.currentPage = page
                this.selectPrice()
            },
            // 页面数量改变
            pricesizeChange(size) {
                this.pricepageObj.size = size
                this.selectPrice()
            },
            // 页面数量改变
            sizeChange(size) {
                this.pageObj.size = size
                this.listCust()
            },
            handleClose() {
                this.dialogVisible = false
            },
            recipeHandleClose() {
                this.recipeDialogVisible = false
            },
            openRecipeDialog() {
                this.recipeDialogVisible = true
            },
            preview(row) {
                this.dialogVisible = true
                this.id = row.id
                this.orderStatus = row.status
            },

            previewSend(row) {
                this.dialogVisible = true
                this.id = row.id
                this.orderStatus = row.status
            },
            //审核 详细
            previewSendcheck(row) {
                this.detail = false
                this.showCheck=true
                //this.idCustomer = row.id
                this.queryApplyCustDetail(row.id)
                //this.id = row.id
                //this.orderStatus = row.status
            },
            // 切换状态
            handleClick() {
                this.pageObj.size = 10
                this.pageObj.total = 0
                this.pageObj.currentPage = 1
                let t = this.activeNavName
                //this.getAuditList()
                if(t==1)
                    this.checkClick()
            },
            //子页面切换
            handletwoClick() {
                this.pageObj.size = 10
                this.pageObj.total = 0
                this.pageObj.currentPage = 1
                let t = this.activeName
                if(t==1)
                    this.selectPrice()
            },
            async selectPrice(){
                let params = {
                    isFixed: this.activeProtype, // 0、未定 1、已定价
                    customerId: this.editForm.id,
                    current: this.pricepageObj.currentPage,
                    size: this.pricepageObj.size,
                    keywords:''
                }
                let {code, data} = await this.$get( this.$api.price.findSpecialPriceByCustomerId, params
                )
                if (code === 200) {
                    debugger
                    this.pricepageObj.total = data.total
                    this.pricetableData = data.records
                }else{
                    this.pricetableData =[]
                }
            },
            // 审核列表
            async checkClick(){
                let params = {
                    status: this.activeChecktype, // 0、待支付 1、待配送；2、已发货；4、已关闭
                    current: this.waitpageObj.currentPage,
                    size: this.waitpageObj.size
                }
                let {code, data} = await this.$get( this.$api.customermanage.applyList, params
                )
                if (code === 200) {
                    this.waitpageObj.total = data.total
                    this.waitcustomerData = data.records
                }
            },
            ProtypeClick() {},

            // 获取药品订单列表数据
            async getAuditList() {
                let params = {
                    status: this.activeName === '5' ? '' : this.activeName, // 0、待支付 1、待配送；2、已发货；4、已关闭
                    current: this.pageObj.currentPage,
                    size: this.pageObj.size,
                    compositeSearch: this.dataForm.searchKey,
                    createTimeBegin: this.dataForm.valueTime
                        ? this.dataForm.valueTime[0]
                        : '',
                    // createTimeBegin: '2020-08-20',
                    createTimeEnd: this.dataForm.valueTime
                        ? this.dataForm.valueTime[1]
                        : ''
                    // createTimeEnd: '2020-10-01'
                }
                let {code, data} = await this.$post(
                    this.$api.manager.pageListPc,
                    params
                )
                if (code === 200) {
                    this.pageObj.total = data.total
                    this.tableData = data.records
                }
            },
            // 业务代码
            editCustomer(row) {
                this.detail = false
                this.idCustomer = row.id
                this.queryCustDetail()
            },
            listCust() {
                this.loading = true
                let param = {
                    current: this.pageObj.currentPage,
                    size: this.pageObj.size,
                    customerName: this.customerName,
                    customerCode: this.customerCode,
                    customerType: this.customerType,
                    region: this.region,
                    address: this.address,
                    contactPhone: this.contactPhone,
                    customerLabel: this.customerLabel,
                    scope: this.myScope
                }
                this.$get(this.$api.customermanage.listCust, param).then((data) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        this.pageObj.total = data.data.total
                        this.customerData = data.data.records
                    }
                })
            },
            queryCustDetail() {
                this.loading = true
                let param = {
                    custId: this.idCustomer
                }
                this.$get(this.$api.customermanage.queryCustDetail, param).then(
                    (data) => {
                        if (data && data.code === 200) {
                            this.loading = false
                            // this.pageObj.total = data.data.total
                            this.editForm = data.data
                            this.addressData = data.data.addressList
                            this.wxzfTag = this.editForm.payMethod.includes('0')
                            this.yhzfTag = this.editForm.payMethod.includes('1')
                            this.sxzfTag = this.editForm.payMethod.includes('2')
                            this.wuzfTag = this.editForm.payMethod.includes('3')
                        }
                    }
                )
            },
            // 查询申请详细
            queryApplyCustDetail(temp) {
                this.loading = true
                let param = {
                    id: temp
                }
                this.$get(this.$api.customermanage.applyDetail, param).then(
                    (data) => {
                        if (data && data.code === 200) {
                            // this.pageObj.total = data.data.total
                            this.editForm = data.data
                        }
                        this.loading = false
                    }
                )
            },
            async audApplyCust(tempstatus) {
                this.loading = true
                let par=this.editForm
                par.status=tempstatus
                par.customerApplyId=this.editForm.id
                par.creditValue=0
                this.$post(this.$api.customermanage.applyAudit, par).then(
                    (data) => {
                        if (data && data.code === 200) {
                            this.detail=true
                            this.checkClick()
                            // this.pageObj.total = data.data.total
                            //this.editForm = data.data
                        }
                        this.loading = false
                    }
                )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tabs-main {
        background: $white;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
    }
    .middle {
        background: #ffffff;
        margin-top: 14px;
        border-radius: 6px;
        padding: 10px;
    }
    .basic-info {
        width: 60%;
        margin: 0 auto;
    }
    .special-price {
        padding: 10px;
    }
    .customer-credit {
        display: flex;
    }
    .customer-credit-l {
        width: 100%;
        height: 841px;
        background: #f2f3f3;
        opacity: 1;
        border-radius: 12px;
    }
    .tip {
        height: 47px;
        background: #fcf9da;
        opacity: 1;
        border-radius: 3px;
        line-height: 47px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        padding-left: 67px;
    }
    .title-w {
        height: 45px;
        background: #f2f3f3;
        opacity: 1;
        border-radius: 3px;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
    }
    .title {
        font-size: 0.18rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        margin-left: 17px;
        color: #333333;
    }
    .form-wrap {
        border-radius: 6px;
    }

    .back {
        display: flex;
        background: $white;
    }
    .back-but {
        width: 140px;
        background: #ff4d04;
        opacity: 1;
        border-radius: 10px 0px 0px 10px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 29px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .el-row {
        // margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        // display: flex;
        // align-items: center;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .col {
        display: flex;
    }
    .lab {
        margin-right: 28px;
        min-width: 69px;
        font-size: 14px;
        line-height: 32px;
    }
    .wechat-pay {
        background: url("../../../assets/images/shopInit/wxzf.png") top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .bank-pay {
        background: url("../../../assets/images/shopInit/yykzf.png")  top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .shouxin-pay {
        background: url("../../../assets/images/shopInit/ziyuan@2x.png")  top center no-repeat;
        background-size: 46%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .wuliu-pay {
        background: url("../../../assets/images/shopInit/wlzf.png")  top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .wechat-pay.act {
        background: url("../../../assets/images/shopInit/cur_wxzf.png") top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .bank-pay.act {
        background: url("../../../assets/images/shopInit/cur_yykzf.png")  top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .shouxin-pay.act {
        background: url("../../../assets/images/shopInit/cur_ziyuan@2x.png")  top center no-repeat;
        background-size: 46%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .wuliu-pay.act {
        background: url("../../../assets/images/shopInit/cur_wlzf.png")  top center no-repeat;
        background-size: 50%;
        height: 140px;
        display: block;
        margin: 0 auto;
        .pay-title{
            padding-top: 100px;
        }
    }
    .pay-title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 24px;
        color: #909BAA;
        text-align: center;
        margin-top: 21px;
        margin-bottom: 34px;
    }

    // 上传文件
    .up-file {
        display: flex;
        justify-content: center;
        padding-top: 0.24rem;
        text-align: center;
    }
    .avatar-uploader /deep/ .el-upload {
        // border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar {
        width: 1.84rem;
        height: 1.64rem;
        margin-left: 0.8rem;
        border-radius: 6px;
    }
    .up {
        width: 1.84rem;
        height: 1.64rem;
        background-image: url('../../../assets/images/shopInit/271.png');
        background-size: 100%;
        margin-left: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .avatar-img {
        width: 1.16rem;
        height: 0.93rem;
        background-image: url('../../../assets/images/shopInit/tupian@2x.png');
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #ff3f6b;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 108px;
        height: 108px;
        line-height: 108px;
        text-align: center;
    }
    .te {
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 19px;
        color: #a1a0a1;
        text-align: center;
        margin-left: 0.8rem;
        margin-top: 0.1rem;
        margin-bottom: 20px;
    }
    .paytype{

        padding-bottom: 20px;
    }

</style>

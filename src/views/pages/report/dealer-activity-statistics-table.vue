<template>
    <div v-if="activePage==0">
        <div class="form-wrap bgff mgt10">
            <div class="box com-body" style="flex: 1">
                <el-row :gutter="20" style="margin-bottom: 6px;">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">今日日期</span>
                                <el-date-picker v-model="formdata.currentDate" value-format="yyyy-MM-dd" align="right" type="date"></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">开始日期</span>
                                <el-date-picker v-model="formdata.startDate" value-format="yyyy-MM-dd" align="right" type="date"></el-date-picker>
                              
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="col">
                                <span class="lab">结束日期</span>
                                <el-date-picker v-model="formdata.endDate" value-format="yyyy-MM-dd" align="right" type="date"></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    
                </el-row>
                <div class="mini-switch-navorbtn">
                    <div class="btnlist" style="margin-bottom: 10px;">
                        <button @click="addPro">
                            <icon-svg name="sousuo"></icon-svg>
                            <span>搜索</span>
                        </button>
                    </div>
                </div>
                <div>
                    <sn-table
                        :table-data="tableData"
                        :columns="columns"
                        :loading="loading"
                        :page-obj="pageObj"
                        layout="prev, pager, next, sizes, jumper"
                        :is-fit="true"
                        :order-num="true"
                    >
                        <template slot="hotSale" slot-scope="{scope}">
                            <div>
                                <div>{{hotSaleOption[scope.hotSale]}}</div>
                            </div>
                        </template>
                        <template slot="status" slot-scope="{scope}">
                            <div>
                                <div v-if="scope.status==1">{{statusOption[scope.status]}}</div>
                                <div v-else style="color: red">{{statusOption[scope.status]}}</div>
                            </div>
                        </template>
                        <template slot="operate" slot-scope="scope">
                            <div class="evtbtn">
                                <!-- <el-button size="small" type="text" @click="editRows(scope.scope)">编辑</el-button> -->
                                <el-button size="small" type="text" @click="addAuth(scope.scope)">授权</el-button>
                            </div>
                        </template>
                    </sn-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            formdata: {
              currentDate: '',
              startDate: '',
              endDate: ''
            },
            keyWord: '',
            dataType: '',
            proId: 0,
            active: 0,
            height: '0.84',
            num: 0,
            lineNum: 6,
            dialogformdata: {
                chargetype: '1',
                minValue: '',
                maxValue: '',
                saleValue: ''
            },
            doctorList1: [],
            chargetype: '1',
            showVisible: false,
            title: '',
            activeName: '0',
            activeType: '0',
            activePage: '0',
            totalPro: [
                {
                    code: '14100354',
                    cpanme: '安稳+瓶装试条套装~25支/套（透明）',
                    cpatotal: '10',
                    cptotal: '100'
                }
            ],
            youhuiList: [
                {
                    code: '14100354',
                    cpanme: '10',
                    cpatotal: '10',
                    cptotal: '100'
                }
            ],
            teshuList: [
                {
                    code: '14100354',
                    cpanme: '安稳+瓶装试条套装~25支/套（透明）',
                    cpatotal: '10',
                    cptotal: '100'
                }
            ],
            activeProtype: 'all',
            columns: [
                {label: '经销商名称', prop: 'mchName', width: 220},
                // {label: '经销商类型', prop: 'mchType'},
                {label: '累积门店数', prop: 'customerTotal'},
                {label: '今日新增门店数 ', prop: 'customerNew'},
                {label: '累积订单数', prop: 'orderTotal'},
                {label: '新增订单数', prop: 'orderNew'},
                {label: '累积订单金额', prop: 'orderAmountTotal'},
                {label: '新增订单金额', prop: 'orderAmountNew'},
                // {label: '连锁器械', prop: 'customerTypeOrderCount7'},
                // {label: '连锁无糖', prop: 'customerTypeOrderCount8'},
                // {label: '其它', prop: 'customerTypeOrderCount9'},
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
            goodViewName: '0',
            hotSaleOption: {
                0: '否',
                1: '是'
            },
            statusOption: {
                0: '启用中',
                1: '已停用'
            },
            selectProductId: '',
            checkAll: false,
            checkList: [], // 已经选择的列表
            merchantList: [], // 所有的经销商列表
            merchantListAuth: [], // 该产品已经授权的经销商列表
            isIndeterminate: false
        }
    },
    computed: {},
    created() {
        this.getNowTime()
        this.getProductDatas()
        // this.getDoctorList1()
    },
    methods: {
      getNowTime() {
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            month = month.toString().padStart(2, "0");
            date = date.toString().padStart(2, "0");
            var defaultDate = `${year}-${month}-${date}`;
            this.$set(this.formdata, "currentDate", defaultDate);
        },
        changeShowIndex(index) {
            this.activePage = index
            this.getProductDatas()

        },
        async  addRows() {
            /* this.title = '添加默认策略'
                this.showVisible=true */
            this.activePage = '1'
            this.dataType = '2'
        },
        async getDoctorList1() {
            let res = await this.$get(this.$api.factoryProduct.SpecList, null)
            if (res && res.code === 200) {
                let data = res.data
                this.doctorList1 = data.records
            }
        },
        async editRows(rows) {
            /* this.title = '添加默认策略'
                this.showVisible=true */
            this.activePage = '1'
            this.dataType = '1'
            this.proId = rows.id


        },
        addAuth(row) {
            this.selectProductId = row.id
            this.title = '授权产品'
            this.isEdit = false
            this.showVisible = true
            this.checkAll = ''
            let params = {
                size: 10000,
                current: 1,
                status:0
            }
            this.$post(this.$api.factoryProduct.getAllProductList, params).then(res=>{
                if (res && res.code === 200) {
                    let data = res.data
                    this.merchantList = data.records
                }
                // 查询该产品已经授权的经销商列表
                this.getAuthList(row.id)
            })
        },
        async getAuthList(id) {
            let params = {
                currentDate: this.formdata.currentDate,
                startDate: this.formdata.startDate,
                endDate: this.formdata.endDate,
                size: this.pageObj.size,
                current: this.pageObj.currentPage,
            }
            let res1 = await this.$post(this.$api.report.salesman, params)
            if (res1 && res1.code === 200) {
                let data1 = res1.data
                this.merchantListAuth = data1
                let list = []
                data1.map(item=> {
                    list.push(item.productName + ' ' + item.productModel)
                })
                this.checkList = list

                // if (this.checkList.length) {
                //     this.checkAll = this.checkList.length === this.merchantList.length ?  true : false
                // }
                // this.isIndeterminate = this.checkList.length > 0 && this.checkList.length < this.merchantList.length
            } else {
                this.$message.error(res1.msg)
            }
        },
        async getValue(e, row) {
            if (e) {
                // 保存选择的经销商
                this.savaAuth([row.id])
            } else {
                // 删除选择的经销商
                let idsList = []
                this.merchantListAuth.map(item=> {
                    if (item.productId === row.id) {
                        idsList[0] = item.id
                    }
                })
                this.deleteAuth(idsList)
            }


        },
        async deleteAuth(idsList) {

            let res1 = await this.$post(this.$api.factoryProduct.authRemove + '?ids=' + idsList.toString(), null)
            if (res1 && res1.code === 200) {
                this.$message.success('删除成功')
            } else {
                this.$message.error(res1.msg)
            }
            // 重新获取已经授权的列表
            this.getAuthList(this.selectProductId)
        },
        async savaAuth(array) {
            let listPro = []
            listPro[0] = this.selectProductId
            let params = {
                // mchIdList: [row.id],
                mchIdList: listPro,
                productIdList: array
            }
            let res1 = await this.$post(this.$api.factoryProduct.saveAuth, params)
            if (res1 && res1.code === 200) {
                this.$message.success('添加成功')
                this.getAuthList(this.selectProductId)
            } else {
                this.$message.error(res1.msg)
            }
        },
        handleCheckAllChange(val) {
            if (val) {
                // 全选
                let options = []
                let arrayAll = [] // 所有的经销商id
                let array = []  // 需要新增的经销商id
                let arrayHas = []  // 已经授权的经销商id
                this.merchantList.map(item=> {
                    options.push(item.productName+ ' ' +item.productModel)
                    arrayAll.push(item.id)
                })
                this.merchantListAuth.map(item=> {
                    arrayHas.push(item.productId)
                })
                arrayAll.forEach(item => {
                    if (!arrayHas.includes(item)) {
                        array.push(item)
                    }
                })
                this.checkList = val ? options : []

                // 保存所有的经销商  全选
                console.log(array)
                this.savaAuth(array)
            } else {
                this.checkList = []
                let array = []
                this.merchantListAuth.map(item=> {
                    array.push(item.id)
                })
                this.deleteAuth(array)
            }

            this.isIndeterminate = false
        },
        async editDefault() {
            this.title = '编辑默认策略'
            this.showVisible = true
        },
        async cancelDialog() {
            this.showVisible = false
        },
        up () {
            if (this.num !== this.product.length) {
                this.num++
            }
        },
        down () {
            if (this.num !== 0) {
                this.num--
            }
        },
        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.getProductDatas()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.getProductDatas()
        },
        // 切换状态
        handleClick() {
            this.pageObj.size = 10
            this.pageObj.total = 0
            this.pageObj.currentPage = 1
        },
        addPro() {
            this.getProductDatas()
        },
        handleClickType() {
            this.getProductDatas()
        },

        // 获取经销商列表数据
        getProductDatas() {
            let params = {
                currentDate: this.formdata.currentDate,
                startDate: this.formdata.startDate,
                endDate: this.formdata.endDate,
                size: this.pageObj.size,
                current: this.pageObj.currentPage,
            }

            this.$post(this.$api.report.merchantActive, params).then(res=>{
                if (res && res.code === 200) {
                    this.pageObj.total = res.data.total
                    this.tableData = res.data.records
                }
            })
        },


        handleAvatarSuccess(res) {
            this.basicInfo.storeCertificate = res.data.link // URL.createObjectURL(file.raw)
        },
        handleAvatarSuccessStore(res) {
            this.basicInfo.storePermit = res.data.link // URL.createObjectURL(file.raw)
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
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.factoryProductIds = []
            this.multipleSelection.map((item) => {
                this.factoryProductIds.push(item.id)
            })
            console.log('factoryProductIds', this.factoryProductIds)
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        pre () {
            if (this.active > 0) {
                this.active --
            }
        },
        up () {
            if (this.num !== this.productLeft.length) {
                this.num++
            }
        },
        down () {
            if (this.num !== 0) {
                this.num--
            }
        },
        // 业务代码
        // productIdSearch () {
        //   this.getAllProductList()
        // },
        actvieProduct (item) {
            this.activeIcon = item.dictKey
            // this.productForm.sortNum = item.sort
            this.productForm.icon = item.dictKey
        },
        productDelete() {
            if (this.productForm.icon !== '') {
                this.productLeft.map((item, index) => {
                    if (this.productForm.icon === item.icon) {
                        this.productLeft.splice(index, 1)
                    }
                })
            } else {
                this.$message('请选择要删除的品类')
            }

        },
        productSave() {
            if (this.productForm.name === '') {
                this.$message('请填写品类名称')
                return
            }
            this.productLeft.push({... this.productForm})
            this.productLeft.sort((a, b) => {
                return String(a.sort).localeCompare(String(b.sort))
            })
            console.log('merchantStoreProductCategoryList', this.productLeft)
            // this.save()
        },
        productClick(item, index) {
            if (index >= 2) {
                this.activeIcon = item.icon
                console.log('activeIcon', this.activeIcon)
                this.productForm = {...item}
            }
        },
        getAllProductList() {
            let param = {
                // productName: this.productName
                productName: '',
                productType: 0
            }
            this.$get(this.$api.shopInit.getAllProductList, param).then(data => {
                if (data && data.code === 200) {
                    this.getAllProductListData = data.data
                }
            })

        },
        payClick() {
            this.basicParam.merchantStoreExtPaytype = (this.wechat ? '1' : '0') + ',' + (this.bank ? '1' : '0') + ',' + (this.month ? '1' : '0') + ',' + (this.wuliu ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        wuliuClick() {
            this.basicParam.merchantStoreExtSendtype = (this.wilo ? '1' : '0') + ',' + (this.kuaidi ? '1' : '0') + ',' + (this.shop ? '1' : '0') + ',' + (this.kehu ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        cangkuSetClick() {
            this.basicParam.merchantStoreExtSkuSetting = this.cangkuSet ? '1' : '0'
        }

    }
}
</script>

<style lang="scss" scoped>
    .priceinfo{
        margin-top: 15px;
        background: $content--background-color;
        display: flex;
        .box{
            border-radius: $border-radius;
        }
        .tab-list{
            .rows{

            }
        }
        .com-body{
            padding: 10px;
            background: #fff;
            border: 1px solid #fff;
            border-radius: $border-radius;
        }

    }
    .goodsTypeInfo {
        margin-top: 15px;
        background: $content--background-color;
        display: flex;
        .box{
            border-radius: $border-radius;
        }
        .tab-list{
            .rows{

            }
        }
        .com-body{
            padding: 10px;
            background: #fff;
            border: 1px solid #fff;
            border-radius: $border-radius;
        }

    }

    .line{
        height: 10px;
        background:$content--background-color;
    }
    .tips{
        background: #FCFADE;
        border-radius: 6px;
        padding: 6px 10px;
        margin-top: 10px;
        b{
            margin: 0 6px;
        }
    }
    .form-wrap{
        border-radius: 6px;
    }
    .name {
        display: flex;
        align-items: center;
        margin: 15px 0;
        .input-name {
            width: 400px;
        }
        b{
            color: red;margin-right: 5px;font-size: 15px;
        }
        .right-col{
        }
        div{
            flex: 1;
        }
    }
    .btn {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        p {
            flex: 1;
        }
    }

    // 第三步
    .step-m-3 {
        margin: 0 auto;
        margin-top: 0.43rem;
        margin-bottom: 0.1rem;
        width: 8.09rem;
        height: 5.97rem;
        display: flex;
    }
    .step-m-3-l {
        width: 1.84rem;
        height: 100%;
        // background: #F2F3F3;
        opacity: 1;
        border-radius: 7px;
        margin-right: 0.07rem;
    }
    .add {
        height: 0.35rem;
        background: #FF4D04;
        opacity: 1;
        border-radius: 0.03rem;
        font-size: 0.21rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 27px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-i {
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.15rem;
    }
    .add-list {
        background: #F2F3F3;
        border-radius: 0.15rem;
        width: 100%;
        height: 5.52rem;
        margin-top: 0.1rem;
        position: relative;
    }
    .add-top {
        width: 1.84rem;
        height: 0.33rem;
        margin-bottom: 0.02rem;
    }
    .rollScreen_container{
        position:relative;
        overflow: hidden;
    }
    .rollScreen_list{
        transition: 0.5s linear;
    }
    .add-list-item {
        width: 1.58rem;
        height: 0.78rem;
        background: #FFFFFF;
        border-radius: 0.06rem;
        margin: 0 auto;
        margin-top: 0.06rem;
        // display: flex;
        // justify-content: center;
        // align-items: center;
    }
    .item-logo {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.06rem;
        margin-bottom: 0.06rem;
    }
    .item-t {
        height: 0.20rem;
        font-size: 0.15rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        // line-height: 20px;
        color: #FF4D04;
        text-align: center;
    }
    .add-bottom {
        width: 1.84rem;
        height: 0.33rem;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .step-m-3-r {
        width: 100%;
        height: 100%;
        padding-left: 0.94rem;
        margin-top: 0.45rem;
        // background: #F2F3F3;
    }
    .shop-logo-t {
        font-size: 0.14rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 19px;
        color: #333333;
        margin-right: 0.4rem;
    }
    .shop-logo-i {
        width: 1.84rem;
        height: 1.64rem;
    }
    // .line {

    // }
    .line .el-input {
        width: 3.35rem;
        height: 0.30rem;
        margin-top: 0.42rem;
        // margin-left: 0.4rem;
    }
    .line .el-textarea {
        width: 3.35rem;
        height: 1.27rem !important;
        margin-top: 0.47rem;
    }
    .line /deep/ .el-textarea__inner {
        height: 100% !important;
    }
    .opea {
        display: flex;
        margin-top: 0.27rem;
    }
    .delete, .save {
        width: 1.15rem;
        height: 0.35rem;
        background: #F2F3F3;
        opacity: 1;
        border-radius: 0.03rem;
        display: flex;
        font-size: 0.15rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 20px;
        color: #FF4D04;
        justify-content: center;
        align-items: center;
    }
    .delete img {
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.17rem;
    }
    .save img {
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.17rem;
    }

    // 第三步
    .step-m-param {
        width: 10rem;
        height: 6.30rem;
        background: #FFFFFF;
        opacity: 1;
        border-radius: 0.07rem;
        margin: 0 auto;
    }
    .m-param {
        margin-top: 0.35rem;
        margin-left: 1.76rem;
    }
</style>
<style lang='scss' scoped>
.basic-info {
  width: 60%;
  margin: 0 auto;
}
.title-w {
  height: 45px;
  background: #F2F3F3;
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

.box .box-group {
    padding: 5px;
}

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
.select-frant label{
    width: 240px;
    height: 30px;
    line-height: 22px;
    display: block;
    float: left;
    margin-top: 6px;
    border-radius: 4px;
    margin-right: 10px;
    background: #dedede;padding: 6px 28px 6px 10px;
}
.select-frant .cur{
    color: #fff;
    margin-top: 6px;
    background: url(../../../assets/images/shopInit/gou2.png) no-repeat 210px center #ff4d04;
}
</style>

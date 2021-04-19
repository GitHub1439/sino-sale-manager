<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="0"></el-tab-pane>
                    <el-tab-pane label="运费模板" name="1"></el-tab-pane>
                    <el-tab-pane label="品牌代理" name="2"></el-tab-pane>
                    <el-tab-pane label="收款方式" name="3"></el-tab-pane>
                    <el-tab-pane label="店铺二维码" name="4"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="tabs-main baseinfo" v-if="activeName==0">
            <basic-info></basic-info>
        </div>
        <freightcon v-if="activeName==1"></freightcon>
        <div class="form-wrap bgff mgt10" v-if="activeName==2">
            <div class="mini-switch-navorbtn">
                <div class="tabs-card">
                    <el-tabs v-model="activeProtype" type="card" @tab-click="noCustTypeClick">
                        <el-tab-pane label="所有产品" name="0"></el-tab-pane>
                        <el-tab-pane label="已导入产品" name="1"></el-tab-pane>
                        <el-tab-pane label="未导入产品" name="2"></el-tab-pane>
                        <el-tab-pane label="活动产品" name="3"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="btnlist">
                    <input class="inputval-noborder" placeholder="请输入商品名或编码搜索" v-model="productName" @change="productNameSearch">
                    <button @click="importStore">
                        <icon-svg name="success"></icon-svg><span>导入店铺</span>
                    </button>
                </div>
            </div>
            <el-table
                ref="multipleTable"
                :row-key="getRowKeys"
                @select="handleSelectionChange"
                @select-all="onTableSelectAll"
                :data="getAllProductListData"
                border
                style="width: 100%;"
            >
                <el-table-column
                    :reserve-selection=true
                    type="selection"
                    width="40"
                >
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="产品名称"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="productSn"
                    label="厂商编码"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="productCategoryName"
                    label="厂商分类"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="productModel"
                    label="型号规格"
                    sortable
                >
                </el-table-column>
                <!-- <el-table-column
                prop="msrp"
                label="建议零售价">
              </el-table-column> -->
                <el-table-column
                    prop="productPic"
                    label="配图"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.productPic" style="width: 1rem; height: 1rem; display: block;">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productDesc"
                    label="产品说明"
                >
                </el-table-column>
            </el-table>
            <div class="sn-row flex-end">
                <el-pagination
                    class="width-auto"
                    background
                    layout="total, prev, pager, next, sizes, jumper"
                    :page-size="pageObj.size"
                    :total="pageObj.total"
                    :current-page="pageObj.currentPage"
                    @current-change="pageObj.func"
                    @size-change="pageObj.handleSizeChange"
                ></el-pagination>
            </div>
        </div>
        <!-- <div class="tabs-main baseinfo" v-if="activeName==3">
            <basic-info></basic-info>
        </div> -->
        <div class="tabs-main baseinfo" v-if="activeName==3">
            <paymethod></paymethod>
        </div>

        <minitest v-if="activeName==4"></minitest>
    </div>
</template>

<script>
import basicInfo from './basicInfo'
import freightcon from './freight/list'
import minitest from './mini-test'
import paymethod from './pay-method'
export default {
    components: {
        basicInfo,
        freightcon,
        minitest,
        paymethod
    },
    data() {
        return {
            loading: false,
            productName: '',
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
            searchLoading: false,
            tableData: [],
            getAllProductListData: [],
            dataForm: {
                dept: '',
                ward: '',
                searchKey: '',
                advice: '',
                bedType: '0',
                emptyBed: '1'
            },
            dialogVisible: false,
            recipeDialogVisible: false,
            valueTime: '',
            orderId: '',
            activeName: '0',
            activeProtype: '0',
            orderStatus: null,
            selectedData: [],
            selectedDataId: []
        }
    },
    created() {
        // this.getAuditList()
        // this.getAllProductList()
    },
    methods: {
        search() {
            // this.getAuditList()
        },
        reset() {
            this.activeName = '1'
            this.dataForm.searchKey = ''
            this.dataForm.valueTime = ''
        },
        getRowKeys(row) {
            console.log(row.id)
            return row.id
        },
        handleSelectionChange(val) {
            this.selectedData = val
            this.selectedDataId = []
            this.selectedData.map((item, index) => {
                this.selectedDataId.push(item.id)
            })
            console.log(this.selectedDataId)
        },
        onTableSelectAll(val) {
            this.selectedData = val
            this.selectedDataId = []
            this.selectedData.map((item, index) => {
                this.selectedDataId.push(item.id)
            })
            console.log(this.selectedDataId)
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
            this.getAllProductList()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.getAllProductList()
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
        // 切换状态
        handleClick() {
            this.pageObj.size = 10
            // this.pageObj.size = 2
            this.pageObj.total = 0
            this.pageObj.currentPage = 1

            if (this.activeName == 2) {
                this.getAllProductList()
            }
        },
        productNameSearch () {
            this.getAllProductList()
        },
        noCustTypeClick(tab, event) {
            this.activeProtype = tab.name
            if (this.activeProtype === '0') { // 所有
                this.getAllProductList()
            }
            if (this.activeProtype === '1' || this.activeProtype === '2' || this.activeProtype === '3') { // 已导入
                this.getAllProduct()
            }

        },
        getAllProductList() {
            let param = {
                productName: this.productName,
                productType: this.activeProtype,
                current: this.pageObj.currentPage,
                size: this.pageObj.size
            }
            this.$get(this.$api.shopInit.getAllProductList, param).then(data => {
                if (data && data.code === 200) {
                    this.getAllProductListData = data.data.records
                    this.pageObj.total = data.data.total
                }
            })

        },
        getAllProduct() {
            let param = {
                productName: this.productName,
                type: this.activeProtype - 1,
                current: this.pageObj.currentPage,
                size: this.pageObj.size
            }
            this.$get(this.$api.shopInit.getAllProduct, param).then(data => {
                if (data && data.code === 200) {
                    this.getAllProductListData = data.data.records
                    this.pageObj.total = data.data.total
                }
            })

        },
        importStore () {
            let param = {
                factoryProductIds: this.selectedDataId
            }
            this.loading = true
            this.$post(this.$api.shop.importMerchantStoreExt, param).then(data => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.$message(data.msg)
                    this.selectedData = []
                    this.selectedDataId = []
                    this.$refs.multipleTable.clearSelection()
                    this.getAllProductList()
                } else {
                    this.loading = false
                    this.$message(data.msg)
                }
            })
        },
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
.baseinfo {
}
.form-wrap {
    border-radius: 6px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF4E07;   // 进行修改选中项背景和字体
}
</style>

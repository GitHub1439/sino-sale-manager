<template>
    <div>
        <div v-if="activePage == 0">
            <div class="top-nav">
                <div class="tabs-card">
                    <el-tabs
                        v-model="activeName"
                        type="card"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane label="产品库" name="0"></el-tab-pane>
                        <el-tab-pane label="产品类目" name="1"></el-tab-pane>
                        <el-tab-pane label="品牌管理" name="3"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="form-wrap bgff mgt10" v-if="activeName == 0">
                <div class="box com-body" style="flex: 1">
                    <el-row :gutter="20" style="margin-bottom: 20px">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="col">
                                    <span class="lab">产品名称</span>
                                    <el-input
                                        placeholder="请输入产品名称或产品编码"
                                        v-model="keyWord"
                                        clearable
                                    >
                                    </el-input>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <div class="col">
                                    <span class="lab">商品类型</span>
                                    <el-select v-model="productType" clearable>
                                        <el-option
                                            label="商品"
                                            :value="0"
                                        ></el-option>
                                        <el-option
                                            label="赠品"
                                            :value="1"
                                        ></el-option>
                                        <el-option
                                            label="商品&赠品"
                                            :value="2"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <div class="col">
                                    <span class="lab">产品类目</span>
                                    <el-select
                                        v-model="categoryId"
                                        placeholder="产品类目"
                                        clearable
                                    >
                                        <el-option
                                            v-for="item in doctorList1"
                                            :key="item.id"
                                            v-if="
                                                item.sort != 1 && item.sort != 2
                                            "
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="mini-switch-navorbtn">
                        <div class="tabs-card">
                            <el-tabs
                                v-model="activeProtype"
                                type="card"
                                @tab-click="handleClickType"
                            >
                                <el-tab-pane
                                    label="所有商品"
                                    name="-1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未上架"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已上架"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="库存不足"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="自有商品"
                                    name="3"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未做分类"
                                    name="4"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未设价格"
                                    name="5"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未配图"
                                    name="6"
                                ></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="btnlist"></div>
                    </div>
                    <div
                        class="mini-switch-navorbtn"
                        style="margin-bottom: 10px"
                    >
                        <div class="btnlist" style="text-align: right">
                            <button @click="exportProduct()">
                                <!-- <icon-svg name="success"></icon-svg> -->
                                <span>导出</span>
                            </button>
                            <button @click="pushShelves(1)">
                                <!-- <icon-svg name="success"></icon-svg> -->
                                <span>批量上架</span>
                            </button>
                            <button @click="downShelves(1)">
                                <!-- <icon-svg name="success"></icon-svg> -->
                                <span>批量下架</span>
                            </button>
                            <button @click="category()">
                                <!-- <icon-svg name="success"></icon-svg> -->
                                <span>批量分类</span>
                            </button>
                            <!--<button @click="remove()">-->
                            <!--&lt;!&ndash; <icon-svg name="success"></icon-svg> &ndash;&gt;-->
                            <!--<span>删除</span>-->
                            <!--</button>-->
                            <button @click="getProductDatas">
                                <icon-svg name="sousuo"></icon-svg><span>搜索</span>
                            </button>
                            <button @click="addPro">
                                <icon-svg name="tianjia"></icon-svg><span>添加</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <sn-table
                            ref="orderTable"
                            :table-data="tableData"
                            :columns="columns"
                            :loading="loading"
                            :page-obj="pageObj"
                            :is-fit="true"
                            :is-selection="true"
                            @selection-change="handleSelectChange"
                        >
                            <template slot="hotSale" slot-scope="{scope}">
                                <div>
                                    <div>
                                        {{hotSaleOption[scope.hotSale]}}
                                    </div>
                                </div>
                            </template>
                            <template slot="productType" slot-scope="{scope}">
                                <div>
                                    <div v-if="scope.productType == 0">
                                        商品
                                    </div>
                                    <div v-if="scope.productType == 1">
                                        赠品
                                    </div>
                                    <div v-if="scope.productType == 2">
                                        商品&赠品
                                    </div>
                                </div>
                            </template>
                            <template slot="status" slot-scope="{scope}">
                                <div>
                                    <div v-if="scope.status == 1">
                                        {{statusOption[scope.status]}}
                                    </div>
                                    <div v-else style="color: red">
                                        {{statusOption[scope.status]}}
                                    </div>
                                </div>
                            </template>
                            <template slot="operate" slot-scope="scope">
                                <div class="evtbtn">
                                    <el-button
                                        size="small"
                                        type="text"
                                        @click="editRows(scope.scope)"
                                    >
                                        编辑
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="text"
                                        @click="pushShelves(scope.scope)"
                                        v-if="scope.scope.status == 0"
                                    >
                                        上架
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="text"
                                        @click="downShelves(scope.scope)"
                                        v-else
                                    >
                                        下架
                                    </el-button>
                                </div>
                            </template>
                        </sn-table>
                    </div>
                </div>
            </div>
            <div class="goodsTypeInfo" v-if="activeName == 1">
                <pruduct-type></pruduct-type>
                <!-- <div class="form-wrap bgff mgt10">121331</div> -->
            </div>
            <div class="giftInfo" v-if="activeName == 2"></div>
        </div>
        <div v-if="activePage == 1">
            <detailIndexPage
                :change-show-index="changeShowIndex"
                :id="dataType == 2 ? '' : proId"
                :data-type="dataType"
            ></detailIndexPage>
        </div>
        <div v-if="activeName == 3" style="background: #fff">
            <productBrand></productBrand>
        </div>
        <el-dialog
            title="产品分类"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleCloseType"
        >
            <div>
                <el-form
                    ref="account"
                    :rules="accountRules"
                    :model="account"
                    label-width="80px"
                >
                    <el-form-item label="产品分类" prop="bank">
                        <!-- <el-select v-model="account.category" placeholder="请选择">
                            <el-option v-for="item in bankOptions" :key="item.dictKey" :label="item.label" :value="item.dictValue"></el-option>

                        </el-select> -->
                        <el-select
                            v-model="account.category"
                            placeholder="产品类目"
                            clearable
                        >
                            <el-option
                                v-for="item in doctorList1"
                                :key="item.id"
                                v-if="item.sort != 1 && item.sort != 2"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="accountAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import detailIndexPage from './product/detail-index'
import productBrand from './product/brand'
import pruductType from './product/pruduct-type'
import {setPathQuery} from '@/utils/index'
import qs from 'qs'
export default {
    components: {
        detailIndexPage,
        pruductType,
        productBrand
    },
    /* provide(){
           return{
             changeActivePage:this.changeActivePage
           }
         }, */
    data() {
        return {
            formdata: {},
            productType: '',
            categoryId: '',
            isHot: false,
            isAct: false,
            doctorList1: [],
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
            activeProtype: '-1',
            columns: [
                {label: '产品名称', prop: 'productName', width: 220},
                {label: '厂商编码', prop: 'factoryProductSn', width: 85},
                {label: '产品编码', prop: 'productSn', width: 85},
                {
                    label: '商品类型',
                    prop: 'productType',
                    slot: 'productType',
                    width: 100
                },
                {label: '产品类目', prop: 'categoryName'},
                {label: '产品型号', prop: 'productModel'},
                {label: '标准价格', prop: 'standardPrice'},
                {label: '库存', prop: 'productSku', width: 60},
                {label: '单位', prop: 'unit', width: 50},
                {label: '热销', prop: 'hotSale', slot: 'hotSale', width: 50},
                {label: '上架', prop: 'status', slot: 'status'},
                {slot: 'operate', label: '操作', width: 150}
            ], // 操作列
            loading: false,
            activeIcon: '',
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
            searchLoading: false,
            tableData: [],
            goodViewName: '0',
            hotSaleOption: {
                0: '否',
                1: '是'
            },
            statusOption: {
                0: '未上架',
                1: '已上架'
            },
            protypeOption: {
                0: '商品',
                1: '赠品',
                2: '商品&赠品'
            },
            selectList: [], // 选中项
            bankOptions: [],
            account: {
                category: ''
            },
            dialogVisible: false,
            accountRules: {
                bank: [
                    {required: true, message: '请选择产品分类', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.getProductDatas()
        this.getDoctorList1()
    },
    methods: {
        // 导出
        exportProduct() {
            let params = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                keyword: this.keyWord,
                productType: this.productType == null ? null : this.productType,
                categoryId: this.categoryId,
                scope: this.activeProtype == -1 ? '' : this.activeProtype,
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            }

            params.size = this.pageObj.size
            params.current = this.pageObj.currentPage

            let baseUrl =
                window.SITE_CONFIG.baseUrl + this.$api.product.exportProduct


            let newUrl = setPathQuery(baseUrl, params)
            console.log('newUrl', newUrl)
            window.open(newUrl)
        },
        changeShowIndex(index) {
            this.activePage = index
            this.getProductDatas()
        },
        async getDoctorList1() {
            let res = await this.$get(this.$api.product.proCategorys, null)
            if (res && res.code === 200) {
                let data = res.data

                this.doctorList1 = data
            }
        },
        async addRows() {
            /* this.title = '添加默认策略'
                this.showVisible=true */
            this.activePage = '1'
            this.dataType = '2'
        },
        async editRows(rows) {
            /* this.title = '添加默认策略'
                this.showVisible=true */
            this.activePage = '1'
            this.dataType = '1'
            this.proId = rows.id
        },
        async editDefault() {
            this.title = '编辑默认策略'
            this.showVisible = true
        },
        async cancelDialog() {
            this.showVisible = false
        },
        up() {
            if (this.num !== this.product.length) {
                this.num++
            }
        },
        down() {
            if (this.num != 0) {
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
        handleClick() {},
        addPro() {
            this.activePage = '1'
            this.dataType = '2'
        },
        handleClickType() {
            this.getProductDatas()
        },
        deleteDefaultRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.dataListLoading = true
                    let data = await this.$post('/sysMenu/menuDelete', row)
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                /*  */
                            }
                        })
                        this.getDataList()
                    } else {
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
                .catch(() => {
                    /*  */
                })
        },

        // 批量确认
        // getSelectAll() {
        //     let tip = '是否批量上架'

        //     if (this.selectList <= 0) {
        //         this.$message.error('请选择订单')
        //         return false
        //     }
        //     this.$confirm(tip, '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'info'
        //     }).then(async () => {
        //         let params = new Object()
        //         this.selectList.forEach(item => {
        //             item.auditStatus = 0
        //         })
        //         params.auditOrderReqList = this.selectList
        //         let res = await this.$post(this.$api.order.orderSelectAll, params)
        //         if (res && res.code === 200) {
        //             this.$message({
        //                 type: 'success',
        //                 message: '批量上架成功'
        //             })
        //             this.getOrderList()
        //             this.$refs.orderTable.handleCancelSelect()
        //         } else {
        //             this.$message({
        //                 type: 'error',
        //                 message: res.msg
        //             })
        //         }
        //     })
        // },
        // 获取店铺产品列表数据
        async getProductDatas() {
            let params = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size,
                keyword: this.keyWord,
                productType: this.productType == null ? null : this.productType,
                categoryId: this.categoryId,
                scope: this.activeProtype == -1 ? null : this.activeProtype
            }
            let {code, data} = await this.$get(
                this.$api.product.productList,
                params
            )
            console.log(data)
            if (code === 200) {
                this.pageObj.total = data.total
                this.tableData = data.records
            }
        },

        // 记录选中项
        handleSelectChange(val) {
            this.selectList = val
        },
        // 上架
        async pushShelves(row) {
            this.$confirm('是否上架商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let pa = ''
                    let arr = []
                    if (row === 1) {
                        this.selectList.map((item, index) => {
                            arr.push(item.id)
                        })
                        pa = arr.join(',')
                        console.log(pa)
                    } else {
                        pa = row.id
                    }
                    let params = {
                        id: pa
                    }
                    let {code, data, msg} = await this.$post(
                        this.$api.product.pushShelves,
                        params
                    )

                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '上架成功!'
                        })
                        this.getProductDatas()
                    } else {
                        this.$message({
                            type: 'info',
                            message: msg
                        })
                    }
                })
                .catch(() => {})
        },
        // 下架
        async downShelves(row) {
            this.$confirm('是否下架商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let pa = ''
                    let arr = []
                    if (row === 1) {
                        this.selectList.map((item, index) => {
                            arr.push(item.id)
                        })
                        pa = arr.join(',')
                        console.log(pa)
                    } else {
                        pa = row.id
                    }
                    let params = {
                        id: pa
                    }
                    let {code, data, msg} = await this.$post(
                        this.$api.product.down_product,
                        params
                    )

                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        })
                        this.getProductDatas()
                    } else {
                        this.$message({
                            type: 'info',
                            message: msg
                        })
                    }
                })
                .catch(() => {})
        },

        // 删除
        async remove() {
            this.$confirm('是否批量删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let pa = ''
                    let arr = []
                    this.selectList.map((item, index) => {
                        arr.push(item.id)
                    })
                    pa = arr.join(',')
                    let params = {
                        id: pa
                    }
                    let {code, data, msg} = await this.$post(
                        this.$api.product.productRemove,
                        params
                    )

                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getProductDatas()
                    } else {
                        this.$message({
                            type: 'info',
                            message: msg
                        })
                    }
                })
                .catch(() => {})
        },

        // 分类
        async category() {
            if (this.selectList.length === 0) {
                this.$message({
                    type: 'info',
                    message: '请勾选'
                })
                return false
            }
            this.dialogVisible = true
            // this.$confirm('是否批量分类', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(async () => {
            //     let pa = ''
            //     let arr = []
            //     this.selectList.map((item, index) => {
            //         arr.push(item.id)
            //     })
            //     let params = {
            //         ids: arr
            //     }
            //     let {code,data,msg} = await this.$post(this.$api.product.category,params)

            //     if (code === 200){
            //         this.$message({
            //             type: 'success',
            //             message: '分类成功!'
            //         });
            //         this.getProductDatas()
            //     }else {
            //         this.$message({
            //             type: 'info',
            //             message: msg
            //         });
            //     }
            // }).catch(() => {
            // });
        },

        handleCloseType(done) {
            this.dialogVisible = false
        },
        async accountAdd() {
            let arr = []
            this.selectList.map((item, index) => {
                arr.push(item.id)
            })
            let params = {
                ids: arr,
                categoryId: this.account.category
            }

            let {code, data, msg} = await this.$post(
                this.$api.product.category,
                params
            )

            if (code === 200) {
                this.$message({
                    type: 'success',
                    message: '分类成功!'
                })
                this.dialogVisible = false
                this.getProductDatas()
            } else {
                this.$message({
                    type: 'info',
                    message: msg
                })
            }
        },

        handleAvatarSuccess(res) {
            this.basicInfo.storeCertificate = res.data.link // URL.createObjectURL(file.raw)
        },
        handleAvatarSuccessStore(res) {
            this.basicInfo.storePermit = res.data.link // URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isIMAGE =
                file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
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
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.factoryProductIds = []
            this.multipleSelection.map((item, index) => {
                this.factoryProductIds.push(item.id)
            })
            console.log('factoryProductIds', this.factoryProductIds)
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick((_) => {
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
        next() {
            // 基本信息
            if (this.active === 0) {
                if (this.basicInfo.storeName === '') {
                    this.$message('请填写商家名称')
                    return
                }
                if (this.basicInfo.masterName === '') {
                    this.$message('请填写店长姓名')
                    return
                }
                if (this.basicInfo.masterPhone === '') {
                    this.$message('请填写店长电话')
                    return
                }
                if (this.basicInfo.storeAddress === '') {
                    this.$message('请填写商家地址')
                    return
                }
                if (this.basicInfo.storeCertificateNum === '') {
                    this.$message('请填写营业执照号')
                    return
                }
                if (this.basicInfo.storeCertificate === '') {
                    this.$message('请上传营业执照副本')
                    return
                }
                if (this.basicInfo.storePermit === '') {
                    this.$message('请上传医疗器械资质')
                    return
                }
            }
            if (this.active === 1) {
                if (this.factoryProductIds.length === 0) {
                    this.$message('请选择品牌')
                    return
                }
            }

            if (this.active < 4) {
                this.active++
            }
            console.log('basicInfo', this.basicInfo)
        },
        pre() {
            if (this.active > 0) {
                this.active--
            }
        },
        up() {
            if (this.num !== this.productLeft.length) {
                this.num++
            }
        },
        down() {
            if (this.num != 0) {
                this.num--
            }
        },
        // 业务代码
        // productNameSearch () {
        //   this.getAllProductList()
        // },
        actvieProduct(item) {
            this.activeIcon = item.dictKey
            // this.productForm.sortNum = item.sort
            this.productForm.icon = item.dictKey
        },
        productDelete() {
            if (this.productForm.icon !== '') {
                this.productLeft.map((item, index) => {
                    if (this.productForm.icon == item.icon) {
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
            this.productLeft.push({...this.productForm})
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
            this.$get(this.$api.shopInit.getAllProductList, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.getAllProductListData = data.data
                    }
                }
            )
        },
        payClick() {
            this.basicParam.merchantStoreExtPaytype =
                (this.wechat ? '1' : '0') +
                ',' +
                (this.bank ? '1' : '0') +
                ',' +
                (this.month ? '1' : '0') +
                ',' +
                (this.wuliu ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        wuliuClick() {
            this.basicParam.merchantStoreExtSendtype =
                (this.wilo ? '1' : '0') +
                ',' +
                (this.kuaidi ? '1' : '0') +
                ',' +
                (this.shop ? '1' : '0') +
                ',' +
                (this.kehu ? '1' : '0')
            // console.log(this.basicParam.merchantStoreExtPaytype)
        },
        cangkuSetClick() {
            this.basicParam.merchantStoreExtSkuSetting = this.cangkuSet
                ? '1'
                : '0'
        },
        save() {
            let param = {}
            Object.assign(param, this.basicInfo, this.basicParam)
            param.storeLabels = this.dynamicTags.join(',')
            if (this.basicParam.storeNotice === '') {
                this.$message('请填写店铺公告')
                return
            }
            if (param.storeLabels === '') {
                this.$message('请填写店铺标签')
                return
            }
            if (this.basicParam.merchantStoreExtCodeRule === '') {
                this.$message('请填写编码规则')
                return
            }
            param.factoryProductIds = this.factoryProductIds
            param.merchantStoreProductCategoryList = this.productLeft
            this.$post(this.$api.shopInit.merchantStoreInit, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.proCode = data.data.proCode
                        this.active++
                        // this.productChoice = data.data
                        // this.productForm.icon = this.productChoice[0].dictKey
                    }
                }
            )
            console.log('param', param)
        }
    }
}
</script>

<style lang="scss" scoped>
.priceinfo {
    margin-top: 15px;
    background: $content--background-color;
    display: flex;
    .box {
        border-radius: $border-radius;
    }
    .tab-list {
        .rows {
        }
    }
    .com-body {
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
    .box {
        border-radius: $border-radius;
    }
    .tab-list {
        .rows {
        }
    }
    .com-body {
        padding: 10px;
        background: #fff;
        border: 1px solid #fff;
        border-radius: $border-radius;
    }
}

.line {
    height: 10px;
    background: $content--background-color;
}
.tips {
    background: #fcfade;
    border-radius: 6px;
    padding: 6px 10px;
    margin-top: 10px;
    b {
        margin: 0 6px;
    }
}
.form-wrap {
    border-radius: 6px;
}
.name {
    display: flex;
    align-items: center;
    margin: 15px 0;
    .input-name {
        width: 400px;
    }
    b {
        color: red;
        margin-right: 5px;
        font-size: 15px;
    }
    .right-col {
    }
    div {
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
    background: #ff4d04;
    opacity: 1;
    border-radius: 0.03rem;
    font-size: 0.21rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 27px;
    color: #ffffff;
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
    background: #f2f3f3;
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
.rollScreen_container {
    position: relative;
    overflow: hidden;
}
.rollScreen_list {
    transition: 0.5s linear;
}
.add-list-item {
    width: 1.58rem;
    height: 0.78rem;
    background: #ffffff;
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
    height: 0.2rem;
    font-size: 0.15rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    // line-height: 20px;
    color: #ff4d04;
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
    height: 0.3rem;
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
.delete,
.save {
    width: 1.15rem;
    height: 0.35rem;
    background: #f2f3f3;
    opacity: 1;
    border-radius: 0.03rem;
    display: flex;
    font-size: 0.15rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 20px;
    color: #ff4d04;
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
    height: 6.3rem;
    background: #ffffff;
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
    color: #909baa;
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
.paytype {
    padding-bottom: 20px;
}
</style>

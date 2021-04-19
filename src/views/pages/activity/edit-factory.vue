<template>
    <div>
        <div class="top-nav back">
            <div class="back-but" @click="back">返回</div>
            <div class="back-button">
                <el-button :disabled="btnLoading" v-loading="btnLoading" @click="submitForm" type="text" class="btn-item" icon="el-icon-check">保存活动</el-button>
            </div>
        </div>
        <div class="priceinfo">
            <div class="box mini-switch-nav mgr15" style="flex: 0.4;">
                <div class="com-body">
                    <div class="bottom">
                        <div class="body-head mgt5">
                            <div>
                                <icon-svg class="titile-icon" name="bianji"></icon-svg>
                                基本信息:
                            </div>
                        </div>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="活动代码" prop="code">
                            <el-input v-model="ruleForm.code" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="开始日期" prop="date1">
                            <el-date-picker :picker-options="pickerOptionsStart" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束日期" prop="date2">
                            <el-date-picker :picker-options="pickerOptionsEnd" type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="活动状态" prop="status">
                            <div class="tabs-card" style="flex: 0.5;padding: 0">
                                <el-tabs v-model="ruleForm.status" type="card" @tab-click="statusClick">
                                    <el-tab-pane label="启用" name="1"></el-tab-pane>
                                    <el-tab-pane label="未启用" name="0"></el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-form-item>
                        <el-form-item label="活动说明">
                            <quill-editor v-model="ruleForm.desc" :options="editorOption"></quill-editor>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="box com-body" style="flex: 1">
                <!--  增加产品 -->
                <div class="body-head mgt5">
                    <div>
                        <icon-svg class="titile-icon" name="bianji"></icon-svg>产品范围:
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-left">
                        参与赠品活动的产品清单：配置什么送什么
                    </div>
                    <div class="btnlist">
                        <button @click="addProduct"><span>增加产品</span></button>
                    </div>
                </div>
                <div class="body-content con-wrap">
                    <div class="tab-list con-client">
                        <div class="rows rname">
                            <span style="flex: 0.1">序号</span>
                            <span style="flex: 0.3">产品代码</span>
                            <span style="flex: 0.5">产品名称</span>
                            <span style="flex: 0.3">产品型号</span>
                            <span style="flex: 0.2">最小数量</span>
                            <span style="flex: 0.2">最小价格</span>
                            <span style="flex: 0.3">赠送类型</span>
                            <span style="flex: 0.4">操作</span>
                        </div>
                        <div :class="'rows '+'goods-name '+[selectProduct===item.productSn ? 'active' : '']" v-for="(item, index) in productListItem" :key="item.order" @click="productEditPrent(item)">
                            <span style="flex: 0.1">{{(productPage-1) * productSize + (index+1)}}</span>
                            <span style="flex: 0.3">{{item.productSn}}</span>
                            <span style="flex: 0.5" class="goods-sn">
                                <el-tooltip effect="light" :content="item.productName" placement="top-start">
                                    <i>{{item.productName}}</i>
                                </el-tooltip>
                            </span>
                            <span style="flex: 0.3">{{item.productModel}}</span>
                            <span style="flex: 0.2">
                                <i v-if="item.productSn !== editMinNum" @click="editMin(item)">{{item.minQuantity}} <icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-input ref="minNum" @keyup.enter.native="$event.target.blur" @blur="productBlur(item)" v-model="editMinNumItem"></el-input>
                                </i>
                            </span>
                            <span style="flex: 0.2">
                                <i v-if="item.productSn !== editMinPrice" @click="editMinPri(item)">{{item.minPrice}} <icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-input ref="minPrice" @keyup.enter.native="$event.target.blur" @blur="productBlurPrice(item)" v-model="editMinPriceItem"></el-input>
                                </i>
                            </span>
                            <span style="flex: 0.3">
                                <el-select v-model="item.giftSendType" @change="selectChange" placeholder="请选择">
                                    <el-option
                                        v-for="item in giftSelect"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </span>

                            <span style="flex: 0.4"><a @click="deleteProductRow(item)">删除</a></span>
                        </div>
                    </div>
                    <div class="con-pagination" v-if="productList.length>0">
                        <el-pagination
                            background
                            @current-change="productCurrentChange"
                            layout="prev, pager, next"
                            :total=productList.length
                        >
                        </el-pagination>
                    </div>
                </div>

                <!--  增加赠品 -->
                <div class="body-head mgt5">
                    <div>
                        <icon-svg class="titile-icon" name="bianji"></icon-svg>  赠品范围 :
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-left">
                        参与赠品活动的赠品清单
                    </div>
                    <div class="btnlist">
                        <button @click="addPresent"><span>增加赠品</span></button>
                    </div>
                </div>
                <div class="body-content con-wrap">
                    <div class="tab-list con-client">
                        <div class="rows rname">
                            <span style="flex: 0.1">序号</span>
                            <span style="flex: 0.3">赠品代码</span>
                            <span style="flex: 0.5">赠品名称</span>
                            <span style="flex: 0.3">投放数量</span>
                            <span style="flex: 0.2">是否倍送</span>
                            <span style="flex: 0.2">倍送基数</span>
                            <span style="flex: 0.2">赠送数量</span>
                            <!--                            <span style="flex: 0.2">已送数量</span>-->
                            <span style="flex: 0.2">操作</span>
                        </div>
                        <div class="rows goods-name" v-for="(item, index) in presentListItem" :key="item.id">
                            <span style="flex: 0.1">{{(presentPage-1) * presentSize + (index+1)}}</span>
                            <span style="flex: 0.3">{{item.giftProductSn}}</span>
                            <span style="flex: 0.5" class="goods-sn">
                                <el-tooltip effect="light" :content="item.productName" placement="top-start">
                                    <i>{{item.productName}}</i>
                                </el-tooltip>
                            </span>
                            <span style="flex: 0.3">
                                <i v-if="item.giftProductSn !== editSku" @click="editPrent(item)">{{item.giftSku}} <icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-input @keyup.enter.native="$event.target.blur" @blur="prensentBlur(item)" v-model="editSkuItem"></el-input>
                                </i>
                            </span>
                            <span style="flex: 0.2">
                                <i v-if="item.giftProductSn !== editType" @click="editPrentType(item)">{{item.giftType == 1 ? '是' : '否'}}<icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-select v-model="editTypeItem" placeholder="请选择" @change="prensentBlurType(item)" @visible-change="typeBlur">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </i>
                            </span>
                            <span style="flex: 0.2">
                                <i v-if="item.giftProductId !== editBase" @click="editDoubleBase(item)">{{item.doubleBase}} <icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-input on-keypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" @keyup.enter.native="$event.target.blur" @blur="prensentBlurDoubleBase(item)" v-model="editGiftDoubleBase"></el-input>
                                </i>
                            </span>
                            <span style="flex: 0.2">
                                <i v-if="item.giftProductSn !== editGiftNum" @click="editPrentNum(item)">{{item.giftNum}} <icon-svg name="clientBj" style="color: #FF4E07"></icon-svg></i>
                                <i v-else>
                                    <el-input @keyup.enter.native="$event.target.blur" @blur="prensentBlurNum(item)" v-model="editGiftNumItem"></el-input>
                                </i>
                            </span>
                            <!--                            <span style="flex: 0.2"></span>-->
                            <span style="flex: 0.2"><a @click="deletePresentRow(item)">删除</a></span>
                        </div>
                    </div>
                    <!--<div class="con-pagination" v-if="clientList.length>0">
                        <el-pagination
                            background
                            @current-change="clientCurrentChange"
                            layout="prev, pager, next"
                            :total="clientList.length"
                        >
                        </el-pagination>
                    </div>-->
                </div>
            </div>
        </div>
        <merchant-add-client @clientSelectionChange="clientSelectionChange" v-if="showAddClient" ref="showAddClient" />
        <merchant-add-product :merchant-name="merchantName" :product-type="productTypeNum" @clientSelectionChange="clientSelectionProduct" v-if="showAddProduct" ref="showAddProduct" />
    </div>
</template>

<script>
import Moment from 'moment'
import {throttle} from '@/utils/index'
import merchantAddClient from './dialogcomponents/merchant-add-client'
import merchantAddProduct from './dialogcomponents/factory-add'

export default {
    components: {
        merchantAddClient,
        merchantAddProduct
    },
    data() {
        return {
            btnLoading: false,
            mchId: '',
            height: '0.85',
            num: 0,
            isEdit: false,
            newAdd: true, // 判断是否是新增
            formdata: {

            },
            options: [
                {label: '是', value: 1},
                {label: '否', value: 0}
            ],
            dialogformdata: {
            },
            chargetype: '1',
            showVisible: false,
            title: '',
            activeName: '0',
            activeType: '1',
            proId: '',
            priceVal: '',
            totalPro: [
            ],
            clientList: [],
            clientListItem: [],
            teshuList: [
                {
                    code: '暂无',
                    cpanme: '暂无',
                    cpatotal: '暂无',
                    cptotal: '暂无'
                }
            ],
            // 基本信息:
            ruleForm: {
                name: '',
                code: '',
                date1: '',
                date2: '',
                status: '1',
                desc: '',
                clientScope: ''
            },
            editorOption: {
                placeholder: '请输入说明',
                modules: {
                    toolbar: [
                        // ['bold', 'italic', 'underline', 'strike'], // 加粗、倾斜、下划线、删除线
                        // [{header: 1}, {header: 2}], // 标题一、标题二
                        [{list: 'ordered'}, {list: 'bullet'}] // 列表
                        // [{color: []}, {background: []}] // 字体颜色、背景颜色
                    ]
                }
            },
            rules: {
                code: [{message: '请输入活动代码', trigger: 'blur'}],
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'},
                    {min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur'}],
                date1: [{required: true, message: '请选择开始日期', trigger: 'change'}],
                date2: [{required: true, message: '请选择结束日期', trigger: 'change'}],
                status: [{required: true, message: '请选择活动状态', trigger: 'blur'}],
                clientScope: [{required: true, message: '请输入活动状态', trigger: 'blur'}]

            },
            pickerOptionsStart: {
                disabledDate: time => {
                    if (this.ruleForm.date2) {
                        return time.getTime() > new Date(this.ruleForm.date2).getTime()
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    if (this.ruleForm.date1) {
                        return time.getTime() < new Date(this.ruleForm.date1).getTime()
                    }
                }
            },
            clientPage: 1,
            clientSize: 10,
            editMinNum: '', // 点击修改产品最小数量 判断
            editMinNumItem: '', // 保存的值
            showAddClient: false,
            // 2. 产品范围
            showAddProduct: false,
            productPage: 1,
            productSize: 10,
            productList: [],
            productListItem: [],
            editMinPrice: '', // 点击修改产品最小数量 判断
            editMinPriceItem: '', // 保存的值
            selectProduct: '',
            productType: '', // 判断是赠品还是商品
            merchantName: '', // 判断是商家还是厂家
            productTypeNum: 0,
            // 3. 赠品范围
            presentPage: 1,
            presentSize: 100,
            presentList: [],
            presentListItem: [],
            editSku: '',
            editSkuItem: '',
            editType: '', // 是否倍送0普通，1倍送
            editTypeItem: '',
            editGiftNum: '',
            editGiftNumItem: '',
            editGiftDoubleBase: '', // 倍送基数
            editBase: '',
            giftSelect: [
                {
                    value: '0',
                    label: '全部送'
                },                {
                    value: '1',
                    label: '单一送'
                }     ]
        }
    },
    computed: {

    },
    created() {
        this.mchId = localStorage.getItem('mch_id')
        if (this.$route.query.type !== 'newAdd') {
            this.getDetails(this.$route.query.id)
        }
        this.getProList(0)
    },
    methods: {
        getLength(list) {
            return list.length
        },
        // 获取详情
        async getDetails(id) {
            let params = {
                id
            }
            let {code, data, msg} = await this.$get(this.$api.activity.detail, params)
            if (code === 200) {
                data.listProductRange.forEach(item=>{
                    if (item.giftSendType == 0) {
                        item.giftSendType = '全部送'
                    } else {
                        item.giftSendType = '单一送'
                    }
                })
                this.ruleForm.code = data.sn ? data.sn : ''
                this.ruleForm.name = data.name ? data.name : ''
                this.ruleForm.date1 = data.startDate ? data.startDate : ''
                this.ruleForm.date2 = data.endDate ? data.endDate : ''
                this.ruleForm.status = data.status !== undefined ? data.status.toString() : ''
                this.ruleForm.userRangeType = data.userRangeType ? data.userRangeType : ''
                this.ruleForm.desc = data.description ? data.description : ''
                this.clientList = data.listUserRange ? data.listUserRange : []
                this.productList = data.listProductRange ? data.listProductRange : []
                this.presentList = data.listGift ? data.listGift : []
                this.clientListItem = this.getFrontTen(this.clientPage, this.clientSize, this.clientList)
                this.productListItem = this.getFrontTen(this.productPage, this.productSize, this.productList)
                // this.presentListItem = this.getFrontTen(this.presentPage, this.presentSize, this.presentList)
            } else {
                this.$message.error(msg)
            }
        },
        subThrottle: throttle(function() {
            this.submitForm()
        }, 1000),
        // 提交表单
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let isClick = true
                    if (isClick) {
                        isClick = false
                        this.submitFormAll()
                        setTimeout(()=> {
                            isClick = true
                        }, 1000)
                    } else {
                        this.$message.warning('请勿重复提交')
                    }

                } else {
                    return false
                }
            })
        },
        // 提交表单接口
        async submitFormAll() {
            this.btnLoading = true
            let newProductList = JSON.parse(JSON.stringify(this.productList))
            newProductList.forEach(item=>{
                if (item.giftSendType == '全部送') {
                    item.giftSendType = 0
                } else if (item.giftSendType == '单一送') {
                    item.giftSendType = 1
                }
            })
            debugger
            let params = {
                id: this.$route.query.id,
                type: '0', // 买送
                sn: this.ruleForm.code,
                source: 0, // 活动厂商, 0厂商 1商户
                mchId: this.mchId, // 商户ID
                name: this.ruleForm.name, // 活动名称
                status: this.ruleForm.status,
                description: this.ruleForm.desc, // 活动描述
                startDate: Moment(this.ruleForm.date1).format('YYYY-MM-DD') + ' 00:00:00', // 开始日期
                endDate: Moment(this.ruleForm.date2).format('YYYY-MM-DD') + ' 23:59:59', // 结束日期
                userRangeType: 0,  // 用户范围类型，0所有，1包含，2排除
                productRangeType: '1', // 产品范围类型，0所有，1包含，2排除
                // activityUserRangeList: this.clientList, // 用户范围
                activityProductRangeList: newProductList, // 产品范围
                activityGiftList: this.presentList // 产品范围


            }
            let {code, msg} = await this.$post(this.$api.activity.activitySubmit, params)
            if (code === 200) {
                this.$message.success('保存活动成功 !')
                // this.$router.push({name: 'activity-activity-index'})
                this.btnLoading = false
            } else {
                this.$message.error(msg)
                this.btnLoading = false
            }
        },
        // 获取数组前几个
        getFrontTen(page, size, list) {
            return  list.slice((page - 1) * size, page * size)
        },
        back() {
            this.$router.push({name: 'activity-activity-index'})
        },
        statusClick(e) {
            this.ruleForm.status = e.name
        },
        clientClick(e) {
            this.ruleForm.clientScope = e.name
        },
        changeId(list, name) {
            list.map(item=> {
                item[name] = item.id
                // delete item.id
                delete item.detailHtml
            })
            return list
        },
        // 编辑最小数量 产品
        editMin(row) {
            this.editMinNum = row.productSn
            this.editMinNumItem = row.minQuantity
        },
        // 产品最小数量失去焦点
        productBlur(row) {
            this.editMinNum = ''
            // 改变产品数据
            this.productList.map(item=> {
                if (row.productSn === item.productSn) {
                    item.minQuantity = this.editMinNumItem
                }
            })
        },
        // 编辑最小价格 产品
        editMinPri(row) {
            this.editMinPrice = row.productSn
            this.editMinPriceItem = row.minPrice
        },
        // 产品最小价格失去焦点
        productBlurPrice(row) {
            this.editMinPrice = ''
            // 改变产品数据
            this.productList.map(item=> {
                if (row.productSn === item.productSn) {
                    item.minPrice = this.editMinPriceItem
                }
            })
        },
        // 编辑赠品
        productEditPrent(row) {
            this.selectProduct = row.productSn
            // 获取指定产品的赠品
            let list = this.presentList.filter(item=> item.productSn === row.productSn)
            this.presentListItem = this.getFrontTen(this.presentPage, this.presentSize, list)
        },
        // 赠品修改编辑
        addPresent() {
            if (!this.selectProduct) {
                this.$message.warning('请选择相应的产品再选赠品！')
                return
            }
            this.showAddProduct = true
            this.productType = 'present'
            this.productTypeNum = 1
            this.$nextTick(()=> {
                this.$refs.showAddProduct.init()
            })
        },
        editPrent(row) {
            this.editSku = row.giftProductSn
            this.editSkuItem = row.giftSku
        },
        // 修改投放数量
        prensentBlur(row) {
            this.editSku = ''
            // 改变产品数据
            this.presentList.map(item=> {
                if (row.giftProductSn === item.giftProductSn && row.productSn === item.productSn) {
                    item.giftSku = this.editSkuItem
                }
            })
        },
        // 编辑是否倍送
        editPrentType(row) {
            this.editType = row.giftProductSn
            this.editTypeItem = row.giftType === -1 ? 0 : row.giftType
        },
        // 编辑是否倍送
        prensentBlurType(row) {
            this.editType = ''
            // 改变赠品数据
            this.presentList.map(item=> {
                if (row.giftProductSn === item.giftProductSn && row.productSn === item.productSn) {
                    item.giftType = this.editTypeItem
                }
            })
        },
        // 是否倍送
        typeBlur(bool) {
            if (!bool) {
                this.editType = ''
            }
        },
        // 编辑赠送数量
        editPrentNum(row) {
            this.editGiftNum = row.giftProductSn
            this.editGiftNumItem = row.giftNum
        },
        // 编辑赠送数量
        prensentBlurNum(row) {
            this.editGiftNum = ''
            // 改变赠品数据
            this.presentList.map(item=> {
                if (row.giftProductSn === item.giftProductSn && row.productSn === item.productSn) {
                    item.giftNum = this.editGiftNumItem
                }
            })
        },
        // 删除产品
        delArrValProduct(arr, val, name) {    // 查找数组中的某个值并全部删除 第一个参数是查找的数组 第二个参数是删除的值
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].productSn === val.productSn) {
                    if (name === 'present') {
                        if (arr[i].productSn === this.selectProduct) {
                            arr.splice(i, 1)
                            i--
                        }
                    } else {
                        arr.splice(i, 1)
                        i--
                    }
                }
            }
            return arr
        },
        delArrValCustomer(arr, val) {    // 查找数组中的某个值并全部删除 第一个参数是查找的数组 第二个参数是删除的值
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].userId === val.userId) {
                    arr.splice(i, 1)
                    i--
                }
            }
            return arr
        },
        delArrVal(arr, val, name) {    // 查找数组中的某个值并全部删除 第一个参数是查找的数组 第二个参数是删除的值
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].giftProductSn === val.giftProductSn) {
                    if (name === 'present') {
                        if (arr[i].productSn === this.selectProduct) {
                            arr.splice(i, 1)
                            i--
                        }
                    } else {
                        arr.splice(i, 1)
                        i--
                    }
                }
            }
            return arr
        },
        async handleTypeClick() {
            this.getProList(this.activeType)
        },
        async getProList(type) {
            let par = {
                isFixed: type,
                keywords: ''
            }
            let data = await this.$get(this.$api.price.findProduct, par)
            if (data && data.code === 200) {
                this.totalPro = data.data
            } else {
                this.$message.error(data.msg)
            }
        },
        async  addRows() {
            this.title = '添加默认策略'
            this.isEdit = false
            this.showVisible = true
        },
        async editDefault(temp) {
            this.title = '编辑默认策略'
            this.isEdit = true
            this.showVisible = true
            this.dialogformdata = temp
        },
        async cancelDialog() {
            this.showVisible = false
        },
        // 2. 客户范围选择
        // 改变客户范围页码
        clientCurrentChange(page) {
            this.clientPage = page
            this.clientListItem = this.getFrontTen(page, 10, this.clientList)
        },
        // 增加客户
        addClient() {
            this.showAddClient = true
            this.$nextTick(()=> {
                this.$refs.showAddClient.init()
            })
        },
        // 客户删除
        deleteDefaultRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delArrValCustomer(this.clientList, row)
                if ((this.clientPage - 1) * this.clientSize === this.clientList.length) {
                    this.clientPage = this.clientPage - 1
                    if (this.clientPage === 0) {
                        this.clientPage = 1
                    }
                }
                this.clientListItem = this.getFrontTen(this.clientPage, this.clientSize, this.clientList)
            }).catch(() => {/*  */})

        },
        // 获取选择的客户
        clientSelectionChange(val) {
            // 1.需要叠加数组 2.去重
            val.map(item=> {
                /* if (JSON.stringify(this.clientList).indexOf(JSON.stringify(item)) === -1) {
                        this.clientList.push(item) // 进行动态的操作
                    } else {
                        this.$message.warning('请勿选择重复的客户!')
                    } */
                item.userId = item.id
                item.userName = item.customerName
                item.userType = item.customerType

                // delete item.id
                delete item.detailHtml
                this.clientList.push(item)
                let hash = {}
                const dataList = this.clientList.reduce((preVal, curVal) => {
                    hash[curVal.userId] ? '' : hash[curVal.userId] = true && preVal.push(curVal)
                    return preVal
                }, [])
                this.clientList = dataList
            })

            // this.clientList = val
            this.clientListItem = this.getFrontTen(this.clientPage, this.clientSize, this.clientList)
        },
        // 2. 客户范围选择
        // 增加产品按钮
        addProduct() {
            this.showAddProduct = true
            this.productTypeNum = 0 // 商品
            this.productType = 'product'
            this.merchantName = 'factory'
            this.$nextTick(()=> {
                this.$refs.showAddProduct.init('product')
            })
        },
        productCurrentChange(page) {
            this.productPage = page
            this.productListItem = this.getFrontTen(page, 10, this.productList)
        },
        // 获取选择的产品
        clientSelectionProduct(valList) {
            if (this.productType === 'product') {
                valList.map(item=> {
                    /* if (JSON.stringify(this.productList).indexOf(JSON.stringify(item)) === -1) {
                            item.productId = item.id
                            this.productList.push(item) // 进行动态的操作
                        } else {
                            this.$message.warning('请勿选择重复的产品!')
                        } */
                    // item.productSn = item.productSn
                    item.productId = item.productSn
                    // delete item.id
                    delete item.detailHtml

                    this.productList.push(item) // 进行动态的操作
                    let hash = {}
                    const dataList = this.productList.reduce((preVal, curVal) => {
                        hash[curVal.productSn] ? '' : hash[curVal.productSn] = true && preVal.push(curVal)
                        return preVal
                    }, [])
                    this.productList = dataList
                })
                this.productListItem = this.getFrontTen(this.productPage, this.productSize, this.productList)
            } else if (this.productType === 'present') {
                // 先给赠品加个产品id
                valList.map(item=> {
                    item.giftProductSn = item.productSn
                    item.productSn = this.selectProduct
                    // delete item.id
                    delete item.detailHtml
                    this.presentListItem.push(item)
                    let hash = {}
                    const dataList = this.presentListItem.reduce((preVal, curVal) => {
                        hash[curVal.giftProductSn] ? '' : hash[curVal.giftProductSn] = true && preVal.push(curVal)
                        return preVal
                    }, [])
                    let list1 = [...dataList, ...this.presentList]
                    this.presentList = this.unique(list1)
                })
                // 需要先获取指定产品id的赠品列表
                let list = this.presentList.filter(item=> item.productSn === this.selectProduct)

                this.presentListItem = this.getFrontTen(this.presentPage, this.presentSize, list)
            }

        },
        // 数组去重
        unique(arr) {
            // eslint-disable-next-line no-shadow
            return arr.filter((item, index, arr) => {
                // 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                return arr.indexOf(item, 0) === index
            })
        },
        // 删除
        deleteProductRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delArrValProduct(this.productList, row)
                if ((this.productPage - 1) * this.productSize === this.productList.length) {
                    this.productPage = this.productPage - 1
                    if (this.productPage === 0) {
                        this.productPage = 1
                    }
                }
                this.productListItem = this.getFrontTen(this.productPage, this.productSize, this.productList)
                // 删除产品后也需要清空赠品列表显示
                this.presentListItem = []
                let list = this.presentList
                list.map(()=> {
                    this.delArrValProduct(this.presentList, row, 'present')
                })
            }).catch(() => {/*  */})

        },
        // 删除赠品
        deletePresentRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delArrVal(this.presentList, row, 'present')
                if ((this.presentPage - 1) * this.presentSize === this.presentList.length) {
                    this.presentPage = this.presentPage - 1
                    if (this.presentPage === 0) {
                        this.presentPage = 1
                    }
                }
                let list = this.presentList.filter(item=> item.productSn === this.selectProduct)
                this.presentListItem = this.getFrontTen(this.presentPage, this.presentSize, list)
            }).catch(() => {/*  */})

        },
        verdictHas(list, row) {
            list.map(item=> {
                if (item.giftProductSn !== row.id) {
                    return true
                }
            })
        },
        // 修改倍增基数
        editDoubleBase(row) {
            this.editBase = row.giftProductId
        },
        prensentBlurDoubleBase(row) {
            this.editBase = ''
            // 改变赠品数据
            this.presentList.map(item=> {
                if (row.giftProductId === item.giftProductId && row.productId === item.productId) {
                    item.doubleBase = this.editGiftDoubleBase
                }
            })
        },
        selectChange() {
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
    .back {
        display: flex;
        background:  $white;
        height: 52px;
        justify-content: space-between;
        padding-right: 20px;
    }
    .back-but {
        width: 140px;
        background: #FF4D04;
        opacity: 1;
        border-radius: 10px 0px 0px 10px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        /*line-height: 29px;*/
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .back-button {
        height: 52px;
        line-height: 52px;
        .btn-item {
            padding: 10px 10px;
            background-color: #f5f5f5;
            color: #FF4E07;
            font-size: 17px;
        }
    }
    .priceinfo{
        margin-top: 15px;
        background: $content--background-color;
        display: flex;
        .demo-ruleForm {
            margin-top: 20px;
        }
        .box{
            border-radius: $border-radius;
            .top{
                padding: 2px;
                background: #fff;
                border: 1px solid #fff;
                border-radius: $border-radius;
            }
            .bottom{
                padding: 6px;
                background: #fff;
                border: 1px solid #fff;
                border-radius: $border-radius;
            }
        }
        .tab-list{
            .active span{
                background: #E3E0DF;
            }
            .rows{
                .goods-sn {
                    overflow: hidden;
                    text-overflow: ellipsis; //文本溢出显示省略号
                    white-space: nowrap;
                }

            }
        }
        .com-body{
            padding: 10px;
            background: #fff;
            border: 1px solid #fff;
            border-radius: $border-radius;
            .btn-wrap {
                display: flex;
                margin-bottom: 10px;
                .btn-left {
                    margin-top: 20px;
                    font-weight: bolder;
                }
                button {
                    cursor: pointer;
                }
            }
            .con-wrap {
                position: relative;
                /*min-height: 300px;*/
            }
            .con-pagination {
                /*right: 0px;*/
                height: 55px;
                /*position: absolute;*/
                /*bottom: 0;*/
                /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #FF4E07;   // 进行修改选中项背景和字体
                }

            }
            .con-client {
                bottom: 0;
                background: #F3F4F5;
                border: 1px solid #F3F4F5;
                /*height: 344px*/
            }
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
</style>

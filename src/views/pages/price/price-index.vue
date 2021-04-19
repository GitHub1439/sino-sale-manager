<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="价格策略" name="0"></el-tab-pane>
                    <!--<el-tab-pane label="历史价格" name="1"></el-tab-pane>-->
                </el-tabs>
            </div>
        </div>
        <div class="priceinfo">
            <div class="box mini-switch-nav mgr15" style="flex: 0.8;">
                <div class="top" style="display: flex;align-items: center">
                    <div class="tabs-card" style="width: 70%">
                        <el-tabs v-model="activeType" type="card" @tab-click="handleTypeClick">
                            <el-tab-pane label="所有" name="2"></el-tab-pane>
                            <el-tab-pane label="未定价" name="0"></el-tab-pane>
                            <el-tab-pane label="已定价" name="1"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <input class="inputval-noborder" v-model="keywords" @input="getProList(2)" style="height: 32px;line-height: 32px" placeholder="请输入商品名或编码搜索"></input>
                </div>

                <div class="line"></div>
                <div class="bottom">
                    <div class="tab-list">
                        <div class="rows rname">
                            <span style="flex: 0.15">序号</span>
                            <span style="flex: 0.5">产品名称</span>
                            <span style="flex: 0.2">产品编码</span>
                            <span style="flex: 0.4">产品规格/型号</span>
                            <span style="flex: 0.6">操作</span>
                        </div>
                        <div :style="{ 'min-height': documentClientHeight + 'px' }">
                            <div :class="'rows '+'goods-name '+[proId===item.productId ? 'active' : '']" v-for="(item,index) in totalPro" :key="item.code" @click="proRowClick(item)">
                                <span style="flex: 0.15">{{index+1}}</span>
                                <span :title="item.productName" style="flex: 0.5;overflow: hidden">{{item.productName}}</span>
                                <span :title="item.productName" style="flex: 0.2">{{item.productSn}}</span>
                                <span :title="item.productModel" style="flex: 0.4;overflow: hidden">{{item.productModel}}</span>
                                <span style="flex: 0.6"><div class="evtbtn"><a style="margin-right: 5px;" title="给产品添加默认价格策略" @click="addRows(item,0)">+ 阶梯价</a><a title="给产品添加特殊价格策略" @click="addRows(item,1)">+ 特价</a></div></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box com-body" style="flex: 1">
                <div class="body-head mgt5">
                    <div>
                        <icon-svg class="titile-icon" name="bianji"></icon-svg>  阶梯价格策略
                        <a title="没有设定阶梯价格策略时按商品标准价"><icon-svg name="yiwenkongxin" style="color: #333;font-size: 14px" title="11"></icon-svg></a>
                    </div>
                    <!--<button class="button-red mgr10" @click="addRows(0)"><icon-svg name="tianjia"></icon-svg><span >添加策略</span></button>-->
                </div>
                <div class="body-content">
                    <div class="tab-list">
                        <div class="rows rname">
                            <span style="flex: 0.3">大于</span>
                            <span style="flex: 0.4">小于等于</span>
                            <span style="flex: 0.3">类型</span>
                            <span style="flex: 0.3">策略值</span>
                            <span>策略描述</span>
                            <span style="flex: 0.4">操作</span>
                        </div>
                        <div class="rows goods-name" v-for="item in youhuiList" :key="item.code">
                            <span style="flex: 0.3">{{item.minQuantity}}</span>
                            <span style="flex: 0.4">{{item.maxQuantity}}</span>
                            <span style="flex: 0.3">{{item.priceType=='0'?'定价':'折扣'}}</span>
                            <span style="flex: 0.3">{{item.priceType=='0'?item.price:item.discount}}</span>
                            <span :title="item.description">{{item.description}}</span>
                            <span style="flex: 0.4"><a @click="editDefault(item,0)">编辑</a> <a class="mgl5" @click="deleteDefaultRow(item)">删除</a></span>
                        </div>
                    </div>
                </div>
                <div class="body-head mgt15">
                    <div>
                        <icon-svg class="titile-icon" name="bianji"></icon-svg>
                        特价策略
                        <a title="特殊价格高于默认价格和标准价"><icon-svg name="yiwenkongxin" style="color: #333;font-size: 14px" title="11"></icon-svg></a>
                    </div>

                    <!--<button class="button-red mgr10" @click="addRows(1)"><icon-svg name="tianjia"></icon-svg><span>添加策略</span></button>-->
                </div>
                <div class="body-content">
                    <div class="tab-list" style="background: #F3F4F5;border: 1px solid #F3F4F5;">
                        <div class="rows rname">
                            <span>客户名称</span>
                            <span style="flex: 0.2">客户标签</span>
                            <span style="flex: 0.2">客户类型</span>
                            <span style="flex: 0.3">价格</span>
                            <span style="flex: 0.3">操作</span>
                        </div>
                        <div class="rows goods-name" v-for="item in teshuList" :key="item.code">
                            <span>{{item.customerName}}</span>
                            <span style="flex: 0.2">{{item.labelName}}</span>
                            <span style="flex: 0.2">{{item.customerTypeName}}</span>
                            <span style="flex: 0.3">{{item.price}}</span>
                            <span style="flex: 0.3"><a class="mgl5" @click="deleteTeshuRow(item)">删除</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :visible.sync="showVisible"
            width="50%"
            :title="title"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            class="reply-dia"
            top="12%"
            :show-close="true"
        >
            <div class="container">
                <label v-model="dialogformdata.productId"></label>
                <div v-if="addtype==1">
                    <label v-model="custData.id"></label>
                    <div class="name">
                        <span>标签：</span>
                        <el-button v-if="clientTags.length == 0" type="danger" :disabled="lableDisabled" @click="showclient(true)">客户标签</el-button>
                        <div class="cust_name_tags" v-else>
                            <el-tag
                                v-for="tag in clientTags"
                                :key="tag.labelName"
                                closable
                                :type="tag.type"
                                @close="handleCloseClient(tag)"
                            >
                                {{tag.name}}
                            </el-tag>
                        </div>
                        <!-- <el-input class="input-name" v-model="inputCustomerName" @blur="searchCust" @input="searchCust" placeholder="请输入客户代码或名称搜索"></el-input> -->
                    </div>
                    <div class="name">
                        <span>客户名称：</span>
                        <el-button v-if="custNameTags.length == 0" type="danger" :disabled="custNameDisabled" @click="showCustList(true)">选择客户</el-button>
                        <div class="cust_name_tags" v-else>
                            <el-tag
                                v-for="tag in custNameTags"
                                :key="tag.name"
                                closable
                                :type="tag.type"
                                @close="handleCloseCustName(tag)"
                            >
                                {{tag.name}}
                            </el-tag>
                        </div>
                        <!-- <el-input class="input-name" v-model="inputCustomerName" @blur="searchCust" @input="searchCust" placeholder="请输入客户代码或名称搜索"></el-input> -->
                    </div>
                    <!-- <div>
                        <div class="name"><span>客户名称：</span><el-input class="input-name" v-model="custData.customerName" disabled></el-input></div>
                        <div class="name">
                            <div style="display: flex;align-items: center;width: 50%">
                                <span>客户代码：</span>
                                <el-input class="input-name" v-model="custData.customerCode" disabled></el-input>
                            </div>
                            <div class="right-col" style="display: flex;align-items: center;width: 50%">
                                <span>客户类型：</span>
                                <el-input class="input-name" v-model="custData.customerType" disabled></el-input>
                            </div>
                        </div>
                        <div  class="name">
                            <div style="display: flex;align-items: center;width: 50%">
                                <span>联  系  人：</span>
                                <el-input class="input-name" v-model="custData.contactName" disabled></el-input>
                            </div>
                            <div class="right-col" style="display: flex;align-items: center;width: 50%">
                                <span>联系电话：</span>
                                <el-input class="input-name" v-model="custData.contactPhone" disabled></el-input>
                            </div>
                        </div>
                        <div class="name"><span>客户地址：</span><el-input class="input-name" v-model="address" disabled></el-input></div>
                    </div> -->
                    <div>
                    </div>
                </div>
                <div class="name" v-if="addtype==0">
                    <div>
                        <span>策略类型：</span>
                        <el-radio-group v-model="dialogformdata.priceType" size="medium">
                            <el-radio-button label="0">指定价格</el-radio-button>
                            <el-radio-button label="1">指定折扣</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div v-if="addtype==0">
                    <div class="name">
                        <span>最小购买量：</span>
                    </div>
                    <div>
                        <el-input-number style="width:260px;" class="input-name" :max="999999999" v-model="dialogformdata.minQuantity" placeholder="请输入"></el-input-number>
                    </div>
                    <div class="name">
                        <span>最大购买量：</span>
                    </div>
                    <div>
                        <el-input-number style="width:260px;" class="input-name" :max="999999999" show-word-limit v-model="dialogformdata.maxQuantity" placeholder="请输入"></el-input-number>
                    </div>
                </div>

                <div class="name">
                    <span>策略值：（价格值单位{{dialogformdata.priceType=='1'?"折":"元"}}）</span>
                </div>
                <div>
                    <el-input class="input-name" v-model="dialogformdata.price" type="number" placeholder="请输入" v-if="dialogformdata.priceType!=1"></el-input>
                    <el-input class="input-name" v-model="dialogformdata.discount" type="number" placeholder="请输入" v-if="dialogformdata.priceType==1"></el-input>
                </div>

                <div class="tips" v-if="addtype==0">
                    当<b>{{dialogformdata.minQuantity}}</b><数量<=<b>{{dialogformdata.maxQuantity}}</b>时,<b>{{dialogformdata.priceType=='0'?dialogformdata.price:dialogformdata.discount>0?dialogformdata.discount/10:0}}</b>{{dialogformdata.priceType=='1'?"折":"元"}}
                </div>
                <div class="btn">
                    <el-button type="info" @click="cancelDialog">取消</el-button>
                    <el-button v-if="isEdit" type="primary" @click="updatePrice">保存</el-button>
                    <el-button v-else type="primary" @click="addPrice">提交</el-button>
                </div>
            </div>
        </el-dialog>

        <price-add-client v-if="showPriceAddClient" :product-id="proId" @clientSelectionChange="clientSelectionChange" @showCustList="showCustList" ref="showAddClient" />
        <labelClient v-if="labelShowAddClient" @clientSelectionChange="labelClientChange" @showCustList="showclient" ref="labelShowClient"></labelClient>
        <!-- <showDialog :labelCustomerData="labelCustomerData"></showDialog> -->
    </div>
</template>

<script>
import priceAddClient from './price-dialog/price-add-client'
import labelClient from './price-dialog/labelClient'
// import showDialog from './price-dialog/showDialog.vue'

export default {
    components: {
        priceAddClient,
        labelClient,
        // showDialog
    },
    data() {
        return {
            showPriceAddClient: false,
            labelShowAddClient:false,
            lableDisabled:false,
            custNameDisabled:true,
            height: '0.84',
            num: 0,
            addtype: '',
            isEdit: false,
            custData: {},
            inputCustomerName: '',
            formdata: {

            },
            address: '',
            keywords: '',
            dialogformdata: {
                price: 0,
                discount: 0
            },
            isedit: false,
            chargetype: '1',
            showVisible: false,
            title: '',
            activeName: '0',
            activeType: '2',
            proId: '',
            priceVal: '',
            totalPro: [
            ],
            youhuiList: [
            ],
            teshuList: [
            ],
            labelList:[],
            custNameTags: [],
            clientTags:[],
            isType:"",
            labelCustomerData:[], //
            getKehuList:[]
        }
    },
    computed: {
        documentClientHeight: {
            get() {
                return this.$store.state.common.documentClientHeight - 320
            },
            set(val) {
                this.$store.commit('common/UPDATEDOCUMENTCLIENTHEIGHT', val)
            }
        }
    },
    created() {
        this.getProList(2)
    },
    methods: {
        async handleTypeClick() {
            this.getProList(this.activeType)
        },
        async proRowClick(temp) {
            this.proId = temp.productId
            this.getAutoPrice()
            this.getTeshuPrice()
        },
        async getAutoPrice() {
            let par = {
                productId: this.proId,
                type: 0
            }
            let data  = await this.$get(this.$api.price.findDefaultPriceTactic, par)
            if (data && data.code === 200) {
                this.youhuiList = data.data
            }
        },
        async getTeshuPrice() {
            let par = {
                productId: this.proId,
                type: 1
            }
            let data  = await this.$get(this.$api.price.findSpecialPriceTactic, par)
            if (data && data.code === 200) {
                this.teshuList = data.data.records
                let temp = data.data.records

            }
        },
        addPrice() {
            let that = this

            // 1添加特殊
            if (this.addtype == 1) {
                // if(this.custData.id==null){
                //     this.$message({
                //         message: '请先录入客户',
                //         type: 'error',
                //         duration: 1500,
                //         onClose: () => {/*  */}
                //     })
                //     return
                // }
                if (this.custNameTags.length == 0) {
                    this.$message({
                        message: '请先录入客户',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return false
                }
            } else {
                if (that.dialogformdata.priceType == null) {
                    this.$message({
                        message: '类型必须填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
                if (that.dialogformdata.minQuantity == null || that.dialogformdata.minQuantity == '') {
                    this.$message({
                        message: '最小购买需要填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
                if (that.dialogformdata.maxQuantity == null || that.dialogformdata.maxQuantity == '') {
                    this.$message({
                        message: '最大购买需要填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
            }
            that.dialogformdata.discount == null ? '' : that.dialogformdata.discount
            that.dialogformdata.price == null ? '' : that.dialogformdata.price

            if (that.dialogformdata.discount == null && that.dialogformdata.price == null) {
                this.$message({
                    message: '策略值需要填写',
                    type: 'error',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
                return
            }
            let pritemp = that.dialogformdata.discount == null ? '' : that.dialogformdata.discount
            let pritemp1 = that.dialogformdata.price == null ? '' : that.dialogformdata.price
            if (pritemp == '' && pritemp1 == '') {
                this.$message({
                    message: '策略值需要填写',
                    type: 'error',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
                return
            }
            let tmepdata = this.dialogformdata

            let tips = `购买数量${tmepdata.minQuantity}到${tmepdata.maxQuantity}时,单价=${tmepdata.priceType == '0' ? tmepdata.price + '元' : tmepdata.discount / 10 + '折'}`
            // "当"+this.dialogformdata.minQuantity+"数量"+this.dialogformdata.maxQuantity+"时"+this.dialogformdata.priceType=='0'?this.dialogformdata.price:this.dialogformdata.discount + this.dialogformdata.priceType=='1'?"折":"元"

            let addstype = this.addtype
            // debugger
            let par = {
                type: this.addtype,
                customerId: this.addtype == 1 ? this.custData.id : '',
                priceType: addstype == 1 ? 0 : this.dialogformdata.priceType,
                minQuantity: this.dialogformdata.minQuantity,
                maxQuantity: this.dialogformdata.maxQuantity == null ? '' : this.dialogformdata.maxQuantity,
                productId: this.proId,
                price: this.dialogformdata.price,
                discount: this.dialogformdata.discount,
                description: addstype == '0' ? tips : '购买单价:' + this.dialogformdata.price,
                specialPriceType: this.clientTags.length > 0 ? 2 : ""
            }
            if (this.custNameTags.length > 0 && this.addtype == 1) {
                let arr = []

                this.custNameTags.forEach(item=>{
                    arr.push({
                        productId: this.proId,
                        customerId: item.id,
                        price: this.dialogformdata.price,
                        priceType: 0,
                        type: 1
                    })
                })

                par = {
                    merchantStoreProductPriceList: arr
                }
            }
            that.$post(this.isType == "label" ? that.$api.customermanage.labelClash : that.$api.customermanage.customerClash,par).then(data => {
                if (data && data.code === 200) {
                    if(data.data.length == 0){
                        let saveUrl = ""
                        if(this.isType == "label"){
                            saveUrl = this.custNameTags.length > 0 && this.addtype == 1 ? that.$api.price.saveLabelList : that.$api.price.save
                        }else{
                            saveUrl = this.custNameTags.length > 0 && this.addtype == 1 ? that.$api.price.saveList : that.$api.price.save
                        }

                    that.$post(saveUrl, par).then(data => {
                        if (data && data.code === 200) {
                            // this.youhuiList=data.data
                            this.showVisible = false
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {/*  */}
                            })
                            this.custNameTags = []
                            this.clientTags = []
                            if (this.addtype == 0)
                                this.getAutoPrice()
                            if (this.addtype == 1)
                                this.getTeshuPrice()

                        } else {
                            this.$message.error(data.msg)
                        }
                    }).catch(() => {/*  */})
                    }else{
                        // this.labelCustomerData = data.data
                        // this.$message({
                        //     message: '当前选择客户和标签有冲突',
                        //     type: 'success',
                        //     duration: 1500,
                        //     onClose: () => {/*  */}
                        // })
                        this.$message.error('当前选择客户和标签有冲突')
                    }
                } else {
                    this.$message.error(data.msg)
                }
            }).catch(() => {/*  */})
            // debugger


        },
        updatePrice() {
            let that = this
            if (this.addtype == 1) {
                if (this.custData.id == null) {
                    this.$message({
                        message: '请先录入客户',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
            } else {
                if (that.dialogformdata.priceType == null) {
                    this.$message({
                        message: '类型必须填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
                if (that.dialogformdata.minQuantity == null || that.dialogformdata.minQuantity == '') {
                    this.$message({
                        message: '最小购买需要填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
                if (that.dialogformdata.maxQuantity == null || that.dialogformdata.maxQuantity == '') {
                    this.$message({
                        message: '最大购买需要填写',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    return
                }
            }

            if (that.dialogformdata.discount == null && that.dialogformdata.price == null) {
                this.$message({
                    message: '策略值需要填写',
                    type: 'error',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
                return
            }
            let pritemp = that.dialogformdata.discount == null ? '' : that.dialogformdata.discount
            let pritemp1 = that.dialogformdata.price == null ? '' : that.dialogformdata.price
            if (pritemp == '' && pritemp1 == '') {
                this.$message({
                    message: '策略值需要填写',
                    type: 'error',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
                return
            }
            let tips = `购买数量${this.dialogformdata.minQuantity}到${this.dialogformdata.maxQuantity}时,单价=${this.dialogformdata.priceType == '0' ? this.dialogformdata.price + '元' : this.dialogformdata.discount / 10 + '折'}`
            let temp = this.dialogformdata
            let addstype = this.addtype
            debugger
            let par = {
                type: 0,
                id: this.dialogformdata.id,
                priceType: addstype == 1 ? 0 : this.dialogformdata.priceType,
                minQuantity: this.dialogformdata.minQuantity,
                maxQuantity: this.dialogformdata.maxQuantity,
                productId: this.proId,
                price: this.dialogformdata.price,
                discount: this.dialogformdata.discount,
                description: addstype == '0' ? tips : '购买单价:' + this.dialogformdata.price
            }
            that.$post(that.$api.price.update, par).then(data => {
                if (data && data.code === 200) {
                    // this.youhuiList=data.data
                    this.showVisible = false
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                    this.getAutoPrice()

                } else {
                    this.$message.error(data.msg)
                }
            }).catch(() => {/*  */})
        },
        /* 查询客户 */
        async searchCust() {
            let temp = this.inputCustomerName
            let par = {
                customerName: temp
            }
            if (temp == null || temp == '') {
                this.custData = {}
                return
            }
            let data = await this.$get(this.$api.price.listcust, par)
            if (data && data.code === 200) {
                if (data.data.records.length > 0) {
                    this.custData = data.data.records[0]
                    this.address = data.data.records[0].address
                } else {
                    this.$message({
                        message: '客户不存在',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                }


            } else {
                this.$message.error(data.msg)
            }
        },
        async getProList(type) {
            let par = {
                isFixed: type,
                keywords: this.keywords
            }
            let data = await this.$get(this.$api.price.findProduct, par)
            if (data && data.code === 200) {
                this.totalPro = data.data
            } else {
                this.$message.error(data.msg)
            }
        },
        async  addRows(temp, adtype) {
            this.proRowClick(temp)

            if (this.proId === '') {
                this.$message({
                    message: '请先在左侧选择产品，再添加价格',
                    type: 'info',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
                return
            }
            this.title = adtype == 1 ? '添加默认价格' : '添加默认策略'
            this.isEdit = false
            this.showVisible = true
            this.addtype = adtype
            this.dialogformdata = {}
            this.custData = {}
            this.inputCustomerName = ''
        },
        async editDefault(temp, edittype) {
            this.title = '编辑默认策略'
            this.isEdit = true
            this.showVisible = true
            this.addtype = edittype
            this.dialogformdata = temp
        },
        async cancelDialog() {
            this.showVisible = false
            this.custNameTags = []
        },
        deleteDefaultRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let par = '?ids=' + row.id
                that.$post(that.$api.price.remove + par).then(data => {
                    if (data && data.code === 200) {
                        // this.youhuiList=data.data
                        // this.showVisible = false
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {/*  */}
                        })
                        this.getAutoPrice()

                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch(() => {/*  */})
            }).catch(() => {/*  */})

        },
        deleteTeshuRow(row) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let par = '?ids=' + row.id
                that.$post(that.$api.price.remove + par).then(data => {
                    if (data && data.code === 200) {
                        // this.youhuiList=data.data
                        // this.showVisible = false
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {/*  */}
                        })
                        this.getTeshuPrice()
                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch(() => {/*  */})
            }).catch(() => {/*  */})

        },
        showCustList(type) {
            this.showPriceAddClient = !this.showPriceAddClient
            if (type) {
                this.$nextTick(()=> {
                    this.$refs.showAddClient.init()
                })
            }
        },
        showclient(type){
            this.labelShowAddClient = !this.labelShowAddClient
            if (type) {
                this.$nextTick(()=> {
                    this.$refs.labelShowClient.init()
                })
            }
        },
        clientSelectionChange(list) {
            let scount = 0
            let teshuarry = this.teshuList
            for (let i = 0;i < list.length;i++) {
                let create = true
                for (let j = 0;j < teshuarry.length;j++) {
                    let tempa = list[i].customerName
                    let tempb = teshuarry[j].customerName
                    if (tempa == tempb) {
                        scount++
                        create = false

                    }
                }
                if (create) {
                    this.custNameTags.push({
                        name: list[i].customerName,
                        type: String(list[i].customerType),
                        id: list[i].id
                    })
                }


            }
            if(this.custNameTags.length > 0){
                this.lableDisabled = true
            }
            if (scount > 0) {
                this.$message({
                    message: scount + '个客户已录入过特价,被自动排除',
                    type: 'info',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
            }
            this.isType = "client"
        },
        labelClientChange(list){
            let scount = 0
            let teshuarry = this.labelList
            let labelIds = ""
            for (let i = 0;i < list.length;i++) {
                let create = true
                for (let j = 0;j < teshuarry.length;j++) {
                    let tempa = list[i].id
                    let tempb = teshuarry[j].id
                    if (tempa == tempb) {
                        scount++
                        create = false

                    }
                }
                if (create) {
                    this.clientTags.push({
                        name: list[i].labelName,
                        status: String(list[i].status),
                        id: list[i].id
                    })
                }
                labelIds += "labelId=" + list[i].id + "&"

            }
           labelIds =  labelIds.substring(0,labelIds.length-1)
            this.$get(this.$api.customermanage.labelCustomer+"?"+labelIds).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.getKehuList = data.data
                        let amoutTag = 0
                        let labelTags = []
                        for(let i = 0;i < data.data.length;i++){
                            let amout = 0
                            for(let j = 0;j < this.clientTags.length;j++){
                                if(this.clientTags[j].id == data.data[i].customerLabelId && amout == 0){
                                    labelTags.push(this.clientTags[j])
                                    amoutTag++
                                    amout++
                                }
                            }
                        }
                        // for(let i = 0;i < labelTags.length;i++){
                        //     for(let j = 0;j < labelTags.length;j++){
                        //         if(labelTags[i].id == labelTags[i].id && i != j){
                        //             labelTags.splice(j,1)
                        //             amoutTag--
                        //         }
                        //     }
                        // }
                        this.clientTags = labelTags
                        if (amoutTag > 0) {
                            this.$message({
                                message: amoutTag + '个客户已录入过特价,被自动排除',
                                type: 'info',
                                duration: 1500,
                                onClose: () => {/*  */}
                            })
                        }
                        let newArr = []
                        for(let i = 0;i < data.data.length;i++){
                            let obj = {name: data.data[i].customerName,type: String(data.data[i].customerType),id: data.data[i].id}
                            newArr.push(obj)
                        }
                        this.custNameTags = newArr
                    }
                }
            )
            if(this.clientTags.length > 0){

                this.custNameDisabled=true
            }
            if (scount > 0) {
                this.$message({
                    message: scount + '个客户已录入过特价,被自动排除',
                    type: 'info',
                    duration: 1500,
                    onClose: () => {/*  */}
                })
            }
            this.isType = "label"
        },
        labelCustList(e){
            console.log(e)
        },
        handleCloseCustName(tag) {
            this.custNameTags.splice(this.custNameTags.indexOf(tag), 1)
            let labelId = ""
            for(let i = 0;i < this.getKehuList.length;i++){
                if(tag.id == this.getKehuList[i].id){
                    labelId = this.getKehuList[i].customerLabelId
                }
            }
            let deleteItem = []
            let deleteAmount = 0
            for(let i = 0;i < this.clientTags.length;i++){
                if(labelId == this.clientTags[i].id){
                    deleteAmount++
                    deleteItem.push(i)
                }
            }
            if(deleteAmount == 1){
                for(let i = 0;i < deleteItem.length;i++){
                    this.clientTags.splice(deleteItem[i],1)
                }
            }

            // if(this.custNameTags.length > 0){
            //     this.lableDisabled = true
            // }else{
            //     this.lableDisabled = false
            // }
        },
        handleCloseClient(tag){
            this.clientTags.splice(this.clientTags.indexOf(tag), 1)
            let custId = ""
            for(let i = 0;i < this.getKehuList.length;i++){
                if(tag.id == this.getKehuList[i].customerLabelId){
                    custId = this.getKehuList[i].id
                }
            }
            console.log(this.getKehuList)
            console.log(this.clientTags)
            let deleteItem = []
            for(let i = 0;i < this.custNameTags.length;i++){
                if(custId == this.custNameTags[i].id){
                    deleteItem.push(i)
                }
            }
            for(let i = 0;i < deleteItem.length;i++){
                this.custNameTags.splice(deleteItem[i],1)
            }
            // if(this.clientTags.length > 0){

            //     this.custNameDisabled=true
            // }else{
            //     this.custNameDisabled=false
            // }
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
            .top{
                padding: 2px;
                background: #fff;
                border: 1px solid #fff;
                border-radius: $border-radius;
            }
            .bottom{
                padding: 6px;
                overflow: scroll;
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
    .cust_name_tags{
        width: 400px;
        overflow-x: scroll;
        display: flex;
    }
</style>

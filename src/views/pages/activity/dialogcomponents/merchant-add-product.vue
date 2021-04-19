<template>
    <el-dialog
        :visible.sync="showVisible"
        top="3%"
        width="80%"
        title="选择产品"
        class="reply-dia"
        :show-close="true"
    >
        <div class="form-wrap bgff">
            <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="col">
                            <span class="lab">产品关键字</span>
                            <el-input
                                @keyup.enter.native="search()"
                                placeholder="请输入关键字"
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
                            <el-select v-model="productTypes" clearable>
                                <el-option label="商品" :value="0"></el-option>
                                <el-option label="赠品" :value="1"></el-option>
                                <el-option label="商品&赠品" :value="2"></el-option>
                            </el-select>
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
            :table-height-default="400"
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
            <el-button @click="handlClose">取消</el-button>
            <el-button type="primary" @click="submitCheck()">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'MerchantAddClient',
    props: {
        productType: {
            type: Number,
            default: 0
        },
        merchantName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            url: '',
            loading: false,
            productName: '',
            showVisible: false,
            customerName: '',
            customerCode: '',
            keyWord: '',
            productTypes: '',
            columns: [
                {label: '产品名称', prop: 'productName', width: 230},
                {label: '产品编号', prop: 'productSn', width: 160},
                {label: '所属分类', prop: 'categoryName'},
                {label: '产品规格', prop: 'productSpec'},
                {label: '品牌名称', prop: 'factoryName', width: 160},
                {label: '库存', prop: 'productSku'}
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
            }

        }
    },
    created() {
        // this.listCust()
    },
    methods: {
        init() {
            this.showVisible = true
            this.pageObj.currentPage = 1
            this.listCust()
            /* if (this.merchantName === 'factory') {
                // 执行另外一个接口
                this.url = this.$api.activity.getAllProductList
                this.listCust()
            } else {
                this.url = this.$api.activity.merchantProductList
                this.listCust()
            } */
        },
        async getFactoryPro() {

        },
        handlClose() {
            this.showVisible = !this.showVisible
        },
        submitCheck() {
            this.showVisible = !this.showVisible
            this.clientList.forEach(item=>{
                item.giftSendType = '单一送'
            })
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
                keyWord: this.keyWord,
                productType: this.productTypes == '' ? '1' : this.productTypes
            }
            // if (this.productType === 1) {  // 赠品
            //     param.productType = this.productType
            // } else {
            //     param.productType = 2
            // }
            // if (this.merchantName === 'factory') {
            //     param.productName = this.productName
            //     param.productType = 0
            // }
            if (this.productTypes == 0) {
                param.productType = 0
            } else if (this.productTypes == 1) {
                param.productType = 1
            } else if (this.productTypes == 2) {
                param.productType = 2
            }
            this.$get(this.$api.activity.merchantProductList, param).then((data) => {
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
                min-width: 80px;
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

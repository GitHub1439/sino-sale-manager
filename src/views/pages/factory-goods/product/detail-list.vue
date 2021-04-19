<template>
    <div>
        <div class="box com-body" style="flex: 1">
            <div class="body-head mgt5">
                <div>
                    <icon-svg class="titile-icon" name="bianji"></icon-svg>  默认价格策
                    <a title="没有设定默认价格策略时按商品标准价"><icon-svg name="yiwenkongxin" style="color: #333;font-size: 14px" title="11"></icon-svg></a>
                </div>
                <button class="button-red mgr10"><icon-svg name="tianjia"></icon-svg><span @click="addRows(0)">添加策略</span></button>
            </div>
            <div class="body-content">
                <div class="tab-list">
                    <div class="rows rname">
                        <span style="flex: 0.3">大于</span>
                        <span style="flex: 0.4">小于等于</span>
                        <span style="flex: 0.3">类型</span>
                        <span style="flex: 0.3">策略值</span>
                        <span>策略描述</span>
                        <span style="flex: 0.6">操作</span>
                    </div>
                    <div class="rows goods-name" v-for="item in youhuiList" :key="item.code">
                        <span style="flex: 0.3">{{item.minQuantity}}</span>
                        <span style="flex: 0.4">{{item.maxQuantity}}</span>
                        <span style="flex: 0.3">{{item.priceType=='0'?'定价':'折扣'}}</span>
                        <span style="flex: 0.3">{{item.priceType=='0'?item.price:item.discount}}</span>
                        <span>{{item.description}}</span>
                        <span style="flex: 0.6"><a @click="editDefault(item)">编辑</a> <a class="mgl5" @click="deleteDefaultRow(item)">删除</a></span>
                    </div>
                </div>
            </div>
            <div class="body-head mgt15">
                <div>
                    <icon-svg class="titile-icon" name="bianji"></icon-svg>
                    特殊价格策略
                    <a title="特殊价格高于默认价格"><icon-svg name="yiwenkongxin" style="color: #333;font-size: 14px" title="11"></icon-svg></a>
                </div>

                <button class="button-red mgr10" v-if="true"><icon-svg name="tianjia"></icon-svg><span>添加策略</span></button>
            </div>
            <div class="body-content">
                <div class="tab-list" style="background: #F3F4F5;border: 1px solid #F3F4F5;">
                    <div class="rows rname">
                        <span style="flex: 0.4">客户名称</span>
                        <span>客户类型</span>
                        <span style="flex: 0.3">策略类型</span>
                        <span style="flex: 0.3">策略值</span>
                        <span style="flex: 0.3">操作</span>
                    </div>
                    <div class="rows goods-name" v-for="item in teshuList" :key="item.code">
                        <span style="flex: 0.4">{{item.code}}</span>
                        <span>{{item.cpanme}}</span>
                        <span style="flex: 0.3">定价</span>
                        <span style="flex: 0.3">120.00</span>
                        <span style="flex: 0.3"><a href="#">删除</a></span>
                    </div>
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

            loading: false,
            pageObj: {
                size: 0,
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



            factoryGiftData: [],

            dataForm: {
                dept: '',
                ward: '',
                searchKey: '',
                advice: '',
                bedType: '0',
                emptyBed: '1',
                orderDate: '',
                orderStatus: ''
            },
            dialogVisible: false,
            recipeDialogVisible: false,
            valueTime: '',
            orderId: '',
            activeName: '0',
            activeProtype: '0',
            orderStatus: null
        }
    },
    created() {
        //this.getAuditList()
    },
    methods: {
        search() {
            //this.getAuditList()
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
            //this.getAuditList()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            //this.getAuditList()
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
            this.pageObj.total = 0
            this.pageObj.currentPage = 1
            let t = this.activeName
            //this.getAuditList()
        },
        ProtypeClick() {

        },
        async  addRows(adtype) {
            console.log("走我了吗")
            this.title = '添加默认策略'
            this.isEdit=false
            this.showVisible = true
            this.addtype=adtype
            this.dialogformdata={}
            this.custData={}
            this.inputCustomerName=''
        },


    }
}
</script>

<style lang="scss" scoped>
    .tabs-main{
        background: $white;
        border-radius: 6px;
        margin-top: 10px;
    }
    .baseinfo{

    }
    .form-wrap{
        border-radius: 6px;
    }

    .me-table-title {
        //margin-bottom: 3px;

        span {
            background-color: #F3F4F5;
            padding: 13px 30px;
            font-size: 16px;
            border-radius: 5px 5px 0 0;
            font-weight: bolder;
        }
    }

    .el-row {
        .col {
            span {
                display: block;
                width: 70px;
                float: left;
                line-height: 30px;
            }
            .el-input, el-select {
                float: left;
                width: 190px;
            }
        }
    }

</style>

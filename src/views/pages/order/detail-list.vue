<template>
    <div>
        <div class="form-wrap bgff" style="padding: 0;">
            <div class="mini-switch-navorbtn me-table-title">
                <span>订单明细</span>
            </div>
            <sn-table
                :table-data="orderDetailData"
                :columns="orderDetailColumns"
                :loading="loading"
                :is-fit="false"
                :is-pagination-show="false"
            >
                <template slot="operate" slot-scope="scope">
                    <div>
                        <!--                        <el-button size="small" type="text" @click="preview(scope.scope)">确认</el-button>-->
                    </div>
                </template>
            </sn-table>
        </div>

        <div class="form-wrap bgff" style="padding: 15px 0 0 0;"  v-if="businessGiftData!=null&&businessGiftData.length>0">
            <div class="mini-switch-navorbtn me-table-title">
                <span>商家赠品</span>
                <!--<div class="btnlist" style='padding-right: 0'>-->
                <!--<button style='margin: 2px 0;'><icon-svg name="bianji"></icon-svg>&nbsp;增加赠品</button>-->
                <!--</div>-->
            </div>
            <sn-table
                :table-data="businessGiftData"
                :columns="businessGiftColumns"
                :loading="loading"
                :is-fit="false"
                :is-pagination-show="false"
            >
                <template slot="operate" slot-scope="scope">
                    <div>
                        <!--                        <el-button size="small" type="text" @click="preview(scope.scope)">确认</el-button>-->
                    </div>
                </template>
            </sn-table>
        </div>

        <div class="form-wrap bgff" style="padding: 15px 0 0 0;" v-if="factoryGiftData!=null&&factoryGiftData.length>0">
            <div class="mini-switch-navorbtn me-table-title">
                <span>厂家赠品</span>
            </div>
            <sn-table
                :table-data="factoryGiftData"
                :columns="factoryGiftColumns"
                :loading="loading"
                :is-fit="false"
                :is-pagination-show="false"
            >
                <template slot="drugName" slot-scope="scope">
                    <div v-for="item in scope.scope.orderItemList" :key="item.name">
                        <div>{{item.name + item.specs}}</div>
                    </div>
                </template>
                <template slot="amount" slot-scope="{scope}">
                    <div>
                        <div>{{'￥'+scope.amount}}</div>
                    </div>
                </template>
                <template slot="operate" slot-scope="scope">
                    <div>
                        <!--                        <el-button size="small" type="text" @click="preview(scope.scope)">确认</el-button>-->
                    </div>
                </template>
            </sn-table>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        order_data: Object
    },
    watch: {
        order_data(newval) {
            if (newval) {
                this.initData()
            }
        }
    },
    data() {
        return {
            orderDetailColumns: [
                // {label: '序号', prop: 'seq', slot: 'seq',  type: 'index', width: 50},
                {label: '产品名称 ', prop: 'productName',width: 180},
                {label: '产品编码', prop: 'productSn',width: 100},
                {label: '厂商编码', prop: 'factoryProductSn',width: 100},
                {label: '产品型号', prop: 'productModel'},
                {label: '产品价格', prop: 'standardPrice'},
                {label: '单位', prop: 'unit'},
                {label: '下单数量', prop: 'quantity',width: 100},
                // {label: '活动', prop: 'activityName'},
                {slot: 'operate', label: '操作', width: 100}
            ], // 操作列
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
            orderDetailData: [],

            // 商家赠品
            businessGiftColumns: [
                // {label: '序号', prop: 'seq', slot: 'seq', width: 50},
                {label: '赠品名称 ', prop: 'productName',width: 180},
                {label: '赠品编码', prop: 'productSn',width: 100},
                {label: '厂商编码', prop: 'factoryProductSn',width: 100},
                {label: '赠品数量', prop: 'quantity',width: 100},
                {label: '关联产品', prop: 'activityProductName'},
                {label: '单位', prop: 'unit'},
                {label: '关联活动', prop: 'activityName'},
                // {label: '兑换日期', prop: 'aa'},
                // {label: '兑换数量', prop: 'aa'},
                // {label: '运单号', slot: 'deliverySn'}
            ],

            businessGiftData: [],

            // 厂家赠品
            factoryGiftColumns: [
                // {label: '序号', prop: 'seq', width: 50},
                {label: '赠品名称 ', prop: 'giftName',width: 180},
                {label: '赠品编码', prop: 'giftSn'},
                {label: '厂商编码', prop: 'factoryId',width: 100},
                {label: '赠品数量', prop: 'quantity',width: 100},
                {label: '关联产品', prop: 'activityProductName'},
                {label: '单位', prop: 'unit',width:50},
                {label: '关联活动', prop: 'activityName'},
                {label: '兑换日期', prop: 'exchangeTime'},
                {label: '兑换数量', prop: 'exchangeQuantity'},
                {label: '运单号', slot: 'deliverySn'}
            ],

            factoryGiftData: []
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.orderDetailData = this.order_data.orderItems
            this.businessGiftData = this.order_data.storeGifts
            this.factoryGiftData = this.order_data.factoryGifts
        }
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
            //background-color: #F3F4F5;
            padding: 13px 20px;
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

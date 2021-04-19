<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card" style="height: 61px;">
                <button class='me-back' @click='toBack'><icon-svg name="shangyibu"></icon-svg><span> 返 回</span></button>
                <el-tabs v-model="activeName" type="card" style="float: left; border:0;">
                    <el-tab-pane label="订单详情" name="0"></el-tab-pane>
                    <!-- <el-tab-pane label="订单明细" name="1"></el-tab-pane> -->
                    <!--<el-tab-pane label="变更历史" name="2"></el-tab-pane>-->
                </el-tabs>
                <div class="btnlist" style="float: right;">
                    <div v-if="activeName==0">
                        <button v-if='orderData.status == 1||orderData.status == 2' @click='toAudit(1)' style="color: #b70404;"><icon-svg name="guanbi"></icon-svg><span>拒绝订单</span></button>
                        <button v-if='orderData.status == 1' @click='toAudit(0)' style="color: #6bda07;"><icon-svg name="success"></icon-svg><span>订单确认</span></button>
                        <button v-if='orderData.status == 2' @click='toDelivery'><icon-svg name="renjijiaohu"></icon-svg><span>订单出库</span></button>
                    </div>
                    <!-- <div v-if="activeName==1"> -->
                    <!-- <button v-if='orderData.status == 1' style="color: #6bda07;" @click='toAudit(0)'><icon-svg name="success"></icon-svg><span>订单确认</span></button> -->
                    <!-- <button v-if='orderData.status == 2' @click='toDelivery'><icon-svg name="renjijiaohu"></icon-svg><span>订单出库</span></button> -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
        <div class="tabs-main baseinfo" v-if="activeName==0">
            <basic-info :order-data="orderData"></basic-info>
        </div>
        <!-- <div class="tabs-main baseinfo" v-if="activeName==1">
            <detailList :order-data="orderData"></detailList>
        </div>
        <div class="form-wrap bgff mgt10" v-if="activeName==2">
        </div> -->
    </div>
</template>

<script>
import basicInfo from './basicInfo'
// import detailList from './detail-list'

export default {
    components: {
        basicInfo
    },
    props: {
        orderId: String,
        audit: Function,
        delivery: Function,
        changeShowIndex: Function
    },
    data() {
        return {
            dialogVisible: false,
            recipeDialogVisible: false,
            activeName: '0',
            orderData: {}
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        toBack() {
            this.changeShowIndex()
        },

        // 订单确认 审核状态 status（0：同意 1：拒绝）
        toAudit(status) {
            this.audit(this.orderData, status)
        },
        toDelivery() {
            this.delivery(this.orderData)
        },

        // 获取列表数据
        async getDetail() {
            let params = {
                id: this.orderId
            }
            let {code, data} = await this.$get(this.$api.order.orderDetail, params)
            if (code === 200) {
                this.orderData = data
                this.orderData.hasGiftActivity = this.orderData.hasGiftActivity.toString()
                this.orderData.hasFactoryActivity = this.orderData.hasFactoryActivity.toString()
                this.orderData.billStatus = this.orderData.billStatus.toString()
                this.orderData.billAmount = this.orderData.billType != 0 ? this.orderData.payAmount : 0
            } else {
                this.orderData = {}
                this.$message.error('获取订单失败')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabs-main{
        background: $white;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
    }
    .baseinfo{

    }
    .form-wrap{
        border-radius: 6px;
    }

    .me-back {
        padding: 0 21px;
        height: 61px;
        background-color: #ff4d04;
        color: white;
        border: 0;
        margin: -10px 0 0 -15px;
        float: left;
        font-size: 20px;
        border-radius: 6px 0 0 6px;
        cursor:pointer;
    }

    .btnlist button {
        margin: 3px;
        //padding: 8px 12px;
        letter-spacing: 4px;
    }
</style>

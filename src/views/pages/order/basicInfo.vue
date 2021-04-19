<template>
    <div class='basic-info'>
        <el-form :model='orderData' :rules='rules' ref='orderData' label-width='100px' class='demo-orderData'>
            <div class='title-w'>
                <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                <i class='title'>基本信息：</i>
            </div>
            <div class='me-row-content'>
                <el-row>
                    <el-col span="8"> <el-form-item label='订单编号：' prop='orderSn' >
                        <label v-text="orderData.orderSn"></label>
                    </el-form-item>
                    </el-col>
                    <el-col span="8">  <el-form-item label='下单日期：' prop='orderTime'>
                        <label v-text="orderData.orderTime"></label>
                    </el-form-item>
                    </el-col>
                    <el-col span="8"> <el-form-item label='商家赠品：' prop='hasGiftActivity' >
                        <div>{{orderData.hasGiftActivity=='1'?'是':'否'}}</div>
                    </el-form-item></el-col>
                </el-row>
                <el-row>
                    <el-col span="8">
                        <el-form-item label='订单金额：' prop='payAmount' >
                            <label v-text="orderData.payAmount" style="color: #d4280a;font-weight: bold"></label>元
                        </el-form-item>
                    </el-col>
                    <el-col span="8">
                        <el-form-item label='运费：' prop='payAmount' >
                            <label v-text="orderData.transportAmount" style="color: #d4280a;font-weight: bold"></label>元
                        </el-form-item>
                    </el-col>

                    <el-col span="8"><el-form-item label='厂家赠品：' prop='hasFactoryActivity' >
                        <div>{{orderData.hasFactoryActivity=='1'?'是':'否'}}</div>
                    </el-form-item></el-col>
                </el-row>
                <el-row>
                    <el-col span="8">        <el-form-item label='订单状态：' prop='status'>
                        <el-select v-model="orderData.status" clearable disabled>
                            <el-option label="待支付" :value="0"></el-option>
                            <el-option label="待审核" :value="1"></el-option>
                            <el-option label="待发货" :value="2"></el-option>
                            <el-option label="待收货" :value="3"></el-option>
                            <el-option label="已收货" :value="4"></el-option>
                            <el-option label="已取消" :value="5"></el-option>
                            <el-option label="已拒绝" :value="6"></el-option>
                        </el-select>
                    </el-form-item></el-col>
                    <el-col span="8"> <el-form-item label='订单类型：' prop='orderType'>
                        <el-select v-model="orderData.orderType" clearable disabled>
                            <el-option label="销售订单" :value="0"></el-option>
                            <el-option label="赠品订单" :value="1"></el-option>
                            <el-option label="测试订单" :value="2"></el-option>
                        </el-select>
                    </el-form-item></el-col>
                    <el-col span="8"> <el-form-item label='支付方式：' prop='payType' >
                        <el-select v-model="orderData.payType" clearable disabled>
                            <el-option label="无" :value="-1"></el-option>
                            <el-option label="授信" :value="0"></el-option>
                            <el-option label="商家收款码" :value="1"></el-option>
                            <el-option label="物流代收" :value="2"></el-option>
                            <el-option label="银行转账" :value="3"></el-option>
                            <el-option label="微信在线支付" :value="4"></el-option>
                        </el-select>
                    </el-form-item></el-col>
                </el-row>
                <el-row>
                    <el-col span="8"><el-form-item label='客户编码：' >
                        <el-input v-model='orderData.customerCode' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="8">  <el-form-item label='客户电话：'>
                        <el-input v-model='orderData.customerPhone' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="8"> <el-form-item label='客户名称：'>
                        <el-input v-model='orderData.customerName' disabled></el-input>
                    </el-form-item></el-col>
                </el-row>
                <el-form-item label='客户备注：'>
                    <el-input v-model='orderData.buyerNote' disabled></el-input>
                </el-form-item>
                <el-form-item label='商家备注：'>
                    <el-input v-model='orderData.sellerNote'></el-input>
                </el-form-item>
            </div>

            <detailList :order_data="orderData"></detailList>

            <div class='title-w' style="margin-top: 20px;">
                <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                <i class='title'>配送信息:</i>
            </div>
            <div class='me-row-content'>
                <el-row>
                    <el-col span="6"> <el-form-item label='配送方式' prop='name'  >
                        <el-select v-model="orderData.deliveryWay" disabled clearable>
                            <el-option label="无" :value="-1"></el-option>
                            <el-option label="商家配送" :value="0"></el-option>
                            <el-option label="物流快递" :value="1"></el-option>
                            <el-option label="自提" :value="2"></el-option>
                        </el-select>
                    </el-form-item></el-col>
                    <el-col span="6"><el-form-item label='配送单号' prop='deliverySn' >
                        <el-input v-model='orderData.deliverySn' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="12"> <el-form-item label='收货人' prop='receiverName' >
                        <el-input v-model='orderData.receiverName' disabled></el-input>
                    </el-form-item></el-col>
                </el-row>
                <el-row>

                    <el-col span="6">  <el-form-item label='收货电话' prop='receiverPhone' >
                        <el-input v-model='orderData.receiverPhone' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="18">
                        <el-form-item label='详细地址'>
                            <el-input v-model='orderData.receiverDetailAddress' disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>





            </div>

            <div class='title-w me-row-item-clear'>
                <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                <i class='title'>开票信息: </i>
            </div>
            <div class='me-row-content'>
                <!--<el-form-item label='是否开票' prop='billStatus' class='me-row-item'>-->
                <!--<div class="mini-switch-navorbtn" style="margin: 0;">-->
                <!--<div class="tabs-card" style="flex: 0.5; padding: 0;">-->
                <!--<el-tabs v-model="orderData.billStatus" type="card">,-->
                <!--<el-tab-pane label="否" :value="0"></el-tab-pane>-->
                <!--<el-tab-pane label="是" :value="1"></el-tab-pane>-->
                <!--</el-tabs>-->
                <!--</div>-->
                <!--</div>-->
                <!--</el-form-item>-->
                <el-row>
                    <el-col span="8">
                        <el-form-item label='发票类型' >
                            <el-select v-model="orderData.billType" clearable disabled>
                                <el-option label="不开发票" :value="0"></el-option>
                                <el-option label="普通发票" :value="1"></el-option>
                                <el-option label="普通电子发票" :value="2"></el-option>
                                <el-option label="增值税专用发票" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col span="8">
                        <el-form-item label='开票税率' prop='billRate'>
                            <el-input v-model='orderData.billRate' disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col span="8">
                        <el-form-item label='开票金额' prop='billAmount' >
                            <el-input v-model="orderData.payAmount" disabled="true">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="8">  <el-form-item label='开票税号'>
                        <el-input v-model='orderData.billTaxNumber' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="8"> <el-form-item label='发票抬头' >
                        <el-input v-model='orderData.billHeader' disabled></el-input>
                    </el-form-item></el-col>
                    <el-col span="8">  <el-form-item label='付款凭证' v-if="orderData.paymentVoucher" >
                        <el-button type="primary" @click="getPaymentImg" round>查看</el-button>
                    </el-form-item></el-col>
                </el-row>



                <!--<el-form-item label='已付金额' class='me-row-item'>-->
                <!--<el-input v-model='orderData.payAmount'></el-input>-->
                <!--</el-form-item>-->



            </div>
        </el-form>


        <!-- 遮罩盒子 -->
        <el-dialog
            title="付款凭证"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal="false"
            append-to-body
            :before-close="handleClose"
        >
            <img :src="orderData.paymentVoucher" style="width: 500px;"></img>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import detailList from './detail-list'

export default {
    name: '',
    components: {detailList},
    props: {
        orderData: Object,
        changeShowIndex: Function
    },
    data() {
        return {
            rules: {
            },
            dialogVisible: false
        }
    },
    created() {
    },
    methods: {
        toBack() {
            this.changeShowIndex()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getPaymentImg() {
            console.log('fukuanpinzheng')
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang='scss' scoped>
.basic-info {
    width: 95%;
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
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-left: 17px;
    color: #333333;
}

.me-row-content {
    padding-right: 15px;
}

.me-row-item {
    width: 50%;
    float: left;

    .el-form-item__content .el-select {
        width: 100%;
    }
}
.me-row-item-clear {
    clear: both;
}

</style>

<template>
    <!-- <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="60%"
    >
        <el-button type="success" @click="yinp">打印</el-button> -->

        <div id="printTest" ref="print">
            <div
                style="
                    font-size: 22px;
                    padding-bottom: 20px;
                    font-weight: 800;
                    font-family: 宋体;
                    text-align: center;
                "
            >
                订单明细
            </div>

            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                "
            >
                <span style="font-size: 16px; font-family: 宋体"
                    >客户名称：{{orderData.customerName}}</span
                >
                <span style="font-size: 16px; font-family: 宋体"
                    >联系人：{{orderData.receiverName}}</span
                >
                <span style="font-size: 16px; font-family: 宋体"
                    >下单日期：{{orderData.orderTime}}</span
                >
            </div>

                 <div
                style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                "
            >
                <span style="font-size: 16px; font-family: 宋体"
                    >送货地址：{{orderData.receiverDetailAddress}}</span
                >
                <span style="font-size: 16px; font-family: 宋体"
                    >联系电话：{{orderData.receiverPhone}}</span
                >
                <span style="font-size: 16px; font-family: 宋体"
                    >单号：{{orderData.orderSn}}</span
                >
            </div>

            <table>
                <thead>
                    <th>产品名称</th>
                    <th>产品编码</th>
                    <th>厂商编码</th>
                    <th>产品型号</th>
                    <th>产品价格</th>
                    <th>单位</th>
                    <th>下单数量</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in orderData.orderItems" :key="index">
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productSn }}</td>
                        <td>{{ item.factoryProductSn }}</td>
                        <td>{{ item.productModel }}</td>
                        <td>{{ item.standardPrice }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.quantity }}</td>
                    </tr>

                    <tr>
                        <td  colspan="4">　金额总计：</td>
                        <td  colspan="3">{{orderData.payAmount}}　</td>
                    </tr>
                </tbody>
            </table>

            <!-- <div
                style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                "
            >
                <div>制单人：</div>
                <div>业务员：</div>
                <div>复核人：</div>
            </div>

            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                "
            >
                <div>企业QQ：400-800-6654</div>
                <div>电话：400-800-6654</div>
                <div>微信公众号：为人医疗（盖章生效）</div>
            </div> -->
        </div>
    <!-- </el-dialog> -->
</template>
<script>
export default {
    components: {},
    data() {
        return {
            orderData: [],
            //visible: false,
            // title: '上传图片',
            row: {}
        }
    },
    methods: {
        // yinp() {
        //     this.$print(this.$refs.print) // 使用

        // },
        edit(row) {
           // this.visible = true
            console.log('row', row)
            this.row = row
            // this.id = id
            this.getDetail()
        },
        // close() {
        //     // this.id = null
        //     this.visible = false
        // },
        // 获取订单详情数据
        async getDetail() {
            let params = {
                id: this.row.id
            }
            let {code, data} = await this.$get(
                this.$api.order.orderDetail,
                params
            )
            if (code === 200) {
                this.orderData = data;
                // this.orderDetailData = data.orderItems
                // console.log('orderDetailData', this.orderDetailData)
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$print(this.$refs.print) // 使用
                    }, 500)
                })
            } else {
                this.orderData = {};
                // this.orderDetailData = []
            }
        }
        // cancelHandel() {
        //   this.close();
        // },
    }
}
</script>

<style  scoped>
#printTest table {
    font-family: '宋体';
    border-collapse: collapse;
    width: 99.5%;
}
#printTest table thead th {
    height: 40px;
    font-size: 13px;
    /* width: 10px; */
    text-align: center;
    border: 1px solid black;
}
#printTest table tbody tr {
    font-size: 13px;
    border: 1px solid black;
    height: 40px;
    text-align: center;
}
#printTest table tbody td {
    font-size: 13px;
    text-align: center;
    border: 1px solid black;
}
</style>

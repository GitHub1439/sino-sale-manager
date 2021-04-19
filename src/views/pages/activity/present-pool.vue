<template>
    <div>
        <div class="priceinfo">
            <div class="box mini-switch-nav mgr15" style="flex: 0.4;">
                <div class="top" style="display: flex;align-items: center">
                    <el-input
                        v-model="customerName"
                        @keyup.enter.native="getProList()"
                        placeholder="快速搜索客户"
                    />
                </div>

                <div class="line"></div>
                <div class="bottom">
                    <div class="tab-list">
                        <div class="rows rname">
                            <span>客户名称</span>
                            <span style="flex: 0.4">客户代码</span>
                            <span style="flex: 0.5">客户类型</span>
                        </div>
                        <div :style="{ 'min-height': documentClientHeight + 'px' }">
                            <div
                                :class="'rows '+'goods-name '+[proId===item.id ? 'active' : '']"
                                v-for="item in totalPro"
                                :key="item.code"
                                @click="proRowClick(item)"
                            >
                                <span class="goods-sn">
                                    <el-tooltip effect="light" :content="item.customerName" placement="top-start">
                                        <i>{{item.customerName}}</i>
                                    </el-tooltip>
                                </span>
                                <span style="flex: 0.4" class="goods-sn">
                                    <el-tooltip effect="light" :content="item.customerCode" placement="top-start">
                                        <i>{{item.customerCode}}</i>
                                    </el-tooltip>
                                </span>
                                <span style="flex: 0.5" v-if="item.customerType == 1">器械批发</span>
                                <span style="flex: 0.5" v-if="item.customerType == 2">器械店</span>
                                <span style="flex: 0.5" v-if="item.customerType == 3">连锁药房</span>
                                <span style="flex: 0.5" v-if="item.customerType == 4">单体药房</span>
                                <span style="flex: 0.5" v-if="item.customerType == 5">医药公司</span>
                                <span style="flex: 0.5" v-if="item.customerType == 6">医疗机构</span>
                                <span style="flex: 0.5" v-if="item.customerType == 7">连锁器械</span>
                                <span style="flex: 0.5" v-if="item.customerType == 8">连锁无糖</span>
                                <span style="flex: 0.5" v-if="item.customerType == 9">其它</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box com-body" style="flex: 1">
                <div class="body-head mgt5">
                    <div>
                        <icon-svg class="titile-icon" name="bianji"></icon-svg>
                        赠品清单
                        <!-- <a title="没有设定默认价格策略时按商品标准价"><icon-svg name="yiwenkongxin" style="color: #333;font-size: 14px" title="11"></icon-svg></a>-->
                    </div>
                </div>
                <div class="body-content">
                    <div class="tab-list">
                        <div class="rows rname">
                            <span style="flex: 0.3">序号</span>
                            <span style="flex: 0.3">订单号</span>
                            <span style="flex: 0.4">订单日期</span>
                            <span style="flex: 0.3">订单价格</span>
                            <span style="flex: 0.3">赠品代码</span>
                            <span style="flex: 0.3">赠品名称</span>
                            <span style="flex: 0.3">赠品数量</span>
                            <span style="flex: 0.3">兑付数量</span>
                            <span style="flex: 0.3">兑付时间</span>
                            <span style="flex: 0.3">兑付单号</span>
                        </div>
                        <div class="rows goods-name" v-for="(item,index) in youhuiList" :key="item.code">
                            <span style="flex: 0.3">{{(preCurrent-1) * preSize + (index+1)}}</span>
                            <span style="flex: 0.3" class="goods-sn">
                                <el-tooltip effect="light" :content="item.orderSn" placement="top-start">
                                    <i>{{item.orderSn}}</i>
                                </el-tooltip>
                            </span>
                            <span style="flex: 0.4" class="goods-sn">
                                <el-tooltip effect="light" :content="item.orderTime" placement="top-start">
                                    <i>{{item.orderTime}}</i>
                                </el-tooltip>
                            </span>
                            <span style="flex: 0.3">{{item.orderAmount}}</span>
                            <span style="flex: 0.3">{{item.giftSn}}</span>
                            <span style="flex: 0.3" class="goods-sn">
                                <el-tooltip effect="light" :content="item.giftName" placement="top-start">
                                    <i>{{item.giftName}}</i>
                                </el-tooltip>
                            </span>
                            <span style="flex: 0.3">{{item.quantity}}</span>
                            <span style="flex: 0.3"></span>
                            <span style="flex: 0.3"></span>
                            <span style="flex: 0.3"></span>
                        </div>
                    </div>
                    <div v-if="youhuiList.length > 0">
                        <el-pagination
                            background
                            @current-change="productCurrentChange"
                            layout="prev, pager, next"
                            :total="youhuiList.length"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            height: '0.86',
            num: 0,
            addtype: '',
            isEdit: false,
            custData: {},
            inputCustomerName: '',
            formdata: {},
            keywords: '',
            dialogformdata: {},
            chargetype: '1',
            showVisible: false,
            title: '',
            proId: '',
            priceVal: '',
            totalPro: [],
            youhuiList: [],
            current: 1,
            size: 10000,
            customerName: '',
            preCurrent: 1,
            preSize: 10
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
        this.getProList()
    },
    methods: {
        async proRowClick(temp) {
            this.proId = temp.id
            this.getPresentList()
        },
        productCurrentChange(page) {
            this.preCurrent = page
            this.getPresentList()
        },
        // 查询客户赠品
        async getPresentList() {
            let par = {
                customerId: this.proId,
                current: this.preCurrent,
                size: this.preSize
            }
            let {data, code, msg} = await this.$get(this.$api.activity.merGiftList, par)
            if (data && code === 200) {
                this.youhuiList = data.records
            } else {
                this.$message.error(msg)
            }
        },
        /* 查询客户 */
        async getProList() {
            let par = {
                current: this.current,
                size: this.size,
                customerName: this.customerName
            }
            let {data, code, msg} = await this.$get(this.$api.customermanage.listCust, par)
            if (data && code === 200) {
                this.totalPro = data.records
            } else {
                this.$message.error(msg)
            }
        },
        async cancelDialog() {
            this.showVisible = false
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
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {/*  */
                            }
                        })
                        this.getAutoPrice()

                    } else {
                        this.$message.error(data.msg)
                    }
                }).catch(() => {/*  */
                })
            }).catch(() => {/*  */
            })

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

            .top {
                padding: 10px 10px;
                background: #fff;
                border: 1px solid #fff;
                border-radius: $border-radius;
            }

            .bottom {
                padding: 6px;
                overflow: scroll;
                background: #fff;
                border: 1px solid #fff;
                border-radius: $border-radius;
            }
        }

        .tab-list {
            .active span {
                background: #E3E0DF;
            }

            .rows {
                .goods-sn {
                    overflow: hidden;
                    text-overflow: ellipsis; //文本溢出显示省略号
                    white-space: nowrap;
                }
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
        background: #FCFADE;
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

    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #FF4E07; // 进行修改选中项背景和字体
    }
</style>

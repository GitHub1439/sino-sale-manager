<template>
    <el-dialog
        :visible.sync="showVisible"
        top="1%"
        width="80%"
        title="选择标签"
        class="reply-dia"
        :before-close="handlClose"
        :show-close="true"
    >

        <sn-table
            :table-data="labelCustomerData"
            :columns="labelColumns"
            :page-obj="labelPageObj"
            :is-fit="true"
            :is-selection="true"
            @handleSelectionChange="selectionChange"
        >



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
        props:["labelCustomerData"],
        data() {
            return {
                loading: false,
                showVisible: false,
                customerName: '',
                customerCode: '',
                // labelCustomerData:[], //客户标签
                labelColumns: [
                    {label: '标签名称', prop: 'labelName'},
                    // {label: '是否冻结', slot: 'status'},
                    {label: '注册时间', prop: 'createTime' }

                ], // 操作列
                labelPageObj: {
                    size: 10,
                    total: 0,
                    currentPage: 1,
                    func: (currentPage) => {
                        this.labelPageTurning(currentPage)
                    },
                    handleSizeChange: (size) => {
                        this.labelPPizeChange(size)
                    }
                },
                customerLabel:"",//搜索标签名称
            }
        },
        props: {
            productId: {
                type: String,
                default: ''
            }
        },
        created() {
            // this.labelListCust()
        },
        methods: {
            init(){
                this.showVisible = true
                this.customerValue = ''
            },
            labelPageTurning(page){
                this.labelPageObj.currentPage = page
                this.listCust()
            },
            labelPPizeChange(size){
                this.labelPageObj.size = size
                this.selectPrice()
            },
            labelListCust() {
                this.loading = true
                let param = {
                    labelName:this.customerLabel
                }
                this.$get(this.$api.customermanage.customerLabelList, param).then((data) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        this.pageObj.total = data.data.total
                        this.labelCustomerData = data.data.records
                    }
                })
            },
            init() {
                this.showVisible = true
                this.customerValue = ''
                // this.listCust()
                // this.getCustomerLabel()
            },
            handlClose() {
                this.showVisible = !this.showVisible
                this.$emit('showCustList')
            },
            submitCheck() {
                this.showVisible = !this.showVisible
                this.$emit('clientSelectionChange', this.clientList)
                this.$emit('showCustList')
            },
            search() {
                this.labelListCust()
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
                    customerName: this.customerName,
                    customerCode: this.customerCode,
                    customerLabel: this.customerTag[this.customerValue] ? this.customerTag[this.customerValue].label : '',
                    filter: 1
                }
                this.$get(this.$api.customermanage.listCust, param).then((data) => {
                    if (data && data.code === 200) {
                        this.loading = false
                        this.pageObj.total = data.data.total
                        data.data.records.forEach(item=>{
                            item.Address = item.province + item.city + item.region + item.address
                        })
                        this.customerData = data.data.records
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            selectionChange(val) {
                this.clientList = val
            },
            getCustomerLabel() {
                this.$get(this.$api.customermanage.getCustomerLabel, {mchId: localStorage.getItem('mch_id')}).then((data) => {
                    if (data && data.code === 200) {
                        let arr = []
                        data.data.forEach((item, index)=>{
                            arr.push({
                                label: item,
                                value: index
                            })
                        })
                        this.customerTag = arr
                    } else {
                        this.$message.error(data.msg)
                    }
                })
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
                min-width: 69px;
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

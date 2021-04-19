<template>
    <div class="tabs-main runfeel">
        <div class="switch-nav">
            <div class="tabs-card">
                <el-tabs v-model="status" type="card" @tab-click="fellClick">
                    <el-tab-pane label="生效中" name="1"></el-tab-pane>
                    <el-tab-pane label="已过期" name="0"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="runfeel-list" v-loading="loading">
            <div class="rows" v-for="item in merchantList" :key="item.id">
                <div class="rows-top">
                    <div class="box-con">及时</div>
                    <icon-svg name='activity' style="font-size: 45px"></icon-svg>
                    <el-tooltip class="item" effect="light" :content="item.name" placement="top-start">
                        <div class="box-title">《<span class="title-item">{{item.name}}</span>》</div>
                    </el-tooltip>
                </div>
                <div class="rows-bot">
                    <div class="tag">
                        <span>{{item.startDate.slice(0,10)}}</span>
                        <span>~</span>
                        <span>{{item.endDate.slice(0,10)}}</span>
                    </div>
                    <div class="event">
                        <div class="event_title" @click="deleteRow(item)">
                            <a title="点击失效"><icon-svg name="shixiao" style="font-size: 22px;"></icon-svg></a>
                            <div>失效</div>
                        </div>
                        <div @click="editActivity(item)" class="event_title">
                            <a title="点击修改"><icon-svg name="bianji" style="font-size: 22px;"></icon-svg></a>
                            <div>编辑</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="status !== '0'" class="rows add" @click="editActivity('newAdd')">
                <icon-svg name="tianjia" style="font-size: 46px; color: #FF4D07;margin: 40px 0 20px 0"></icon-svg>
                <span>点击新增</span>
            </div>
        </div>
        <div class="con-pagination">
            <el-pagination
                @size-change="clientSizeChange"
                background
                @current-change="clientCurrentChange"
                layout="sizes, prev, pager, next"
                :total="total"
            >
            </el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
            <div>
                <freight-add-dialog @refreshPres="refreshPres" @cancelDialog="cancelDialog" v-if="dialogVisible" :presc-data="prescData" :is-edit="isEdit"></freight-add-dialog>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import freightAddDialog from '@/views/pages/shop/freight/freight-add-dialog'

export default {
    name: 'MerchantActivity',
    components: {
        freightAddDialog
    },
    data() {
        return {
            title: '运费模板',
            isEdit: false,
            dialogVisible: false,
            activeEnable: '1',
            prescData: {},
            merchantList: [],
            current: 1,
            size: 10,
            total: 0,
            status: '1', // 状态  0失效    1生效   2未开始
            loading: false
        }
    },
    created() {
        this.getMerchant()
    },
    methods: {
        // 获取商家活动数据
        async getMerchant() {
            this.loading = true
            let params = {
                current: this.current,
                size: this.size,
                status: this.status,
                source: 0 // 0厂商 1商户
            }
            let {code, data, msg} = await this.$get(this.$api.activity.activityList, params)
            if (code === 200) {
                this.merchantList = data.records
                this.total = data.total
                this.loading = false
            } else {
                this.$message.error(msg)
            }
        },
        async updateStatus(row, status) {
            let params = {
                id: row.id,
                status
            }
            let {code, msg} = await this.$post(this.$api.activity.updateStatus, params)
            if (code === 200) {
                this.getMerchant()
                this.$message.success('操作成功!')
            } else {
                this.$message.error(msg)
            }
        },
        fellClick(e) {
            this.status = e.name
            this.getMerchant()
        },
        clientSizeChange(e) {
            this.size = e
            this.getMerchant()
        },
        clientCurrentChange(e) {
            this.current = e
            this.getMerchant()
        },
        addPrescription() {
            // 显示新增处方弹窗
            this.title = '添加运费模板'
            this.isEdit = false
            this.dialogVisible = true
        },
        deleteRow(row) {
            let text = ''
            let status = ''
            if (this.status === '1') {
                text = '是否让该活动失效?'
                status = '0'
            } else if (this.status === '0') {
                this.$message.warning('已过期的活动不能操作!')
                return
            }
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.updateStatus(row, status)
            }).catch(() => {/*  */})
        },
        editActivity(item) {
            if (item === 'newAdd') {
                this.$router.push({name: 'edit-factory', query: {type: item}})
            } else {
                if (this.status === '0') {
                    this.$message.warning('已过期的活动不能操作!')
                    return
                }
                this.$router.push({name: 'edit-factory', query: {id: item.id}})
            }
        },
        cancelDialog() {
            this.dialogVisible = false
        },
        handleClose() {
        },
        refreshPres() {
        }

    }
}
</script>

<style lang="scss" scoped>
    .runfeel{
        .runfeel-list{
            display: flex;
            padding: 0px 15px 15px;
            flex-wrap: wrap;
            .rows{
                height: 220px;
                margin-top: 30px;
                background: #fff;
                width: 190px;
                margin-left: 30px;
                cursor: pointer;
                .rows-top{
                    border-radius: 10px 10px 0 0;
                    color: #fff;
                    height: 120px;
                    line-height: 120px;
                    font-size: 14px;
                    text-align: center;
                    background: #FF4D07;
                    position: relative;
                    overflow: hidden;
                    .box-con {
                        font-size: 13px;
                        color: #000000;
                        position: absolute;
                        width: 70px;
                        height: 70px;
                        background-color: #E6ECF0;
                        transform: rotate(45deg);
                        top:-39px;
                        right:-39px;
                    }
                    .box-title {
                        width: 100%;
                        text-align: center;
                        position: absolute;
                        bottom: 10px;
                        line-height: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis; //文本溢出显示省略号
                        white-space: nowrap;
                        padding: 0 10px;
                    }
                }
                .rows-bot{
                    border-radius:0 0 10px 10px;
                    height: 100px;
                    background: #F2F3F3;
                    .tag{
                        display: flex;
                        justify-content: space-around;
                        padding: 15px 5px;
                        span{
                            /*margin-left: 10px;*/
                            font-weight: bold;
                        }
                    }
                    .event{
                        .event_title {
                            color: #666;
                            cursor: pointer;
                        }
                        .event_title:hover{
                            color: #FF4D07;
                        }
                        display: flex;
                        justify-content: space-around;
                        svg{
                            color: #666;
                        }
                        svg:hover{
                            color: #FF4D07;
                        }

                    }
                }
            }
            /*.rows:first-child{
                margin-left: 30px;
            }*/
            .rows:hover .rows-bot{
                color: #ff4d07;
            }
            .rows.add{
                border: 1px dashed #dedede;
                border-radius: 10px;
                text-align: center;
                color: #FF4D07;
                cursor: pointer;
                span{
                    color: #FF4D07;
                    font-size: 16px;
                    display: block;
                }
            }
            .rows.add:hover{
                border: 1px dashed #ff4d07;
            }
        }
        .con-pagination {
            /*right: 0px;*/
            /*height: 55px;*/
            /*position: absolute;*/
            bottom: 0;
            /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
                background-color: #FF4E07;   // 进行修改选中项背景和字体
            }
        }
    }
</style>

<template>
    <div class="tabs-main runfeel">
        <div class="mini-switch-nav">
            <div class="tabs-card">
                <el-tabs
                    v-model="activeEnable"
                    type="card"
                    @tab-click="fellClick"
                >
                    <el-tab-pane label="生效中" name="0"></el-tab-pane>
                    <el-tab-pane label="已失效" name="1"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="runfeel-list">
            <div class="rows" v-for="item in fellList" :key="item.id">
                <div class="rows-top">
                    <img src="@/assets/images/freesend.png" alt="">
                    <p>《{{item.name}}》</p>
                </div>
                <div class="rows-bot">
                    <div class="tag">
                        <span>{{item.isFree == 0 ? '买家付费' : '商家包邮'}}</span>
                        <span>{{item.chargeType == 0 ? '按件计费' : item.chargeType == 1 ? '按重量计费' : '按体积计费'}}</span>
                    </div>
                    <a class="evet">
                        <a title="点击删除" @click="deleteRow(item)">
                            <icon-svg
                                name="shanchu"
                                style="font-size: 24px"
                            ></icon-svg>
                        </a>
                        <a title="点击修改" @click="editRow(item)">
                            <icon-svg
                                name="bianji"
                                style="font-size: 22px"
                            ></icon-svg>
                        </a>
                    </a>
                </div>
            </div>
            <div v-show="activeEnable == 0" class="rows add" @click="addPrescription">
                <icon-svg
                    name="tianjia"
                    style="
                        font-size: 60px;
                        color: #ff4d07;
                    "
                ></icon-svg>
                <span >点击新增</span>
            </div>
        </div>
        <div class="con-pagination">
            <el-pagination
                @size-change="clientSizeChange"
                background
                @current-change="clientCurrentChange"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="80%"
            :before-close="handleClose"
        >
            <div>
                <freight-add-dialog
                    @refreshPres="refreshPres"
                    @cancelDialog="cancelDialog"
                    v-if="dialogVisible"
                    :presc-data="prescData"
                    :is-edit="isEdit"
                ></freight-add-dialog>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import freightAddDialog from './freight-add-dialog'

export default {
    components: {
        freightAddDialog
    },
    data() {
        return {
            title: '运费模板',
            isEdit: false,
            prescData: {},
            loading: null,
            total: 0,
            current: 1,
            size: 10,
            dialogVisible: false,
            activeEnable: '0',
            fellList: []
        }
    },
    async created() {
        await this.getList()
    },
    methods: {
        clientSizeChange(e) {
            this.size = e
            this.getList()
        },
        clientCurrentChange(e) {
            this.current = e
            this.getList()
        },
        fellClick(tab, event) {
            console.log(this.activeEnable)
            this.current = 1
            this.getList()
        },
        async getList() {
            this.loading = this.$loading({
                lock: true
            });
            let {code, data, msg} = await this.$get(
                this.$api.extra.transportList + '?isEnabled=' + (this.activeEnable == 0 ? true : false) + '&current=' + this.current + '&size=' + this.size
            )
            if (code === 200) {
                this.fellList = data.records
                this.total = data.total
            } else {
                this.$message({
                    message: msg
                })
            }
            this.loading.close()
        },
        handleClose() {
            this.dialogVisible = false
        },
        refreshPres() {
            this.getList()
        },
        addPrescription() {
            // 显示新增处方弹窗
            this.title = '添加运费模板'
            this.isEdit = false
            this.dialogVisible = true
        },
        async editRow(row) {
            console.log(row)
            this.title = '修改运费模板'
            this.isEdit = true
            this.dialogVisible = true
            this.prescData = row
        },
        deleteRow(row) {
            console.log(row)
            this.$confirm('是否确认删除该模板?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.dataListLoading = true
                    let data = await this.$post(this.$api.extra.transportRemove + '?ids=' + row.id)
                    if (data && data.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500
                        })
                        this.getList()
                    } else {
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
                .catch(() => {
                    /*  */
                })
        },
        cancelDialog() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.runfeel {
    .runfeel-list {
        display: flex;
        padding: 15px;
        align-items: center;
        flex-wrap: wrap;
        .rows {
            background: #fff;
            width: 200px;
            margin-right: 30px;
            margin-bottom: 20px;
            cursor: pointer;
            .rows-top {
                border-radius: 10px 10px 0 0;
                color: #fff;
                height: 120px;
                font-size: 14px;
                text-align: center;
                background: #FF4D07;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: 14px;
                img{
                    width:80px;
                }
            }
            .rows-bot {
                border-radius: 0 0 10px 10px;
                height: 82px;
                background: #f2f3f3;
                .tag {
                    display: flex;
                    padding: 15px 0;
                    font-size: 14px;
                    span {
                        font-weight: bold;
                        flex:1;
                        text-align: center;
                    }
                }
                .evet {
                    text-align: center;
                    display: flex;
                    a {
                        flex: 1;
                    }
                    svg {
                        color: #666;
                    }
                    svg:hover {
                        color: #ff4d07;
                    }
                }
            }
        }
        .rows:first-child {
            margin-left: 0;
        }
        .rows:hover .rows-bot{
            color: #ff4d07;
        }
        .rows.add {
            border: 1px dashed #dedede;
            border-radius: 10px;
            text-align: center;
            color: #ff4d07;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 200px;
            cursor: pointer;
            span {
                color: $--color-primary;
                font-size: 16px;
                margin-top: 30px;
                display: block;
            }
        }
        .rows.add:hover{
            border: 1px dashed #ff4d07;
        }
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
</style>

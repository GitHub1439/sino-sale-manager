<template>
    <div class="basic-info">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <div class="title-w" style="position: relative">
                <icon-svg
                    name="bianji"
                    style="font-size: 22px; margin-left: 16px"
                ></icon-svg>
                <i class="title">规格:</i>
                <el-button
                    type="primary"
                    style="position: absolute; right: 0"
                    @click="addHandle"
                    >新增</el-button
                >
            </div>

            <sn-table
                :table-data="ruleForm.brandList"
                :columns="columnss"
                :is-fit="true"
                :loading="loading"
                :page-obj="pageObj"
            >
                <template slot="province" slot-scope="scope">
                    <div>
                        <div>
                            {{
                                scope.scope.name +
                                scope.scope.sort +
                                scope.scope.createTime
                            }}
                        </div>
                    </div>
                </template>
                <template slot="operate" slot-scope="scope">
                    <el-button
                        size="small"
                        type="text"
                        @click="previewSend(scope.scope)"
                        >编辑</el-button
                    >
                    <el-button
                        size="small"
                        type="text"
                        @click="remove(scope.scope)"
                        >删除</el-button
                    >
                </template>
            </sn-table>
        </el-form>
        <el-dialog
            :title="editWay ? '编辑规格' : '新增规格'"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <div>
                <el-form
                    ref="account"
                    :rules="accountRules"
                    :model="brandFrom"
                    label-width="80px"
                >
                    <el-form-item label="选择品牌" prop="bank">
                        <el-select
                            v-model="brandFrom.factoryId"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in brandOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="规格名称" prop="name">
                        <el-input v-model="brandFrom.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="排序" prop="sort">
                        <el-input v-model="brandFrom.sort"></el-input>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            brandOptions: [],
            loading: false,
            pageObj: {
                size: 100,
                total: 0,
                currentPage: 1,
                func: (currentPage) => {
                    this.pageTurning(currentPage)
                },
                handleSizeChange: (size) => {
                    this.sizeChange(size)
                }
            },
            dialogVisible: false,
            editWay: true,
            ruleForm: {
                brandList: []
            },
            accountRules: {
                bankAccount: [
                    {required: true, message: '请输入收款账户', trigger: 'blur'}
                ],
                bank: [
                    {required: true, message: '请输入收款银行', trigger: 'blur'}
                ],
                bankName: [
                    {required: true, message: '请输入收款人', trigger: 'blur'}
                ]
            },
            brandFrom: {
                factoryId: '',
                name: '',
                sort: ''
            },
            columnss: [
                // {label: '排序',prop:'sort',width:200},
                {label: '品牌名称', prop: 'factoryName', width: 220},
                {label: '规格名称', prop: 'name', width: 220},
                {label: '创建时间', prop: 'createTime', width: 200},
                {slot: 'operate', label: '操作', width: 180}
            ], // 操作列
            rules: {}
        }
    },
    created() {
        this.showList()
        this.brandList()
    },
    methods: {
        async brandList() {
            let params = {}
            let {code, data} = await this.$get(
                this.$api.product.brandList,
                params
            )
            // console.log(data)
            if (code === 200) {
                this.brandOptions = data
            }
        },
        // 页码改变
        pageTurning(page) {
            this.pageObj.currentPage = page
            this.getProductDatas()
        },
        // 页面数量改变
        sizeChange(size) {
            this.pageObj.size = size
            this.getProductDatas()
        },
        async showList() {
            let params = {
                current: this.pageObj.currentPage,
                size: this.pageObj.size
                // keyword: this.keyWord,
                // productType:this.productType==null?null:this.productType,
                // categoryId: this.categoryId,
                // scope: this.activeProtype==-1?null:this.activeProtype
            }
            let {code, data} = await this.$get(
                this.$api.product.specList,
                params
            )
            console.log(data)
            if (code === 200) {
                this.pageObj.total = data.total
                this.ruleForm.brandList = data.records
            }

            // console.log(data)
        },
        addHandle() {
            this.brandFrom = {}
            this.dialogVisible = true
            this.editWay = false
        },
        previewSend(row) {
            this.brandFrom = {...row}
            this.dialogVisible = true
            this.editWay = true
        },
        submit() {
            if (this.editWay) {
                this.update()
            } else {
                this.add()
            }
        },
        add() {
            console.log('新增')
            let that = this
            let param = this.brandFrom
            let factoryObj = that.brandOptions.find((v) => {
                return v.id == that.brandFrom.factoryId
            })
            console.log('factoryObj',factoryObj);
            param.factoryName = factoryObj.name;

            console.log('param',param);

            this.$post(this.$api.product.specUpdateOrAdd, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.$message(data.msg)
                        this.showList()
                    } else {
                        this.$message(data.msg)
                    }
                }
            )
            this.dialogVisible = false
        },
        update() {
            debugger
            console.log('编辑')
            let that = this
            let param = this.brandFrom
            let factoryObj = that.brandOptions.find((v) => {
                return v.id == that.brandFrom.factoryId
            })
            param.factoryName = factoryObj.name
            console.log(this.brandFrom)
            this.$post(this.$api.product.specUpdateOrAdd, param).then(
                (data) => {
                    if (data && data.code === 200) {
                        this.$message(data.msg)
                        this.showList()
                    } else {
                        this.$message(data.msg)
                    }
                }
            )
            this.dialogVisible = false
        },
        remove(row) {
            this.$confirm('此操作将删除当前规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    console.log('删除')
                    this.$post(
                        this.$api.product.specRemove + '?ids=' + row.id
                    ).then((data) => {
                        if (data && data.code === 200) {
                            // this.$message(data.msg)
                            this.$message({
                                type: 'success',
                                message: data.msg
                            })
                            this.showList()
                        } else {
                            this.$message({
                                type: 'success',
                                message: data.msg
                            })
                            // this.$message(data.msg)
                        }
                    })
                    this.dialogVisible = false
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    }
}
</script>

<style lang="scss" >
.basic-info {
    width: 60%;
    margin: 0 auto;
}
.title-w {
    height: 45px;
    background: #f2f3f3;
    opacity: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
}
.title {
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-left: 17px;
    color: #333333;
}
.avatar {
    width: 1.84rem;
    height: 1.64rem;
    margin-left: 0.8rem;
}
.avatar-uploader .el-upload:hover {
    border-color: #ff3f6b;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.red {
    margin-left: 0.12rem;
    margin-right: 0.14rem;
    color: #e40137;
    line-height: 0.3rem;
}
.te {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #a1a0a1;
    text-align: center;
    margin-left: 0.8rem;
    margin-top: 0.1rem;
    margin-bottom: 20px;
}
.zi-zhi {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #a1a0a1;
    // margin-top: 0.24rem;
}
</style>

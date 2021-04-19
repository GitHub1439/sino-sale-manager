<template>
    <div class="basic-info" v-loading="loading">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="title-w">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; "></icon-svg>
                <i class="title">支付方式：</i>
            </div>
            <div class="zi-zhi">请选择店铺支持的收款方式</div>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="银行转账"><el-switch v-model="payMethods[3]" active-color="#FF4D07" active-value="1" inactive-value="0"></el-switch></el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="微信支付"><el-switch v-model="payMethods[4]" active-color="#FF4D07" active-value="1" inactive-value="0"></el-switch></el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="物流代收"><el-switch v-model="payMethods[2]" active-color="#FF4D07" active-value="1" inactive-value="0"></el-switch></el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="授信月结"><el-switch v-model="payMethods[0]" active-color="#FF4D07" active-value="1" inactive-value="0"></el-switch></el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="扫码支付"><el-switch v-model="payMethods[1]" active-color="#FF4D07" active-value="1" inactive-value="0"></el-switch></el-form-item>
                    </div>
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>

            <div class="title-w" style="position: relative;">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px"></icon-svg>
                <i class="title">银行账号:</i>
                <el-button type="primary" style="position: absolute; right: 0;" @click="addHandle">新增</el-button>
            </div>
            <sn-table :table-data="ruleForm.merchantBankList" :columns="columnss" :loading="loading" :is-fit="true" :is-pagination-show="false">
                <template slot="province" slot-scope="scope">
                    <div>
                        <div>{{scope.scope.province + scope.scope.city + scope.scope.area}}</div>
                    </div>
                </template>
                <template slot="operate" slot-scope="scope">
                    <div><el-button size="small" type="text" @click="previewSend(scope.scope)">编辑</el-button> <el-button size="small" type="text" @click="removeBankRow(scope.scope)">删除</el-button></div>
                </template>
            </sn-table>

            <div class="title-w" style="margin-top: 20px;">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; "></icon-svg>
                <i class="title">微信支付:</i>
            </div>

            <!-- <el-form-item label="经营资质扫描件" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item> -->

            <div class="zi-zhi">
                <i class="red">*</i>
                扫码支付配置
            </div>
            <div class="up-file">
                <div>
                    <el-upload
                        :limit="1"
                        class="avatar-uploader"
                        :headers="headers"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="ruleForm.collectionCode" :src="ruleForm.collectionCode" class="avatar" />
                        <div v-else class="up"><div class="avatar-img"></div></div>
                    </el-upload>
                    <div class="te">收款二维码</div>
                </div>
            </div>

            <el-form-item label="商户ID" prop="wxMchId"><el-input v-model="ruleForm.wxMchId"></el-input></el-form-item>
            <el-form-item label="Api密钥" prop="wxMchPartnerKey"><el-input v-model="ruleForm.wxMchPartnerKey"></el-input></el-form-item>

            <el-form-item>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :title="editWay?'编辑银行账号':'新增银行账号'" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <div>
                <el-form ref="account" :rules="accountRules" :model="account" label-width="80px">
                    <el-form-item label="收款账号" prop="bankAccount">
                        <el-input v-model="account.bankAccount"></el-input>
                        <el-input v-model="account.index" v-if="false"></el-input>
                    </el-form-item>
                    <el-form-item label="收款银行" prop="bank">
                        <!-- <el-input v-model="account.bank"></el-input> -->
                        <el-select v-model="account.bank" placeholder="请选择">
                            <el-option v-for="item in bankOptions" :key="item.dictKey" :label="item.label" :value="item.dictValue"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公户私户" prop="bankType">
                        <el-select @change="getBankTypeValue" v-model="account.bankTypeValue" placeholder="请选择">
                            <el-option v-for="item in bankTypeList" :key="item.value" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收款人" prop="bankName"><el-input v-model="account.bankName"></el-input></el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="accountAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            // 上传文件
            loading: false,
            action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            fileList: [],
            addressData: [],
            columnss: [
                {label: '收款账号', prop: 'bankAccount', width: 180},
                {label: '收款银行', prop: 'bank', width: 180},
                {label: '收款人', prop: 'bankName'},
                {label: '公户私户', prop: 'bankTypeValue'},
                // {label: '启用', prop: 'contactName'},
                {slot: 'operate', label: '操作',width: 120}
            ], // 操作列
            ruleForm: {
                storeName: '',
                storeSn: '',
                masterName: '',
                masterPhone: '',
                storeAddress: '',
                merchantBankList: [],
                merchantStoreExtPaytype: '', // 方式
                collectionCode: '', // 二维码
                wxMchId: '', // appid
                wxMchPartnerKey: '', // AppSecret
                wxMchCertPath: '', // 证书文件
                storeCertificate: '',
                storePermit: '',
                bankName: '',
                bankAccount: ''
            },
            payMethods: [],
            storeId: '',
            // payMethod: {

            // },

            rules: {
                storeName: [{required: true, message: '请输入商家名称', trigger: 'blur'}],
                storeSn: [{required: true, message: '请输入商家代码', trigger: 'blur'}],
                masterName: [{required: true, message: '请输入店长姓名', trigger: 'blur'}],
                masterPhone: [{required: true, message: '请输入店长电话', trigger: 'blur'}],
                storeAddress: [{required: true, message: '请输入商家地址', trigger: 'blur'}],
                storeCertificateNum: [{required: true, message: '请输入营业执照号', trigger: 'blur'}]
            },
            dialogVisible: false,
            account: {
                bankAccount: '',
                bank: '',
                bankName: '',
                bankType: '',
                bankTypeValue: '',
                index:''
            },
            accountRules: {
                bankAccount: [{required: true, message: '请输入收款账户', trigger: 'blur'}],
                bank: [{required: true, message: '请输入收款银行', trigger: 'blur'}],
                bankName: [{required: true, message: '请输入收款人', trigger: 'blur'}]
            },
            bankOptions: [],
            bankTypeList: [
                {
                    value: '1',
                    label: '对公账户'
                },
                {
                    value: '2',
                    label: '对私账户'
                }
            ],
            editWay: false // 是否编辑
        }
    },
    created() {
        this.detail()
        this.getBankOptionsData()
    },
    methods: {
        // 上传文件
        handleAvatarSuccess(res) {
            this.ruleForm.collectionCode = res.data.link // URL.createObjectURL(file.raw)
        },

        handleAvatarSuccessStore(res) {
            this.ruleForm.storePermit = res.data.link // URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 9
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 9MB!')
            }
            return isIMAGE && isLt2M
        },
        onSubmit() {
            console.log('submit!')
        },
        accountAdd() {
            debugger
            let randomNumber = this.getProjectNum();
            let list = this.ruleForm.merchantBankList
            if (list.length == 0) {
                constructor(this.account,randomNumber)
            } else {
                if (this.editWay) {
                    //银行类型唯一性校验
                    if (this.account.bankType == 1) {
                        for (let h = 0;h < list.length;h++) {
                            if (list[h].bankType == 1) {
                                if((this.account.id == list[h].id&&this.account.id)||(this.account.index==list[h].index&&this.account.index)){
                                    break;
                                }
                                this.$message({
                                    message: '只能添加一个公户',
                                    type: 'error'
                                })
                                this.dialogVisible = false
                                return false
                            }
                        }
                    }
                    //收款账号唯一性校验
                    for (let b = 0;b < list.length;b++) {
                        if(list[b].bankAccount == this.account.bankAccount){
                            if((this.account.id == list[b].id&&this.account.id)||(this.account.index==list[b].index&&this.account.index)){
                                break;
                            }
                            this.$message({
                                message: '收款账号不能重复',
                                type: 'error'
                            })
                            this.dialogVisible = false
                            return false
                        }
                    }

                    for (let r = 0;r < list.length;r++) {
                        if (this.account.id == list[r].id&&this.account.id) {
                            list.splice(r, 1, this.account)
                        }else if(this.account.index&&list[r].index){
                            if(this.account.index == list[r].index){
                                list.splice(r, 1, this.account)
                            }
                        }
                    }
                } else {
                    for (let j = 0;j < list.length;j++) {
                        if (list[j].bankAccount == this.account.bankAccount) {
                            this.$message({
                                message: '收款账号不能重复',
                                type: 'error'
                            });
                            this.dialogVisible = false
                            return false
                        }
                    }
                    if (this.account.bankType == 1) {
                        for (let i = 0;i < list.length;i++) {
                            if (list[i].bankType == 1) {
                                this.$message({
                                    message: '只能添加一个公户',
                                    type: 'error'
                                });
                                this.dialogVisible = false
                                return false
                            }
                        }
                        constructor(this.account,randomNumber)
                    } else {
                        constructor(this.account,randomNumber)
                    }
                }
            }

            this.dialogVisible = false

            function constructor(obj,randomNumber) {
                if(!obj.id){
                    obj.index = randomNumber;
                }
                list.push({
                    bankAccount: obj.bankAccount,
                    bank: obj.bank,
                    bankName: obj.bankName,
                    bankType: obj.bankType,
                    bankTypeValue: obj.bankTypeValue,
                    index: obj.index,
                })
            }
        },
        addHandle(){
            this.dialogVisible = true;
            this.editWay = false;
            this.account = new Object();
            console.log(this.getProjectNum());
        },
        previewSend(row) {
            this.account = {...row}
            this.dialogVisible = true
            this.editWay = true
        },
        removeBankRow(row){
            console.log(row);
            this.$confirm('此操作将删除当前收款账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let list = this.ruleForm.merchantBankList;
                for (let i = 0;i < list.length;i++) {
                    if (row.id == list[i].id&&row.id) {
                        list.splice(i, 1)
                    }else if(row.index&&list[i].index){
                        if(row.index == list[i].index){
                            list.splice(i, 1)
                        }
                    }
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getProjectNum () {
            const projectTime = new Date() // 当前中国标准时间
            const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
            const Month = projectTime.getMonth() + 1 // 获取中国区月份
            const Day = projectTime.getDate() // 获取几号
            var CurrentDate = Year
            var hour = projectTime.getHours();
            var minute = projectTime.getMinutes();
            var second = projectTime.getSeconds();
            var milliseconds = projectTime.getMilliseconds();
            if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
                CurrentDate += Month
            } else {
                CurrentDate += '0' + Month
            }
            if (Day >= 10) {
                CurrentDate += Day
            } else {
                CurrentDate += '0' + Day
            }
            CurrentDate += hour
            CurrentDate += minute
            CurrentDate += second
            CurrentDate += milliseconds
            return CurrentDate
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.update()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        detail() {
            let param = {
                isInner: 1
            }
            this.$get(this.$api.shop.detail, param).then(data => {
                if (data && data.code === 200) {
                    this.storeId = data.data.storeId
                    let da = {
                        storeId: this.storeId
                    }
                    this.$get(this.$api.shop.collectionDetail, da).then(data => {
                        if (data && data.code === 200) {
                            data.data.merchantBankList.forEach((item)=>{
                                if (item.bankType == 1) {
                                    item.bankTypeValue = '对公账户'
                                } else if(item.bankType == 2){
                                    item.bankTypeValue = '对私账户'
                                }
                            })
                            this.ruleForm = data.data
                            this.payMethods = this.ruleForm.merchantStoreExtPaytype.split(',')
                        }
                    })
                }
            })
        },
        update() {


            let payType=this.payMethods.join(',')

            this.ruleForm.merchantStoreExtPaytype = payType
            if(payType[2]==1){
                debugger
                if (this.ruleForm.collectionCode === '') {
                    this.$message('请上传收款二维码')
                    return
                }
            }

            this.loading = true
            this.ruleForm.storeId = this.storeId
            this.$post(this.$api.shop.updateStoreCollection, this.ruleForm).then(data => {
                if (data && data.code === 200) {
                    this.loading = false
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    })
                } else {
                    this.loading = false
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    })
                }
            })
        },
        handleClose(done) {this.dialogVisible = false},
        // 获取银行字典
        async getBankOptionsData() {
            let {data, code} = await this.$get('/sino-dst/dict/dictionary?code=due_bank')
            if (code === 200) {
                this.bankOptions = data
            }
        },
        getBankTypeValue(e) {
            if (e == "对公账户") {
                this.account.bankType = 1
            } else {
                this.account.bankType = 2
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
// 上传文件
.up-file {
    display: flex;
    justify-content: center;
    padding-top: 0.24rem;
}
.avatar-uploader /deep/ .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar {
    width: 1.84rem;
    height: 1.64rem;
    margin-left: 0.8rem;
}
.up {
    width: 1.84rem;
    height: 1.64rem;
    background-image: url('../../../assets/images/shopInit/271.png');
    background-size: 100%;
    margin-left: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-img {
    width: 1.16rem;
    height: 0.93rem;
    background-image: url('../../../assets/images/shopInit/tupian@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
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

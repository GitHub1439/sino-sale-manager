<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card" style="height: 61px">
                <button class="me-back" @click="toBack">
                    <icon-svg name="shangyibu"></icon-svg><span> 返 回</span>
                </button>
                <div class="btnlist" style="float: right">
                    <button @click="savePro">
                        <icon-svg name="baocun"></icon-svg><span>保存</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="tabs-main baseinfo">
            <div class="basic-info">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <div class="title-w">
                        <icon-svg
                            name="bianji"
                            style="font-size: 22px; margin-left: 16px"
                        ></icon-svg>
                        <i class="title">基本信息：</i>
                    </div>
                    <div class="me-row-content">
                        <el-form-item
                            label="产品名称"
                            prop="productName"
                            class="me-row-item-clear"
                        >
                            <el-input v-model="ruleForm.productName"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="产品ID"
                            prop="productID"
                            class="me-row-item-clear"
                            v-if="dataType == 1"
                        >
                            <el-input v-model="ruleForm.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item
                            label="产品编码"
                            prop="productSn"
                            class="me-row-item"
                        >
                            <el-input v-model="ruleForm.productSn">
                                <template slot="append">
                                    <span title="产品的编码建议与ERP中SUK一致"
                                        >说明</span
                                    >
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="厂商编码" class="me-row-item">
                            <el-input
                                v-model="ruleForm.factoryProductSn"
                                disabled
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            label="产品类目"
                            prop="categoryId"
                            class="me-row-item"
                        >
                            <el-select
                                v-model="ruleForm.categoryId"
                                placeholder="产品类目"
                                clearable
                            >
                                <el-option
                                    v-for="item in doctorList1"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    v-if="item.sort != 1 && item.sort != 2"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="厂商分类" class="me-row-item">
                            <el-input
                                v-model="ruleForm.factoryProductCategoryName"
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="商品类型"
                            prop="productType"
                            class="me-row-item"
                        >
                            <el-select v-model="ruleForm.productType" clearable>
                                <el-option label="商品" :value="0"></el-option>
                                <el-option label="赠品" :value="1"></el-option>
                                <el-option
                                    label="商品&赠品"
                                    :value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="所属品牌"
                            prop="factoryName"
                            class="me-row-item"
                        >
                            <el-select
                                v-model="ruleForm.factoryId"
                                placeholder="请选择"
                                :disabled="ruleForm.factoryId==1"
                            >
                                <el-option
                                    v-for="item in brandOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                            <!-- <el-input v-model='ruleForm.factoryName' disabled></el-input> -->
                        </el-form-item>
                        <el-form-item
                            label="产品型号"
                            prop="productModel"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="ruleForm.productModel"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="产品单位"
                            prop="unit"
                            class="me-row-item"
                        >
                            <el-input v-model="ruleForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="产品重量"
                            prop="weight"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="
                                    ruleForm.weight < 0 ? 1 : ruleForm.weight
                                "
                                type="number"
                            >
                                <template slot="append"> 克 </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="是否热销" class="me-row-item">
                            <el-select v-model="ruleForm.hotSale" clearable>
                                <el-option label="否" :value="0"></el-option>
                                <el-option label="是" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="库存数量"
                            prop="productSku"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="ruleForm.productSku"
                                type="number"
                            >
                                <template slot="append">
                                    <span title="商品剩余库存，小于0时不能下单"
                                        >说明</span
                                    >
                                </template>
                            </el-input>
                        </el-form-item>
                        <!--<el-form-item label='安全库存' prop='productSkuWarn' class='me-row-item'>-->
                        <!--<el-input v-model='ruleForm.productSkuWarn' type="number"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item
                            label="最少购买"
                            prop="minPurchase"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="ruleForm.minPurchase"
                                type="number"
                            >
                                <template slot="append">
                                    <span title="商品的最小购买量">说明</span>
                                </template>
                            </el-input>
                        </el-form-item>

                            <el-form-item
                            label="零售价格"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="ruleForm.retailPrice"
                                type="number"
                            >
                                <template slot="append"> 元 </template>
                            </el-input>
                        </el-form-item>

                            <el-form-item
                            label="标准价格"
                            prop="standardPrice"
                            class="me-row-item"
                        >
                            <el-input
                                v-model="ruleForm.standardPrice"
                                type="number"
                            >
                                <template slot="append"> 元 </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            label="递增数量"
                            prop="minStep"
                            class="me-row-item"
                        >
                            <el-input v-model="ruleForm.minStep" type="number">
                                <template slot="append">
                                    <span title="指在购物车每次增加的最小数量。"
                                        >说明</span
                                    >
                                </template>
                            </el-input>
                        </el-form-item>
                    
                        <el-form-item
                            label="销售范围"
                            prop="checkAll"
                            class="me-row-item-clear"
                        >
                            <div style="width: 100%" class="select-frant">
                                <label
                                    v-for="city in optOptions"
                                    @click="setCkVal(city)"
                                    :class="[
                                        isIndex(city.dictKey) ? 'cur' : ''
                                    ]"
                                    >{{ city.dictValue }}</label
                                >
                                <!--<el-checkbox v-for="city in optOptions" :label="city" :key="city.dictKey" :checked="" @change="setCkVal(city)">{{city.dictValue}}</el-checkbox>-->
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="产品描述"
                            prop="productDesc"
                            class="me-row-item-clear"
                        >
                            <el-input
                                v-model="ruleForm.productDesc"
                                type="textarea"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div class="title-w">
                        <icon-svg
                            name="bianji"
                            style="font-size: 22px; margin-left: 16px"
                        ></icon-svg>
                        <i class="title"
                            >产品图片：<span
                                style="
                                    font-size: 14px;
                                    font-weight: normal;
                                    color: #ff7944;
                                "
                                >第一个图为产品主图，产品副图<6张，图片比例1：1</span
                            ></i
                        >
                    </div>
                    <div class="up-file">
                        <div>
                            <el-upload
                                :limit="6"
                                list-type="picture-card"
                                :headers="headers"
                                :action="action"
                                :on-remove="onMedicalInfoImg"
                                :on-change="onMedicalInfoImg"
                                :before-upload="onBeforeUploadImage"
                                :file-list="medicalInfoPhotoList"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="title-w">
                        <icon-svg
                            name="bianji"
                            style="font-size: 22px; margin-left: 16px"
                        ></icon-svg>
                        <i class="title">产品详细：</i>
                    </div>
                    <div class="kind-wrap bgff">
                        <div class="kind-wrap bgff">
                            <kind-editor
                                ref="kindeditor"
                                :content="content"
                                @input="getContent"
                            ></kind-editor>
                        </div>
                    </div>
                    <!--<el-form-item>-->
                    <!--<el-button-->
                    <!--type="primary"-->
                    <!--@click="savePro"-->
                    <!--&gt;-->
                    <!--保存-->
                    <!--</el-button>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import basicInfo from './basicInfo'
import detailList from './detail-list'
import KindEditor from '@/components/kindeditor'

export default {
    components: {
        basicInfo,
        detailList,
        KindEditor
    },
    props: {
        changeShowIndex: Function,
        id: {
            type: String,
            default: ''
        },
        dataType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            brandOptions: [],
            checkAll: '1,2,3,4,5,6,7,8,9,',
            posid: this.id,
            medicalInfoPhotoList: [],
            action:
                window.SITE_CONFIG.baseUrl +
                '/sino-resource/oss/endpoint/put-file',
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            tempstatus: '',
            checkedOptions: '[]',
            isIndeterminate: true,
            optOptions: [
                {
                    id: '1',
                    text: '药房门店'
                },
                {
                    id: '2',
                    text: '基层医疗'
                },
                {
                    id: '3',
                    text: '二批商'
                }
            ],
            doctorList1: [],
            content: '',
            ruleForm: {
                albumPics:[],
                factoryId:'',
                albumPics: [],
                productName: '',
                gift: '1',
                productSku: '0',
                minPurchase: '1',
                minStep: '1',
                standardPrice: '0',
                retailPrice:'',
                weight: 0
            },
            rules: {
                productName: [
                    {required: true, message: '请输入产品名', trigger: 'blur'},
                    {
                        min: 3,
                        max: 50,
                        message: '长度在 3 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                productSn: [
                    {message: '请输入产品编码', trigger: 'blur'},
                    {
                        min: 5,
                        max: 20,
                        message: '长度在 5 到 20 个字符',
                        trigger: 'blur'
                    }
                ],

                minStep: [
                    {required: true, message: '请输入', trigger: 'blur'},
                    {
                        message: '请输入大于0整数',
                        trigger: 'blur',
                        pattern: /^\+?[1-9]\d*$/
                    }
                ],
                categoryId: [
                    {required: true, message: '请输入', trigger: 'blur'}
                ],
                minPurchase: [
                    {
                        required: true,
                        message: '请输入最少购买',
                        trigger: 'blur'
                    },
                    {
                        message: '请输入大于0整数',
                        trigger: 'blur',
                        pattern: /^\+?[1-9]\d*$/
                    }
                ],
                productSku: [
                    {
                        required: true,
                        message: '请输入库存数量',
                        trigger: 'blur'
                    },
                    {
                        message: '请输入大于0整数',
                        trigger: 'blur',
                        pattern: /^\+?[1-9]\d*$/
                    }
                ],
                standardPrice: [
                    {
                        required: true,
                        message: '请输入标准价格',
                        trigger: 'blur'
                    },
                    {
                        message: '请输入2位小数金额',
                        trigger: 'blur',
                        pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/
                    }
                ],
                unit: [
                    {
                        required: true,
                        message: '请输入产品单位',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 10,
                        message: '长度在 1 到10位',
                        trigger: 'blur'
                    }
                ],
                productType: [
                    {required: true, message: '请输入商品类型', trigger: 'blur'}
                ],
                // weight: [
                //     {
                //         message: '请输入2位小数',
                //         trigger: 'blur',
                //         pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/
                //     }
                // ]
            },
            dialogVisible: false,
            recipeDialogVisible: false,
            valueTime: '',
            orderId: '',
            activeName: '0',
            orderStatus: null
        }
    },
    created() {
        this.getDoctorList1()
        this.initDict()
         // 查询所有品牌
        this.brandList()
        // 修改
        if (this.dataType == 1) {
            this.getDetail()

        }
    },
    mounted() {},
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
        toBack() {
            this.changeShowIndex('0')
        },
        setCkVal(item) {
            let temp = this.checkAll
            let index = temp.indexOf(item.dictKey)
            console.log('走我了吗1:' + this.checkAll)
            if (index > -1) {
                let rep = temp.replace(item.dictKey + ',', '')

                this.checkAll = rep
            } else {
                this.checkAll += item.dictKey + ','
            }
            console.log('走我了吗:' + this.checkAll)
        },
        isIndex(item) {
            if (item != null) {
                console.log('1111:id' + item)
                let temp = this.checkAll
                let index = temp.indexOf(item)

                if (index > -1) {
                    return true
                }
                return false
            }
        },
        async initDict() {
            let {data, code} = await this.$get(
                this.$api.extra.dictionary + '?code=customer_type'
            )
            if (code === 200) {
                this.optOptions = data
            }
        },
        async getDoctorList1() {
            let res = await this.$get(this.$api.product.proCategorys, null)
            if (res && res.code === 200) {
                let data = res.data

                this.doctorList1 = data
            }
        },
        search() {
            this.getAuditList()
        },
        // 获取编辑器内容
        getContent(content) {
            console.log(content)
            this.content = content
        },
        // 就诊信息图片
        onMedicalInfoImg(file, fileList) {
            this.medicalInfoPhotoList = fileList
            console.log(this.medicalInfoPhotoList)
        },
        uploadImage() {},
        onBeforeUploadImage(file) {
            console.log('before', this.ruleForm)
            const isIMAGE =
                file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2
            let val = this.ruleForm.albumPics.length > 5
            const counts = val < 6

            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 2MB!')
            }
            if (val > 5) {
                this.$message.error('上传图不能超过5个!')
            }
            return isIMAGE && isLt2M && counts
        },
        handlePhotoList(list) {
            let photoArr = []
            for (let i of list) {
                if (i.url.indexOf('blob') === -1) {
                    photoArr.push(i.url)
                } else {
                    photoArr.push(i.response.data.link)
                }
            }
            return photoArr.join(',')
        },
        initPhotoList(str) {
            if (!str) {
                return []
            }
            let photoArr = []
            let arr = str.split(',')
            arr.forEach((item) => {
                let obj = {}
                obj.url = item
                photoArr.push(obj)
            })
            return photoArr
        },
        async getDetail() {
            let pid = this.posid
            let par = '?id=' + pid
            let data = await this.$get(this.$api.product.detail + par, null)
            if (data && data.code === 200) {
                let tempData = data.data
                this.ruleForm = tempData
                this.content = this.ruleForm.detailHtml
                this.tempstatus = this.ruleForm.status
                let autoVal = this.ruleForm.customerScopes
                let temp = autoVal.split('')
                this.checkAll =
                    temp[temp.length - 1] != ',' ? autoVal + ',' : autoVal
                this.medicalInfoPhotoList = this.initPhotoList(
                    tempData.albumPics
                )
            } else {
                this.$message.error(data.msg)
            }
        },
        async savePro() {
            let that = this;
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let pid = this.posid
                    this.ruleForm.id = pid

                    if (that.ruleForm.factoryId) {
                        let factoryObj = that.brandOptions.find((v) => {
                            return v.id == that.ruleForm.factoryId
                        })
                        this.ruleForm.factoryName = factoryObj.name
                    }

                    this.ruleForm.detailHtml = this.content
                    let piclist = this.handlePhotoList(
                        this.medicalInfoPhotoList
                    )
                    this.ruleForm.albumPics = piclist
                    this.ruleForm.customerScopes = this.checkAll
                    this.ruleForm.productPic =
                        this.ruleForm.albumPics.indexOf(',') > 0
                            ? piclist.split(',')[0]
                            : this.ruleForm.albumPics
                    let data = await this.$post(
                        pid == 0
                            ? this.$api.product.saveProduct
                            : this.$api.product.update,
                        this.ruleForm
                    )
                    if (data && data.code === 200) {
                        debugger
                        this.changeShowIndex('0')
                        this.$message({
                            message: '保存成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                /*  */
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        openRecipeDialog() {
            this.recipeDialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs-main {
    background: $white;
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
}
.baseinfo {
}
.form-wrap {
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
    cursor: pointer;
}

.btnlist button {
    margin: 3px;
    //padding: 8px 12px;
    letter-spacing: 4px;
}
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
    font-size: 0.25rem;
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

// 上传文件
.up-file {
    display: flex;
    justify-content: left;
    padding-left: 50px;
    padding-top: 0.24rem;
    padding-bottom: 30px;
}
.avatar-uploader /deep/ .el-upload {
    // border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar {
    width: 2.08rem;
    height: 2.08rem;
}
.avatar-img {
    width: 1.16rem;
    height: 0.93rem;
    background-image: url('../../../../assets/images/shopInit/tupian@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
}
.avatar-uploader .el-upload:hover {
    border-color: #ff3f6b;
}
.select-frant label {
    width: 100px;
    height: 30px;
    margin-top: 6px;
    line-height: 22px;
    display: block;
    float: left;
    border-radius: 4px;
    margin-right: 10px;
    background: #dedede;
    padding: 6px 28px 6px 10px;
}
.select-frant .cur {
    color: #fff;
    background: url(../../../../assets/images/shopInit/gou2.png) no-repeat right
        center #ff4d04;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.te {
    font-size: 26px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 19px;
    color: #a1a0a1;
    text-align: center;
    margin-left: 0.8rem;
    margin-top: 0.1rem;
    margin-bottom: 20px;
}
.paytype {
    padding-bottom: 20px;
}
</style>

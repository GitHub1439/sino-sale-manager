<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card" style="height: 61px;">
                <button class='me-back' @click='toBack'><icon-svg name="shangyibu"></icon-svg><span> 返 回</span></button>
                <div class="btnlist" style="float: right;">
                    <button @click="savePro"><icon-svg name="baocun"></icon-svg><span>保存</span></button>
                </div>
            </div>
        </div>
        <div class="tabs-main baseinfo">
            <div class='basic-info'>


            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px' class='demo-ruleForm'>
                <div class='title-w'>
                    <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                    <i class='title'>基本信息：</i>
                </div>
                <div class='me-row-content'>
                    <el-form-item label='产品名称' prop='productName' class='me-row-item-clear'>
                        <el-input v-model='ruleForm.productName'></el-input>
                    </el-form-item>
                    <el-form-item label='产品编码' prop='productSn' class='me-row-item'>
                        <el-input v-model='ruleForm.productSn'></el-input>
                    </el-form-item>
                    <el-form-item label='产品类目' prop='productCategoryName' class='me-row-item'>
                        <el-select v-model="ruleForm.productCategoryId" placeholder="产品类目" clearable @change="handleChange">
                            <el-option
                                v-for="item in doctorList1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='产品型号' prop='productModel' class='me-row-item'>
                        <el-input v-model='ruleForm.productModel'></el-input>
                    </el-form-item>
                    <el-form-item label='商品类型' prop='productType' class='me-row-item'>
                        <el-select v-model="ruleForm.productType" clearable>
                            <el-option label="商品" :value="0"></el-option>
                            <el-option label="赠品" :value="1"></el-option>
                            <el-option label="商品&赠品" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='产品单位' prop='unit' class='me-row-item'>
                        <el-input v-model='ruleForm.unit'></el-input>
                    </el-form-item>
                    <el-form-item label='产品重量' prop='weight' class='me-row-item'>
                        <el-input v-model='ruleForm.weight' type="number">
                            <template slot="append">
                                克
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label='产品描述' prop="productDesc" class='me-row-item-clear'>
                        <el-input v-model='ruleForm.productDesc' type="textarea"></el-input>
                    </el-form-item>
                </div>
                <div class='title-w'>
                    <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                    <i class='title'>产品图片：<span style="font-size: 14px;font-weight: normal; color: #FF7944">第一个图为产品主图，产品副图<6张，图片比例1：1</span></i>
                </div>
                <div class="up-file">
                    <div>
                        <el-upload
                            :limit="5"
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
                <div class='title-w'>
                    <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                    <i class='title'>产品详细：</i>
                </div>
                <div class="kind-wrap bgff">
                    <div class="kind-wrap bgff">
                        <kind-editor ref="kindeditor" :content="content" @input="getContent"></kind-editor>
                    </div>
                </div>
            </el-form>

            </div>
        </div>
    </div>
</template>

<script>
import detailList from './detail-list'
import KindEditor from '@/components/kindeditor'

export default {
    components: {
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
        },
    },
    data() {
        return {
            posid:this.id,
            medicalInfoPhotoList: [],
            action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            tempstatus:'',
            doctorList1: [],
            content: '',
            protypeName:'',
            ruleForm: {
                productName: '',
                gift: '1'
            },
            rules: {
                productName: [
                    {required: true, message: '请输入产品名', trigger: 'blur'},
                    {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                ],
                productSn: [
                    {required: true, message: '请输入产品编码', trigger: 'blur'},
                    {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
                ],
                standardPrice: [
                    {required: true, message: '请输入产品价格', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在 1 到10位', trigger: 'blur'}
                ],
                productModel: [
                    {required: true, message: '请输入产品型号', trigger: 'blur'},
                    {min: 1, max: 20, message: '长度在 1 到20位', trigger: 'blur'}
                ],
                unit: [
                    {required: true, message: '请输入产品单位', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在 1 到10位', trigger: 'blur'}
                ],
                productType: [
                    {required: true, message: '请输入商品类型', trigger: 'blur'}
                ],
                weight: [
                    {required: true, message: '请输入产品重量', trigger: 'blur'},
                ],
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
        //修改
        if(this.dataType==1){
            this.getDetail()

        }
    },
    mounted() {

    },
    methods: {
        toBack() {
            this.changeShowIndex('0');
        },
        async getDoctorList1() {
            let res = await this.$get(this.$api.factoryProduct.SpecList, null)
            if (res && res.code === 200) {
                let data=res.data
                this.doctorList1 = data.records
            }
        },
        handleChange(val){
            //传进来的val是select组件选中的value值，也就是一个fruitEnName
            var obj = {}
            obj = this.doctorList1.find(function(item){
                return item.id === val
            })
            //obj 就是被选中的那个对象，也就能拿到label值了。
            this.protypeName=obj.name
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
        uploadImage(){
        },
        onBeforeUploadImage(file) {
            const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 1MB!')
            }
            return isIMAGE && isLt2M
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
            if (!str) {return [] }
            let photoArr = []
            let arr = str.split(',')
            arr.forEach(item => {
                let obj = {}
                obj.url = item
                photoArr.push(obj)
            })
            return photoArr
        },
        async getDetail() {
            let pid=this.posid
            let par ="?id="+pid
            let data = await this.$get(this.$api.factoryProduct.detail+par,null)
            if (data && data.code === 200) {
                if(data.data){
                    let tempData=data.data
                    this.ruleForm=tempData
                    this.content=this.ruleForm.detailHtml
                    this.tempstatus=this.ruleForm.status
                    this.protypeName=tempData.productCategoryName
                    this.medicalInfoPhotoList = this.initPhotoList(tempData.albumPics)
                }else {
                    this.$message({
                        message: '客户不存在',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {/*  */}
                    })
                }


            } else {
                this.$message.error(data.msg)
            }
        },
        async savePro(){
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let pid=this.posid
                    let saveType=this.dataType
                    if(saveType=='1'){
                        this.ruleForm.id=pid
                    }
                    this.ruleForm.detailHtml=this.content //编辑器详细内容
                    let piclist=this.handlePhotoList(this.medicalInfoPhotoList)
                    this.ruleForm.albumPics= piclist //副图
                    this.ruleForm.productCategoryName=this.protypeName //分类名称

                    this.ruleForm.productPic= this.ruleForm.albumPics.indexOf(',')>0 ? piclist.split(",")[0]: this.ruleForm.albumPics // 截取副图第一个当主图
                    if(piclist===''){

                        this.$message({
                            message: '商品图片需要上传',
                            type: 'info',
                            duration: 1500,
                            onClose: () => {/*  */}
                        })
                        return
                    }
                    if(this.ruleForm.detailHtml===''){

                        this.$message({
                            message: '商品详细需要上传',
                            type: 'info',
                            duration: 1500,
                            onClose: () => {/*  */}
                        })
                        return
                    }
                    let data = await this.$post(this.$api.factoryProduct.addPro ,this.ruleForm)
                    if (data && data.code === 200) {
                        if(data.data){
                            this.changeShowIndex('0');
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {/*  */}
                            })
                        }else {
                            this.$message({
                                message: '客户不存在',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {/*  */}
                            })
                        }


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
    .basic-info {
        width: 60%;
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
        padding-bottom:30px;
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
    .paytype{

        padding-bottom: 20px;
    }
</style>

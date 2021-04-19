<template>
    <div class="basic-info">
        <el-form :model="productData"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="title-w·">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; "></icon-svg>
                <i class="title">产品主图(1张)：</i>
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
                        <img v-if="productData.productPic" :src="productData.productPic" class="avatar">
                        <div v-else class="up">
                            <div class="avatar-img"></div>
                        </div>
                    </el-upload>

                </div>
            </div>

            <div class="title-w·" style="margin-top: 20px">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; "></icon-svg>
                <i class="title">产品副图(<6张)：</i>
            </div>

            <el-upload

            :action="action"
            list-type="picture-card"
            :limit='9'
            :file-list="fileList"
            :headers="headers"
            :on-success="handleAvatarSuccess2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" style="margin-top: 20px">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <div class="title-w·" style="margin-top: 20px">
                <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; "></icon-svg>
                <i class="title">产品文案：</i>
            </div>

            <div style="margin-top: 10px">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 6
                    , maxRows: 8}"
                    placeholder="请输入内容"
                    v-model="productData.detailHtml">
                </el-input>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},

        props:{
            productData:Object
        },
        data() {
            return {
                // 上传文件
                action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
                headers: {
                    'Sino-Auth': localStorage.getItem('Sino-Auth')
                },
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
            }
        },
        created() {
            let pic = this.productData.albumPics
            if(pic != undefined){
            let picArr = pic.split(",");
            for (let i = 0; i < picArr.length; i++) {
                let obj = {
                    url:picArr[i]
                }
                this.fileList.push(obj)
            }
            }

        },
        methods: {

            handleRemove(file, fileList) {
                let picStr = ""
                for (let i = 0; i < fileList.length; i++) {
                    picStr += this.fileList[i].url + ","
                }
                if (picStr.length > 0) {
                    picStr = picStr.substr(0, picStr.length - 1)
                }
                this.productData.albumPics = picStr
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            // 上传文件
            handleAvatarSuccess(res) {
                this.productData.productPic = res.data.link // URL.createObjectURL(file.raw)
            },
            handleAvatarSuccess2(res) {
                if (res.code === 200){
                    let picStr = ""
                    this.fileList.push({url:res.data.link})
                    for (let i = 0; i < this.fileList.length; i++) {
                        picStr += this.fileList[i].url + ","
                    }
                    if (picStr.length > 0) {
                        picStr = picStr.substr(0, picStr.length - 1)
                    }
                    this.productData.albumPics = picStr
                }else {
                    console.log("上传失败")
                }


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
            submitForm(formName) {
                let flag = null
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        flag = true
                    } else {
                        flag = false
                    }
                })
                return flag
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            detail() {
                let param = {}
                this.$get(this.$api.shop.detail, param).then(data => {
                    if (data && data.code === 200) {
                        this.ruleForm = data.data
                    }
                })
            },

        }
    }
</script>

<style lang='scss' scoped>
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
        font-size: 0.18rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        margin-left: 17px;
        color: #333333;
    }

    // 上传文件
    .up-file {
        display: flex;
        //justify-content: center;
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
        background-image: url("../../../../assets/images/shopInit/271.png");
        background-size: 100%;
        //margin-left: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .avatar-img {
        width: 1.16rem;
        height: 0.93rem;
        background-image: url('../../../../assets/images/shopInit/tupian@2x.png');
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #FF3F6B;
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
        color: #E40137;
        line-height: 0.3rem;
    }

    .te {
        font-size: 0.14rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 19px;
        color: #A1A0A1;
        text-align: center;
        margin-left: 0.8rem;
        margin-top: 0.1rem;
        margin-bottom: 20px;
    }

    .zi-zhi {
        font-size: 0.14rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #A1A0A1;
        // margin-top: 0.24rem;
    }
</style>

<template>
  <div class="basic-info">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="title-w">
        <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; " ></icon-svg>
        <i class="title">基本信息：</i>
      </div>
        <el-row>
            <el-col span="15">
                <el-form-item label="商家名称" prop="storeName">
                    <el-input v-model="ruleForm.storeName"></el-input>
                </el-form-item>
                <el-form-item label="商家代码" prop="storeSn">
                    <el-input v-model="ruleForm.storeSn"></el-input>
                </el-form-item>
                <el-form-item label="店长姓名" prop="masterName">
                    <el-input v-model="ruleForm.masterName"></el-input>
                </el-form-item>
                <el-form-item label="店长电话" prop="masterPhone">
                    <el-input v-model="ruleForm.masterPhone"></el-input>
                </el-form-item>
                <el-form-item label="商家地址" prop="storeAddress">
                    <el-input v-model="ruleForm.storeAddress"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="8" style="text-align: center">
                <el-upload
                    :limit="1"
                    class="avatar-uploader"
                    :headers="headers"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessLogo"
                    :before-upload="beforeAvatarUpload"

                >
                    <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                    <div v-else class="up">
                        <div class="avatar-img"></div>
                    </div>
                </el-upload>
                <div class="te"><i class="red">*</i>店铺logo</div>
            </el-col>
        </el-row>
      <div class="title-w">
        <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; " ></icon-svg>
        <i class="title">资质信息:</i>
      </div>
      <el-form-item label="营业执照号" prop="storeCertificateNum">
        <el-input v-model="ruleForm.storeCertificateNum"></el-input>
      </el-form-item>



      <div class="zi-zhi"><i class="red">*</i>经营资质扫描件</div>
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
            <img v-if="ruleForm.storeCertificate" :src="ruleForm.storeCertificate" class="avatar">
            <div v-else class="up">
              <div class="avatar-img"></div>
            </div>
          </el-upload>
          <div class="te">营业执照副本</div>
        </div>

        <!-- <div>
          <el-upload
              :limit="1"
              class="avatar-uploader"
              :headers="headers"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccessStore"
              :before-upload="beforeAvatarUpload"

          >
            <img v-if="ruleForm.storePermit" :src="ruleForm.storePermit" class="avatar">
            <div v-else class="up">
              <div class="avatar-img"></div>
            </div>
          </el-upload>
          <div class="te">医疗器械资质</div>
        </div> -->
      </div>

      <div class='zi-zhi'><i class='red'>*</i>医疗器械资质</div>
                    <div class='up-file' style="margin-bottom:20px;">

                           <el-upload
                                :limit='6'
                                list-type="picture-card"
                                class='avatar-uploader'
                                :headers='headers'
                                :action='action'
                                :file-list="fileList"
                                :on-remove="handleRemove"
                                :on-success='handleAvatarSuccessStore'
                                :before-upload='beforeAvatarUpload'
                            >
                               <i class="el-icon-plus"></i>
                            </el-upload>

                    </div>

      <div class="title-w">
        <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; " ></icon-svg>
        <i class="title">参数信息：</i>
      </div>
      <el-form-item label="店铺公告" prop="notice">
        <el-input type='textarea' v-model='ruleForm.notice'></el-input>
      </el-form-item>
      <el-form-item label="店铺标签" prop="dynamicTags">
        <div class='switch-list'>
            <el-tag
                :key='tag'
                v-for='tag in dynamicTags'
                closable
                :disable-transitions='false'
                @close='handleClose(tag)'>
                {{ tag }}
            </el-tag>
            <el-input
                class='input-new-tag'
                v-if='inputVisible'
                v-model='inputValue'
                ref='saveTagInput'
                size='small'
                @keyup.enter.native='handleInputConfirm'
                @blur='handleInputConfirm'
            >
            </el-input>
            <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ 新增</el-button>
        </div>
      </el-form-item>

        <div class="title-w">
            <icon-svg name="bianji" style="font-size: 22px; margin-left: 16px; " ></icon-svg>
            <i class="title">通知设置：</i>
        </div>
        <el-form-item label="客户通知手机" >
            <el-input v-model="ruleForm.accountManagerPhone"></el-input>
        </el-form-item>
        <el-form-item label="订单通知手机" >
            <el-input v-model="ruleForm.orderManagerPhone"></el-input>
        </el-form-item>
      <el-form-item>
        <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'',
  components: {

  },
  data () {
    return {
      // 上传文件
      action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
      headers: {
        'Sino-Auth': localStorage.getItem('Sino-Auth')
      },
      fileList: [],
      ruleForm: {
        storeName: '',
        storeSn: '',
        masterName: '',
        masterPhone: '',
        storeAddress: '',
        storeCertificateNum: '',
        storeCertificate: '',
        storePermit: '',
        bankName: '',
          accountManagerPhone:'',
          orderManagerPhone:'',
        bankAccount: '',
          customerSecondCertificate:'',
        id: '',
        notice: '', // 店铺公告
        logo: '' // 店铺logo
      },
      dynamicTags: [], // 标签
      inputVisible: false,
      inputValue: '',
      rules: {
        storeName: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
        ],
        storeSn: [
          { required: true, message: '请输入商家代码', trigger: 'blur' },
        ],
        masterName: [
          { required: true, message: '请输入店长姓名', trigger: 'blur' },
        ],
        masterPhone: [
          { required: true, message: '请输入店长电话', trigger: 'blur' },
        ],
        storeAddress: [
          { required: true, message: '请输入商家地址', trigger: 'blur' },
        ],
        storeCertificateNum: [
          { required: true, message: '请输入营业执照号', trigger: 'blur' },
        ],
        notice: [
          { required: true, message: '请输入店铺公告', trigger: 'blur' },
        ],
        dynamicTags: [
          // { type: 'array', required: true, message: '标签必填'}
        ],
      }
    }
  },
  created () {
    this.detail()
  },
  methods: {
    // 上传文件
    handleAvatarSuccess(res) {
        this.ruleForm.storeCertificate = res.data.link // URL.createObjectURL(file.raw)
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList;
      },
    handleAvatarSuccessStore(res) {
       this.fileList.push({url:res.data.link});
        //this.ruleForm.storePermit = res.data.link // URL.createObjectURL(file.raw)
    },
    handleAvatarSuccessLogo(res) {
        this.ruleForm.logo = res.data.link // URL.createObjectURL(file.raw)
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
    handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
            this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    detail () {
      let param = {
        isInner: 1
      }
      this.$get(this.$api.shop.detail, param).then(data => {
        if (data && data.code === 200) {
          // this.ruleForm = data.data
          let temp = data.data
          this.ruleForm.storeName = temp.name
          this.ruleForm.storeSn = temp.storeId
          this.ruleForm.masterName = temp.masterName
          this.ruleForm.masterPhone = temp.phone
          this.ruleForm.storeAddress = temp.address
          this.ruleForm.storeCertificateNum = temp.storeCertificateNum
          this.ruleForm.storeCertificate = temp.storeCertificate
          this.ruleForm.storePermit = temp.storePermit
          this.ruleForm.id = temp.storeId
          this.ruleForm.notice = temp.notice
          this.ruleForm.logo = temp.logo

          this.dynamicTags = temp.labels.split(',')
          // this.ruleForm.bankName = temp.bankName
          // this.ruleForm.bankAccount = temp.bankName
        }
      })
    },
    update () {
      if (this.ruleForm.logo === '') {
        this.$message('请上传店铺logo');
        return
      }
      if (this.ruleForm.storeCertificate === '') {
        this.$message('请上传营业执照副本');
        return
      }
      if (this.ruleForm.storePermit === '') {
        this.$message('请上传医疗器械资质');
        return
      }
      if (this.dynamicTags.length === 0) {
        this.$message('请填写标签');
        return
      }

      this.ruleForm.storeNotice = this.ruleForm.notice
      this.ruleForm.storeLogo = this.ruleForm.logo
      this.ruleForm.storeLabels =  this.dynamicTags.join(',')

      this.$post(this.$api.shop.update, this.ruleForm).then(data => {
        if (data && data.code === 200) {
          this.$message({
            message: data.msg,
            type: 'success'
          });
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
    border-radius: 6px;
  }
  .up {
    width: 1.84rem;
    height: 1.64rem;
    background-image: url("../../../assets/images/shopInit/271.png");
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
  font-size: 14px;
  font-weight: 400;
  color: #333;
  // margin-top: 0.24rem;
}
</style>

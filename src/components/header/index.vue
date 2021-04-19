<template>
  <div class="head">
    <header>
      <div class="logo"></div>
      <div class="logo-t">器械邦</div>
      <div class="logo-n">让全球最优秀的品牌商资源为终端服务</div>

      <div class="right">
        
        <el-dropdown>
          <!-- <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button> -->
          <div class="yonghu"></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import {clearLoginInfo} from '@/utils'
export default {
  name:'',
  components: {

  },
  data () {
   return {

   }
  },
  created () {

  },
  methods: {
    // 退出
    logoutHandle() {
        this.$confirm('确定要退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            let result = await this.$get('/sino-auth/oauth/logout')
            if (result && result.code === 200) {
                // this.socketIo.close() // 医疗模块注释改功能
                clearLoginInfo()
                this.$router.push({name: 'login', params: {out: true}})
            }
        }).catch(() => {
            /*  */
        })
    }
  }
}
</script>

<style scoped>
.head {
  width: 100vw;
}
header {
  height: 0.8rem;
  background: #E40137;
  position: relative;
}
.logo {
  width: 0.5rem;
  height: 0.5rem;
  background-image: url("../../assets/images/shopInit/211.png");
  background-size: 100%;
  display: inline-block;
  margin-top: 0.16rem;
  margin-left: 0.6rem;
}
.logo-t {
  font-size: 0.24rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: 0px 0px 0.30rem rgba(0, 0, 0, 0.34);
  letter-spacing: 0.1rem;
  position: absolute;
  top: 0.15rem;
  left: 1.45rem;
}
.logo-n {
  font-size: 0.10rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #FFFFFF;
  position: absolute;
  bottom: 0.15rem;
  left: 1.45rem;
  /* letter-spacing: 200px; */
}
.right {
  position: absolute;
  right: 0.57rem;
  top: 0.26rem;
}
.yonghu {
  width: 0.24rem;
  height: 0.3rem;
  background-image: url("../../assets/images/shopInit/yonghu.png");
  background-size: 100%;
}
</style>

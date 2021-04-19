
<template>
    <div class="common">
        <div class="link1" @click="linkOne">数据统计</div>
        <div class="link2">数据统计2</div>
    </div>
</template>

<script>
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
      linkOne() {
          this.$router.push({path: "/reportMount"})
      }
  }
}
</script>

<style lang='scss' scoped>
.common {
    width: 100vw;
    height: 100vh;
    background: #fff;
    overflow: auto;
}
.link1 {
    font-size: 18px;
    text-align: center;
    margin-top: 150px;
    color: #409eff;
}
.link2 {
    font-size: 18px;
    text-align: center;
    margin-top: 40px;
    color: #409eff;
}
</style>

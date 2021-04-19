<template>
  <div class="switch">
    <span class="switch-t">{{ title }}</span>
    <div :class="[ tag ? 'swit' : 'swita']">
      <div :class="[ tag ? 'active bg' : 'bg']" @click="tagC">是</div>
      <div :class="[ tag ? 'bg' : 'activea bg']" @click="tagC">否</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  components: {

  },
  props: ['title'],
  data () {
   return {
     tag: true
   }
  },
  created () {

  },
  methods: {
    tagC () {
      this.tag = !this.tag
      this.$emit('input', this.tag)
    }
  }
}
</script>

<style lang='scss' scoped>
.switch {
  display: inline-block;
  margin-right: 0.14rem;
  margin-bottom: 0.21rem;
}
.switch-t {
  width: 0.64rem;
  height: 0.19rem;
  font-size: 0.14rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  // line-height: 19px;
  color: #333333;
  margin-right: 0.06rem;
  letter-spacing: 0.01rem;
}
.swit {
  width: 0.79rem;
  height: 0.30rem;
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #FF4D04;
  opacity: 1;
  border-radius: 15px;
  vertical-align: middle;
  box-sizing: content-box;
}
.swita {
  width: 0.79rem;
  height: 0.30rem;
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #909BAA;
  opacity: 1;
  border-radius: 15px;
  vertical-align: middle;
  box-sizing: content-box;
}
.bg {
  // width: 0.31rem;
  width: 0.33rem;
  // width: 0.29rem;
  font-size: 0.14rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  text-align: center;
  display: inline-block;
  height: 100%;
  line-height: 0.13rem;
}
.active {
  width: 0.46rem;
  height: 100%;
  background: #FF4D04;
  border: 0.1rem solid #FF4D04;
  border-radius: 0.15rem;
  color: #FFFFFF;
  box-sizing: border-box;
}
.activea {
  width: 0.46rem;
  height: 100%;
  background: #909BAA;
  border: 0.1rem solid #909BAA;
  border-radius: 0.15rem;
  color: #FFFFFF;
  box-sizing: border-box;
}
</style>

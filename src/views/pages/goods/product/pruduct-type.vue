<template>
    <div class="wrap" style="padding-bottom: 100px">
        <div class="step-m-3">
            <div class="step-m-3-l">
                <div class="add" @click="addrows">
                    <img class="add-i" src="../../../../assets/images/shopInit/xinzeng@2x.png">
                    <span>新增</span>
                </div>
                <div class="add-list">
                    <img class="add-top" src="../../../../assets/images/shopInit/773@2x.png" @click="down">
                    <div :style="{height:height*lineNum + 'rem'}" class="rollScreen_container">
                        <div :style="transform" class="rollScreen_list">
                            <!-- <div class="add-list-item" v-for="(item, index) in product" :key="index" @click="productClick(item, index)"> -->
                            <div :class="'add-list-item '+[item.id==curItem.id?'cur':'' ]" v-for="(item, index) in productLeft" :key="index" @click="productClick(item, index)">
                                <img class="item-stop" src="../../../../assets/images/shopInit/jinzhi@2x.png" v-if="index < 2">
                                <img class="item-logo" :src="item.icon">
                                <div class="item-t">{{item.name}}</div>
                                <div style="position: absolute; left: 0.14rem; bottom: 0.14rem; color: red">{{item.sort}}</div>
                            </div>
                        </div>
                    </div>
                    <img class="add-bottom" src="../../../../assets/images/shopInit/774@2x.png" @click="up">
                </div>
            </div>
            <div class="step-m-3-r">
                <label v-model="productForm.id"></label>
                <div class="shop-logo">
                    <span class="shop-logo-t" style="vertical-align: top;">品类图标</span>
                    <!-- <img class="shop-logo-i" :src="../../assets/images/shopInit/pingtaihuodongku@2x.png"> -->
                    <div class="shop-logo-i-l">
                        <div :class="'shop-product-w '+[ activeIcon == item.dictKey ? 'cur' : 'a']" v-for="(item, index) in productChoice" :key="index" @click="actvieProduct(item)">
                            <img class="shop-logo-i" :src="item.dictKey">
                        </div>
                    </div>
                </div>
                <div class="line">
                    <label class="shop-logo-t">品类名称</label>
                    <el-input v-model="productForm.name"></el-input>
                </div>
                <div class="line" style="margin-top: 0.36rem;">
                    <label class="shop-logo-t">排序显示</label>
                    <!-- <el-input></el-input> -->
                    <el-input-number v-model="productForm.sort" min="3"></el-input-number>
                    <!-- <el-input-number size="mini" v-model="num4" style="margin-top: 0.36rem;"></el-input-number> -->
                </div>
                <div class="line">
                    <label class="shop-logo-t" style="margin-bottom: 1.03rem; display: inline-block;">备注说明</label>
                    <el-input type="textarea" v-model="productForm.description"></el-input>
                </div>
                <div class="opea">
                    <div class="delete" style="margin-right: 1.08rem;" @click="productDelete">
                        <img src="../../../../assets/images/shopInit/shanchu1@2x.png">
                        删除
                    </div>
                    <div class="save" @click="productSave">
                        <img src="../../../../assets/images/shopInit/baocun@2x.png">
                        保存
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {

    },
    data () {
        return {
            height: '0.84',
            num: 0,
            lineNum: 6,
            curItem: {},
            culetfMenu: '',
            productChoice: [],
            activeIcon: {},
            maxSort: 0,
            productForm: {
                icon: '',
                sort: 3,
                name: '', // 品牌名称
                // sortNum: 1,
                type: 0,
                description: ''
            },
            productLeft: [{
                icon: 'https://sino-cloud-base.oss-cn-hangzhou.aliyuncs.com/fileupload-product/qixiebang/rexiao2x.png',
                sort: 1,
                name: '热销产品', // 品牌名称
                // sortNum: 1,
                type: '1',
                description: ''
            }, {
                icon: 'https://sino-cloud-base.oss-cn-hangzhou.aliyuncs.com/fileupload-product/qixiebang/pingtaihuodongku2x.png',
                sort: 2,
                name: '活动商品', // 品牌名称
                // sortNum: 1,
                type: '2',
                description: ''
            }]
        }
    },
    created () {
        this.dictionary()
    },
    computed: {
        transform() {
            return 'transform:translateY(-' + this.num * this.height + 'rem);'
        },
        getSort() {
            return this.productForm.sort
        }
    },
    watch: {
        getSort(newval, oldval) {
            if (newval < 3) {
                this.productForm.sort = 3
                // this.$set(this.productForm, 'sort', 3)
            }
        }
    },
    methods: {
        up () {
            if (this.num !== this.productLeft.length - 1) {
                this.num++
            }
        },
        down () {
            if (this.num != 0) {
                this.num--
            }
        },
        // 字典
        dictionary() {
            // debugger
            let param = {
                code: 'category_cons'
            }
            this.$get(this.$api.shopInit.dictionary, param).then(data => {
                if (data && data.code === 200) {
                    this.productChoice = data.data
                    // this.activeIcon = this.productChoice[0].dictKey
                    // this.productForm.icon = this.productChoice[0].dictKey
                    this.productCategory()
                }
            })
        },
        productClick(item, index) {
            if (index >= 2) {
                this.maxSort = index+1;
                this.activeIcon = item.icon
                console.log('activeIcon', this.activeIcon)
                this.curItem = item
                this.productForm = {...item}
            } else {
                this.$message('默认类目，不可修改')
                return
            }
        },
        actvieProduct (item) {
            // this.productForm.sortNum = item.sort
            this.productForm.icon = item.dictKey
            this.activeIcon =  item.dictKey
        },
        compare(property) {
            return function(a, b) {
                let value1 = a[property]
                let value2 = b[property]
                return value1 - value2
            }
        },
        addrows() {
            this.maxSort = 3;
            this.curItem = {}
            this.activeIcon = {}
            this.productForm = {}
        },
        productSave() {
            if (this.productForm.name === '') {
                this.$message('请填写品类名称')
                return
            }
            if (this.productForm.icon === null) {
                this.$message('请上传图标')
                return
            }
            for(let i = 0; i < this.productLeft.length; i++) {
                  if (this.productLeft[i].sort === this.productForm.sort) {
                      this.$message('不能添加重复品类序号')
                      return
                  }
              }
            console.log(this.productForm)

            // this.productLeft.push({... this.productForm})
            // this.productLeft.sort(this.compare('sort'))
            // this.productLeft.sort((a, b) => {
            //   return String(a.sort).localeCompare(String(b.sort));
            // })

            console.log('merchantStoreProductCategoryList', this.productLeft)
            this.categorySubmit()
        },
        productDelete() {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$post(this.$api.product.remove + '?ids=' + this.curItem.id, null).then(data => {
                    if (data && data.code === 200) {
                        this.productCategory()
                    // this.activeIcon = this.productChoice[0].dictKey
                    // this.productForm.icon = this.productChoice[0].dictKey
                    } else {
                        this.$message(data.msg)
                    }
                })
            }).catch(() => {/*  */})

            // if(this.productForm.sort !== '') {
            //   this.productLeft.map((item, index) => {
            //     if (this.productForm.sort == item.sort) {
            //       this.productLeft.splice(index, 1)
            //     }
            //   })
            // } else {
            //   this.$message('请选择要删除的品类');
            // }

        },
        productCategory() {
            // debugger
            let param = {
                // merchantStoreProductCategory: ''
            }
            this.$get(this.$api.product.productCategory, param).then(data => {
                if (data && data.code === 200) {
                    this.productLeft = data.data
                    let sum = data.data.length - 1
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i] == sum) {
                            maxSort = data.data[i].sort
                        }
                    }

                    // this.activeIcon = this.productChoice[0].dictKey
                    // this.productForm.icon = this.productChoice[0].dictKey
                }
            })
        },
        categorySubmit() {
            // debugger
            // let param ={
            //   mchProductCategoryDTO: this.productLeft
            // }

            let param = this.productForm

            this.$post(this.$api.product.categorySubmit, param).then(data => {
                if (data && data.code === 200) {
                    this.productCategory()
                    this.$message(data.msg)
                } else {
                    this.$message(data.msg)
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.wrap {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-top: 10px;
  width: 100%;
}
.step-m-3 {
  margin: 0 auto;
  margin-top: 0.43rem;
  margin-bottom: 0.1rem;
  // width: 8.09rem;
  width: 12.09rem;
  height: 5.97rem;
  display: flex;
}
.step-m-3-l {
  width: 1.84rem;
  height: 100%;
  // background: #F2F3F3;
  opacity: 1;
  border-radius: 7px;
  margin-right: 0.07rem;
}
.add {
  height: 0.35rem;
  background: #FF4D04;
  opacity: 1;
  border-radius: 0.03rem;
  font-size: 0.21rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
    cursor: pointer;
  // line-height: 27px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-i {
  width: 0.26rem;
  height: 0.26rem;
  margin-right: 0.15rem;
}
.add-list {
  background: #F2F3F3;
  border-radius: 0.15rem;
  width: 100%;
  height: 5.52rem;
  // margin-top: 0.1rem;
  margin-top: 0.45rem;
  position: relative;
}
.add-top {
  width: 1.84rem;
  height: 0.33rem;
  margin-bottom: 0.02rem;
}
.rollScreen_container{
  position:relative;
  overflow: hidden;
}
.rollScreen_list{
  transition: 0.5s linear;
}
.add-list-item {
     width: 1.58rem;
     height: 0.78rem;
     background: #FFFFFF;
     border-radius: 0.06rem;
     margin: 0 auto;
     margin-top: 0.06rem;
     position: relative;
    cursor: pointer;
     // display: flex;
     // justify-content: center;
     // align-items: center;
 }
.add-list-item.cur {
   background: #cccccc;
    div{
        color: #fff;
    }

}
.item-stop {
  width: 0.18rem;
  height: 0.18rem;
  position: absolute;
  top: 0.08rem;
  left: 0.09rem;
}
.item-logo {
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  margin: 0 auto;
  margin-top: 0.06rem;
  margin-bottom: 0.06rem;
}
.item-t {
  height: 0.20rem;
  font-size: 0.15rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  // line-height: 20px;
  color: #FF4D04;
  text-align: center;
}
.add-bottom {
  width: 1.84rem;
  height: 0.33rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
.step-m-3-r {
  width: 100%;
  height: 100%;
  padding-left: 0.94rem;
  margin-top: 0.45rem;
  // background: #F2F3F3;
}
.shop-logo {
  display: flex;
}
.shop-logo-t {
  font-size: 0.14rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  // line-height: 19px;
  color: #333333;
  margin-right: 0.4rem;
}
.shop-logo-i-l {
  display: flex;
  width: 7rem;
  overflow: auto;
  white-space:nowrap;
}
.shop-product-w {
  padding: 0.1rem;
    cursor: pointer;
}
.shop-product-w.cur {
    padding: 0.1rem;
    cursor: pointer;
    border: 1px solid #E40137;
}
.shop-logo-i {
  // width: 1.84rem;
  // height: 1.64rem;
  width: 0.8rem;
  height: 0.8rem;
  // margin-right: 0.1rem;
}
.line .el-input {
  width: 3.35rem;
  height: 0.30rem;
  margin-top: 0.42rem;
  // margin-left: 0.4rem;
}
.line .el-textarea {
  width: 3.35rem;
  height: 1.27rem !important;
  margin-top: 0.47rem;
}
.line /deep/ .el-textarea__inner {
  height: 100% !important;
}
.opea {
  display: flex;
  margin-top: 0.27rem;
    cursor: pointer;
}
.delete, .save {
  width: 1.15rem;
  height: 0.35rem;
  background: #F2F3F3;
  opacity: 1;
  border-radius: 0.03rem;
  display: flex;
  font-size: 0.15rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  // line-height: 20px;
  color: #FF4D04;
  justify-content: center;
  align-items: center;
}
.delete img {
  width: 0.18rem;
  height: 0.18rem;
  margin-right: 0.17rem;
}
.save img {
  width: 0.18rem;
  height: 0.18rem;
  margin-right: 0.17rem;
}

</style>

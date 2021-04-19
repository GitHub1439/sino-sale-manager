<template>
    <div class="ermtest">
        <div class="conleft">
        <div class="title">测试码</div>
        <div class="img_box">
            <img
                src="../../../assets/images/mini-test.png"
                height="535"
                width="301"
            />
            <div class="ercode">
                <img
                    :src="shopDetail.testCode"
                    height="178"
                    width="181"
                />
                <p style="color:#999">测试用户专用</p>
            </div>
            <div class="shop_name">
                {{shopDetail.name}}
            </div>
        </div>
    </div>
        <div class="conleft">
            <div class="title">店铺推广码</div>
            <div class="img_box">
                <img
                    src="../../../assets/images/mini-test.png"
                    height="535"
                    width="301"
                />
                <div class="ercode">
                    <img
                        :src="shopDetail.proCode"
                        height="178"
                        width="181"
                    />
                    <p style="color:#999">店铺推广码</p>
                </div>
                <div class="shop_name">
                    {{shopDetail.name}}
                </div>
            </div>
        </div>
        <div class="conright">
            <div class="title">测试码注意事项：</div>
            <div style="font-size: 16px; text-indent: 40px">
                <span>请用微信扫一扫，绑定成为用户测试</span>
                <span>1、可多人一起绑定</span>
                <span>2、测试数据7天的自动清除</span>
                <span>3、测试数据不计算到正常范围</span>
            </div>
            <div class="title">绑定微信：</div>
            <div class="wxinfolist">
                <div class="wxlist" :key="index" v-for="(item, index) in shopDetail.wxInfoList">
                    <div>
                        <img :src="item.avatarUrl" alt="">
                    </div>
                    <div>{{item.nickName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temppic:"http://snjhyy.oss-cn-hangzhou.aliyuncs.com/upload/20210302/72a2994f618a28da98e4f4c135013c0b.png",
            shopDetail: {}
        }
    },
    async mounted() {
        // /sino-dst/mp/index/store/detail
        let {code, data, msg} = await this.$get(this.$api.extra.detail + '?isInner=1')
        if (code === 200) {
            console.log(data)
            this.shopDetail = data
        } else {
            this.$message({
                message: msg
            })
        }
    }
}
</script>
<style>
.ermtest {
    background: #fff;
    padding: 60px 20px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
.ermtest .conleft {
    flex: 0.5;
    text-align: center;
    position: relative;
}
.ermtest .conleft .ercode img{
    margin-bottom: 20px;
}
.ermtest .conleft .shop_name{
    position: absolute;
    left: 50%;
    top: 35%;
    color: #fff;
    transform: translate(-50%, -50%);
}
.ermtest .conleft .ercode {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
}
.img_box{
    position: relative;
}
.ermtest .conleft .title {
    text-align: center;
    font-size: 20px;
    margin: 15px 0;
}

.ermtest .conright {
    flex: 0.5;
    text-align: left;
    padding: 60px 0;
}
.ermtest .conright .title {
    text-align: left;
    font-size: 20px;
    margin: 15px 0;
}
.ermtest .conright span {
    display: block;
    padding: 5px 0;
}
.ermtest .conright .wxlist {
    padding: 5px 0;
    width: 90px;
}
.wxinfolist{
    display: flex;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    max-width: 700px;
}
.wxinfolist img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>

<template>
    <div>
        <div style="width: 100vw" class="site-wrapper site-cus-content" :class="{ 'site-sidebar--fold': sidebarFold }" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
            <template v-if="!loading">
                <main-navbar />
                <main-sidebar />
                <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
                    <main-content />
                </div>
            </template>
        </div>
        <div class="online" v-if="isShow">
            <div class="title">升级公告</div>
            <div  class="lineBody" v-html="lineCon">
            </div>
            <div class="readme">
                <button @click="closeTips">知道了</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-empty-function */
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import MainContent from './main-content'

export default {
    data() {
        return {
            loading: true,
            isShow: false,
            lineCon:'<div>1</div><div>2</div>'
        }
    },
    components: {
        MainNavbar,
        MainSidebar,
        MainContent
    },
    computed: {
        documentClientHeight: {
            get() {
                return this.$store.state.common.documentClientHeight
            },
            set(val) {
                this.$store.commit('common/UPDATEDOCUMENTCLIENTHEIGHT', val)
            }
        },
        sidebarFold: {
            get() {
                return this.$store.state.common.sidebarFold
            }
        }
    },
    created() {
        this.loading = false
        //this.getSystemV()

    },
    onLoad(){

    },
    mounted() {
        this.resetDocumentClientHeight()
        window.addEventListener('scroll', () => {
            [].forEach.call(document.querySelectorAll('.el-picker-panel'), (e) => {
                e.style.zIndex = 1029
            })
            let ele = document.querySelector('.drop-btns-wrap') // drop 按鈕層級問題
            if (ele) {
                ele.style.zIndex = 1029
            }
        })
    },
    methods: {
        // 重置窗口可视高度
        resetDocumentClientHeight() {
            this.documentClientHeight = document.documentElement.clientHeight
            window.onresize = () => {
                this.documentClientHeight = document.documentElement.clientHeight
            }
        },
        getSystemV(){
            let lovison='2021032406'
            this.$get(`/sino-dst/dict/list?code=end_vison`, null).then(data => {
                if (data && data.code === 200) {
                    let tem=data.data[0]
                    let endv=tem.dictValue
                    this.lineCon=tem.remark
                    if(lovison!=endv){
                        this.isShow=true
                    }

                }

            })


        },
        closeTips(){
            this.isShow=false
            location.reload()


        }
    }
}
</script>
<style lang="scss">
    .online{
        background:#63a8eb;
        border-radius: 10px;
        padding: 20px;
        width: 60%;
        box-shadow: 0 0 15px rgba(0, 0, 0,0.14);
        position: absolute;
        left: 20%;
        top: 26%;
        z-index: 9999;
        .title{
            font-size: 18px;
            font-weight: bold;
            height: 30px;
            line-height: 30px;
            color: #f1f1f1;
        }
        .lineBody{
            margin-top: 10px;
            color: #fff;
            padding: 10px 2px;
            height: 120px;
            line-height: 24px;
            overflow: auto;
        }
        .readme{
            text-align: center;
        button{
            border: 0px;
            background: #fff;
            padding: 6px 10px;
            border-radius: 4px;
        }
    }
    }
</style>

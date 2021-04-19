<template>
    <div class="site-wrapper site-page--login">
        <div class="copyright">
            让全球最优秀的品牌服务商资源为终端服务
        </div>
        <div class="login-content">
            <div class="brand-info">
                <h2 class="brand-info__text">器械邦</h2>
            </div>
            <div class="login-main">
                <div class="login-row">
                    <div class="login-col">
                        <div class="img-wrap"></div>
                    </div>
                    <div class="login-col">
                        <div v-if="!isError" :class="['login-form-wrap', {'ismedical': dataForm.isMedicalTreatmentAlliance == '1'}]">
                            <h3 class="login-title"><img src="../../assets/images/logo_dianpu.png" height="80"  width="80"/>器械邦</h3>
                            <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
                                <div :class="['sn-form-item','sn-customer']" v-if="dataForm.isMedicalTreatmentAlliance == '1'">
                                    <el-select
                                        v-model="dataForm.customerId"
                                        @blur="inputCustomerBlur"
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder='医疗机构'
                                        :loading="dataListLoading"
                                        style="width: 100%"
                                        @visible-change="visibleChange"
                                    >
                                        <el-option
                                            v-for="item in customerList"
                                            :key="item.customerId"
                                            :label="item.customerName"
                                            :value="item.customerId"
                                        ></el-option>
                                    </el-select>
                                    <i :class="['sn-icon-select','el-select__caret', ' el-input__icon', {'el-icon-arrow-down': iconStatus }, {'el-icon-arrow-up': !iconStatus }]"></i>
                                    <div class="sn-form-item-icon">
                                        <icon-svg name="customer" class="site-sidebar__menu-icon"></icon-svg>
                                    </div>
                                </div>
                                <div :class="['sn-form-item', {'is-error': iserroruser }]">
                                    <input
                                        type="text"
                                        @blur="inputUserBlur"
                                        ref="user"
                                        maxlength="16"
                                        v-model="dataForm.account"
                                        autocomplete="off"
                                        placeholder="帐号/手机号"
                                        class="sn-input__inner"
                                    >
                                    <div class="sn-form-item-icon">
                                        <icon-svg name="user" class="site-sidebar__menu-icon"></icon-svg>
                                    </div>
                                </div>
                                <div :class="['sn-form-item', {'is-error': iserrorpass }]">
                                    <input
                                        type="password"
                                        @blur="inputPassBlur"
                                        ref="password"
                                        minlength="6"
                                        maxlength="18"
                                        v-model="dataForm.userPassword"
                                        autocomplete="off"
                                        placeholder="密码"
                                        class="sn-input__inner"
                                    >
                                    <div class="sn-form-item-icon">
                                        <icon-svg name="userpassword" class="site-sidebar__menu-icon"></icon-svg>
                                    </div>
                                </div>
                                <div class="sn-form-item-error">
                                    {{errortext}}
                                </div>
                                <div class="sn-form-item last">
                                    <el-button :class="['login-btn-submit', {'isIe': isIe}]" type="primary" @click="dataFormSubmit()">登录</el-button>
                                    <!--<el-button class="login-btn-reset" type="text" @click="formReset()">重置</el-button>-->
                                </div>
                            </el-form>
                        </div>
                        <div class="error-box" v-if="isError">
                            发生异常，请联系管理员
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ieVersion, serialize} from '@/utils/'
import md5 from 'js-md5'
export default {
    data() {
        return {
            dataForm: {
                account: '',
                userPassword: '',
                checked: false
            },
            nowTime:"",
            errortext: '',
            customerList: [],
            dataListLoading: false,
            iserroruser: false,
            iserrorpass: false,
            iserrorcustomer: false,
            isfocus: false,
            isfocusp: false,
            iconStatus: true,
            isError: false
        }
    },
    computed: {
        isIe() {
            return ieVersion() > 0
        }
    },
    created(e) {
        localStorage.clear()
        this.getTime()

        let par=this.$route.params
        if(par!=null){
            if(par.out){
                location.reload()
            }
        }
    },

    methods: {
        inputUserBlur(e, tag) {
            if (this.dataForm.account.trim() === '') {
                this.errortext = '帐号不能为空'
                this.iserroruser = true
                if (tag) {
                    this.$refs.user.focus()
                }
                return false
            }
            this.iserroruser = false
            this.errortext = ''
            return true
        },
        inputPassBlur(e, tag) {
            if (this.dataForm.userPassword.trim() === '') {
                this.errortext = '密码不能为空'
                this.iserrorpass = true
                this.iserrorcustomer = true
                if (tag) {
                    this.$refs.password.focus()
                }
                return false
            }

            if (this.dataForm.userPassword.trim().length < 5) {
                this.errortext = '密码长度不能少于5位'
                this.iserrorpass = true
                if (tag) {
                    this.$refs.password.focus()
                }
                return false
            }

            this.iserrorpass = false
            this.errortext = ''
            return true
        },
        formReset() {
            this.errortext = ''
            this.iserroruser = false
            this.iserrorpass = false
            this.iserrorcustomer = false
            this.dataForm.account = ''
            this.dataForm.userPassword = ''
        },
        // 提交表单
        async dataFormSubmit() {
            if (this.inputUserBlur(null, true) && this.inputPassBlur(null, true)) {
                this.login()
            }
        },
        async isInstalShop(){
            let res = await this.$get(this.$api.extra.detail + `?isInner=1`,null)
            if(res.code=='400'){
                return false
            }else{
                return true
            }
        },
        getTime(){
            var code = '';
            //设置长度，这里看需求，我这里设置了4
            var codeLength = 4;

            //设置随机字符
            var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

            //循环codeLength 我设置的4就是循环4次
            for (var i = 0; i < codeLength; i++) {
                //设置随机数范围,这设置为0 ~ 36
                var index = Math.floor(Math.random() * 9);

                //字符串拼接 将每次随机的字符 进行拼接
                code += random[index];
            }

            //将拼接好的字符串赋值给展示的code
            this.nowTime = code;
        },
        async login() {
            let param = {
                // username: this.dataForm.account.trim() + '@jianheng.com', // kenny
                account: this.dataForm.account.trim(),
                password: md5(this.dataForm.userPassword),
                grant_type: 'dst',
                type: 'account',
                tenantId: '000000',
                scope: 'all'

            }
            // test
            let res = await this.$post(`/sino-auth/oauth/token?${serialize(param)}`, {isLogin: 1})
            if (res.error) {
                this.errortext = res.error_description
            } else {
                if (res.code === 400) {
                    this.errortext = res.msg
                    return
                }
                window.localStorage.setItem('healthyUserName', this.dataForm.account.trim())
                window.localStorage.setItem('healthyPassword', md5(this.dataForm.userPassword))
                localStorage.setItem('Sino-Auth', res.access_token)
                localStorage.setItem('account_type', res.account_type)
                localStorage.setItem('mch_id', res.mch_id)
                localStorage.setItem('account_id', res.account_id)
                localStorage.setItem('userInfo', JSON.stringify(res))
                localStorage.setItem('isCloseWS', 'false')
                this.$store.commit('healthchat/SETSTATUS', true)
                this.$store.commit('common/UPDATEUSERINFO', res)
                // this.$router.replace({name: 'moduledoctor-video-lists'})
                // if (res.role_id === '1290562180347408399') {
                //     this.$router.replace({name: 'modulehealthy-index'})
                // } else {
                //     this.$router.replace({name: 'home'})
                // }

                let Timevison= window.SITE_CONFIG.version
                if (res.account_type==='syser') {
                    this.$router.replace({name: 'factory-goods-goods-index',query:{v:Timevison}})
                } else if (res.account_type==='inner') {
                    let isInstall= await this.isInstalShop();
                    if(isInstall){
                        this.$router.replace({name: 'order-order-list',query:{v:Timevison}})
                    }else{
                        this.$router.replace({name: 'shopInit', query:{v:Timevison}})
                    }

                }
            }
        }
    }
}
</script>

<style lang="scss">

    ::-webkit-input-placeholder {
        color: #ccc;
    }
    .site-wrapper.site-page--login {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        &:before {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            content: "";
            background-image: url(~@/assets/images/img_pic_bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .site-content__wrapper {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0;
            margin: 0;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: transparent;
        }
        .brand-info {
            color: #fff;
            position: absolute;
            top: 30px;
            left: 20px;
        }
        .brand-info__text {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .brand-info__intro {
            margin: 10px 0;
            font-size: 16px;
            line-height: 1.58;
            opacity: 0.6;
        }
        .login-main {
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%);
            width: 866px;
            border-radius: 10px;
        }
        .login-title {
            font-size: 32px;
            margin: 0;
            padding: 56px 0 70px 0;
            color: #333;
            text-transform: uppercase;
            font-weight: 700;
        }
        .login-captcha {
            overflow: hidden;
            > img {
                width: 100%;
                cursor: pointer;
            }
        }
        .login-row {
            overflow: hidden;
            .login-col {
                float: left;
            }
        }
        .sn-form-item {
            position: relative;
            margin-bottom: 15px;
            &.is-error input {
                /*border-bottom: 1px solid #c0191f;*/
            }
            &.last {
                margin-bottom: 0;
            }
        }
        .sn-form-item-icon {
            color: #909399;
            position: absolute;
            padding: 0 10px;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
        }
        .sn-customer .el-input__inner {
            border: none;
            background: #F7F7F7;
            box-sizing: border-box;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px 0 35px;
            vertical-align: middle;
        }
        .sn-input__inner {
            -webkit-appearance: none;
            background-color: #F7F7F7;
            background-image: none;
            border: none;
            border-bottom: 1px solid #ddd;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            border-radius: 5px;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px 0 35px;
            vertical-align: middle;
            display: table-cell;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
        }
        .sn-icon-select {
            position: absolute;
            right: -5px;
            top: 50%;
            transform: translate(0, -50%);
            color: #ccc;
        }
        .sn-input__inner:focus {
            border-bottom: 0;
        }
        .sn-input__inner:focus + .sn-form-item-icon {
            color: #FAB680;
        }
        .sn-form-item-error {
            text-align: right;
            color: #c0191f;
            font-size: 11px;
            height: 13px;
        }
        .login-btn-submit {
            width: 100%;
            border: 0;
            margin-top: 38px;

            background: linear-gradient(90deg, #C11920 0%, #EE2626 100%);
            border-radius: 25px;
            height: 50px;
            font-size: 13px;
            box-shadow: 0 5px 10px rgba(207,49,69, 0.2)
        }
        .login-btn-reset {
            height: 50px;
            color: #0073cf;
            margin: 0;
            font-size: 11px;
        }
        .login-main-wrap-img {
            width: 100%;
            vertical-align: middle;
        }
        .login-form-wrap {
            text-align: center;
            padding: 0 60px 0 56px;
            width: 426px;
            &.ismedical {
                .login-title {
                    padding: 50px 0 40px 0;
                }
                .login-btn-submit {
                    margin-top: 20px;
                }
            }
        }
        .img-wrap {
            width: 440px;
            height: 491px;
            background: url(~@/assets/images/img_pic_ch.png) no-repeat;
            background-size: 100%;
        }
        .copyright {
            position: absolute;
            width: 100%;
            bottom: 0;
            text-align: center;
            padding: 0 0 30px 0;
            font-size: 14px;
            color: #C82F45;
            letter-spacing: 2px;
        }
        .error-box {
            position: absolute;
            top: 50%;
            right: 60px;
            font-size: 26px;
            color: #d0d0d0;
        }
        .isIe {
            background: #0073cf;
        }
    }
</style>

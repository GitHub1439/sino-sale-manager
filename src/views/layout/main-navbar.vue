<template>
    <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
        <div class="site-navbar__header" @click="gotoRouteHandle" >
            <div class="logo" >
                <img src="../../assets/images/logo_dianpu.png" height="42" width="42" style="border-radius: 50%"/>
            </div>
            <h1 @click="goHome" class="site-navbar__brand">
                <a class="site-navbar__brand-lg"  title="器械邦">
                    <span class="navbar-txt">器械邦</span>
                </a>
                <div class="site-navbar__smtitle">让全球最优秀的品牌商资源为终端服务</div>
            </h1>

        </div>
        <div class="site-navbar__body clearfix">
            <!--
            <div :class="['toggle-menu']" @click="sidebarFold = !sidebarFold">
                <icon-svg name="zhedie"></icon-svg>
            </div> -->
            <div class="sn-row site-navbar__menu--right">
                <div class="sn-row" style="align-items: center">
                    <!--&lt;!&ndash; <div class="sn-row switch" style="margin-left: 20px;align-items: center" v-if="socketIostatus">-->
                        <!--<el-tag :type="socketIostatus.type ===1 ?'success': 'danger'">{{socketIostatus.msg}}</el-tag>-->
                    <!--</div> &ndash;&gt;-->
                    <!--&lt;!&ndash; <el-badge class="item" :value="taskTotal" :hidden="taskTotal<=0">-->
                        <!--<div @click="goMission">-->
                            <!--<icon-svg class="notice-image mgl20" name="jjrw"></icon-svg>-->
                        <!--</div>-->
                    <!--</el-badge>-->
                    <!--<el-badge class="item" :value="messageTotal" :hidden="messageTotal<=0">-->
                        <!--<div @click="gozx">-->
                            <!--<icon-svg @click="gozx" class="notice-image mgl20" name="zx"></icon-svg>-->
                        <!--</div>-->
                    <!--</el-badge> &ndash;&gt;-->
                    <icon-svg class="icon-image mgl20" name="tx"></icon-svg>
                </div>
                <el-menu class="site-navbar__menu site-navbar__menu--right site-last" mode="horizontal">
                    <el-menu-item class="site-navbar__avatar" index="3">
                        <el-dropdown :show-timeout="0">
                            <span class="el-dropdown-link">
                                {{userName}}
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
<!--                                <el-dropdown-item @click.native="userSetting()">个人设置</el-dropdown-item>-->
<!--                                <el-dropdown-item @click.native="signPassword()">签名密码</el-dropdown-item>-->
<!--                                <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>-->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
<!--                <div class="username">{{userName}}</div>-->
                <div class="outlogin" @click="logoutHandle()" title="点击退出登录"><span>退出</span></div>
            </div>
        </div>
        <!-- 弹窗, 修改密码 -->
        <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
        <!-- 弹窗, 修改个人信息 -->
        <user-setting v-if="updateUeserSetting" ref="usersetting"></user-setting>
        <!-- 弹窗, 修改签名密码 -->
        <sign-password v-if="signPasswordChange" ref="signSetting"></sign-password>
    </nav>
</template>

<script>
import {clearLoginInfo} from '@/utils'
import {mapState} from 'vuex'

// import extraRouter from '@/router/extrarouter'
import updatePassword from './main-navbar-updatepassword'
import userSetting from './main-navbar-usersetting'
import signPassword from './main-sign-password'
import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
// import ConnectionSocket from '@/views/pages/mouduleconsulting/stomp'
export default {
    data() {
        return {
            updatePassowrdVisible: false,
            updateUeserSetting: false,
            signPasswordChange: false,
            taskTotal: 0,
            nowTime:"",
            value1:false,
        }
    },
    components: {
        updatePassword,
        userSetting,
        signPassword,
        chunLeiPopups
    },
    computed: {
        ...mapState({
            socketIo: state => state.healthchat.socketIo,
            socketIostatus: state => state.healthchat.socketIostatus
        }),
        headerMenuList: {
            get() {
                return this.$store.state.common.headerMenuList
            },
            set(val) {
                this.$store.commit('common/UPDATEHEADERMENULIST', val)
            }
        },
        /* setStatus: {
            get() {
                return this.$store.state.healthchat.setStatus
            },
            set(val) {
                this.$store.commit('healthchat/SETSTATUS', val)
            }
        }, */
        headermenuActiveName: {
            get() {
                return this.$store.state.common.headermenuActiveName
            },
            set(val) {
                this.$store.commit('common/UPDATEHEADERMENUACTIVENAME', val)
            }
        },
        navbarLayoutType: {
            get() {
                return this.$store.state.common.navbarLayoutType
            }
        },
        sidebarFold: {
            get() {
                return this.$store.state.common.sidebarFold
            },
            set(val) {
                this.$store.commit('common/UPDATESIDEBARFOLD', val)
            }
        },
        userName: {
            get() {
                return this.$store.state.common.userInfo.nick_name
            }
        },
        sessionList: {
            get() {
                return this.$store.state.healthchat.sessionList
            },
            set(val) {
                this.$store.commit('healthchat/UPDATESESSIONLIST', val)
            }
        },
        messageTotal: {
            get() {
                return this.$store.state.healthchat.sessionList.reduce((total, e) => total + Number(e.notReadCount), 0)
            }
        }
    },
    async created() {
        //await this.getUndoTask()
        this.headerMenuList = JSON.parse(
            sessionStorage.getItem('headerMenuList') || '[]'
        )
        /* 开始socket.io develop 分支关闭聊天咨询功能 */
        /* const connection = new ConnectionSocket({
            wsurl: window.SITE_CONFIG.wsUrl,
            query: {account_id: localStorage.getItem('account_id')},
            transports: ['websocket'],
            timeout: 5000,
            reconnectionDelay: 2000
        }, this)
        this.$store.commit('healthchat/CONNECTIONSOCKET', connection)
        this.$bus.$on('notice_event', async (data)=>{
            this.notice(data)
            await this.getUndoTask()
        }) */

    },
    destroyed () {
        // this.$bus.$off('notice_event')
    },
    methods: {
        async getUndoTask() {
            let params = {
                queryFor: 3,
                current: 1,
                size: 10,
                taskStatus: 1
            }
            let {code, data} = await this.$get(this.$api.taskCenter.taskList, params)
            if (code === 200) {
                this.taskTotal = data.total
            }
        },
        gotoRouteHandle() {
            this.$router.push({name: 'home'})
        },
        notice(data) {
            let _this = this
            console.log(_this)
            let num = data.data.data.length || 0
            let typeStr = data.data.type === 0 ? '紧急任务' : '会话移交'
            let str = '您有' + num + '条新的' + typeStr + '待处理'
            let pageUrl = data.data.type === 0 ? 'moduledesk-urgent-mission' : ''
            let params = data.data.type === 0 ? {taskStatus: 1} : {}
            let h = this.$createElement
            let notify = this.$notify({
                dangerouslyUseHTMLString: true,
                message: h('div', {
                    style: {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, [
                    h('div', {
                        style: {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    }, [
                        h('div', {
                            style: {
                                color: '#f35f5f',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }
                        }, typeStr),
                        h('el-button', {
                            attrs: {
                                type: 'text'
                            },
                            style: {
                                float: 'right',
                                fontSize: '15px'
                            },
                            on: {
                                click: ()=>{
                                    _this.$router.push({name: pageUrl, query: params})
                                    notify.close()
                                }
                            }
                        }, '查看详情')
                    ]),
                    h('div', {
                        style: {
                            marginTop: '10px',
                            fontWeight: 'bold'
                        }
                    }, str)
                ]),
                position: 'bottom-right',
                showClose: false,
                duration: 0
            })
        },
        gozx() {
            this.$router.push({name: 'mouduleconsulting-consulting-index'})
        },
        goMission() {
            this.$router.push({name: 'moduledesk-urgent-mission', query: {taskStatus: 1}})
        },
        goHome() {
            // this.$router.push({name: 'home'})
        },
        handleMenuSelect(index, indexPath, e) {
            if (e.$attrs.menuname === '首页') {
                this.$router.push({name: 'home'})
                return
            }
            if (/^menu-empty-\d+$/.test(index) || index === undefined) {
                this.$message.warning('临时菜单')
            } else if (/^https:\/\/|http:\/\//.test(index)) {
                open(index)
            } else {
                let menuid = e.$attrs.indexpath
                if (!menuid) return
                let tempdata = this.headerMenuList.slice() // Object.assign({}, this.menuData);

                let itemdata = tempdata.filter((item) => {
                    return item.menuId === menuid
                })
                this.$store.commit('common/UPDATEMENULIST', itemdata[0].subMenuList) // 更新左侧菜单
                if (itemdata[0].subMenuList[0] && itemdata[0].subMenuList[0].subMenuList[0] && itemdata[0].subMenuList[0].subMenuList[0].menuUrl) {
                    this.$router.replace({
                        path: itemdata[0].subMenuList[0].subMenuList[0].menuUrl.replace('/', '-')  // 显示第一个菜单
                    })
                }
            }
        },
        // 修改密码
        updatePasswordHandle() {
            this.updatePassowrdVisible = true
            this.$nextTick(() => {
                this.$refs.updatePassowrd.init()
            })
        },
        // 设置信息
        userSetting() {
            this.updateUeserSetting = true
            this.$nextTick(() => {
                this.$refs.usersetting.init()
            })
        },
        signPassword() {
            this.signPasswordChange = true
            this.$nextTick(() => {
                this.$refs.signSetting.init()
            })
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
                    //this.$router.replace({name: 'login', params: {out: true}, query:{v: this.nowTime}})
                    this.$router.push({name: 'login', params: {out: true}})
                }
            }).catch(() => {
                /*  */
            })
        }/* ,
        getMenuList(path) {  // 刷新页面重新过滤左侧菜单的数据
            let data = JSON.parse(sessionStorage.getItem('menuList') || '[]')
            for (let i = 0; i < data.length; i++) {
                const element = data[i].subMenuList
                for (let j = 0; j < element.length; j++) {
                    const item = element[j].subMenuList
                    for (let k = 0; k < item.length; k++) {
                        const temp = item[k]
                        if ('/' + temp.menuUrl.replace('/', '-') === path) {
                            return data[i]
                        }
                    }
                }
            }
            return null
        } */
    }
}
</script>
<style lang="scss" scoped="scoped">
   .notice-image{
       width: 24px;
       height: 24px;
       cursor: pointer;
   }
   .username{
       line-height: 80px;
       color: #fff;
       margin: 0 20px;
   }
   .outlogin{
       line-height: 80px;
       color: #fff;
       :hover{
           background: #d4280a;
       }
   }
   .outlogin span{
       padding:6px 10px;
   }
   .outlogin span:hover{
       cursor: pointer;
       border-radius: 6px;
       background: #FFF;
       color: #333;
   }
   .icon-image{
       width: 32px;
       height: 32px;
   }
    .site-navbar__header .logo{
         position: absolute;
         left: 50px;
         top: 20px;
     }
   .site-navbar__header:hover{
       cursor:pointer
   }
</style>

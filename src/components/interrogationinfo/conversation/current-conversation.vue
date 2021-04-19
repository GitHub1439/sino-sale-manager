<template>
    <div class="current-conversation-wrapper">
        <div class="current-conversation" @scroll="onScroll" v-if="showCurrentConversation">
            <div class="content">
                <div class="message-list" ref="message-list" @scroll="this.onScroll">
                    <div class="more" v-if="!isCompleted">
                        <el-button
                            type="text"
                            @click="showMore(currentConversation.godId)"
                        >
                            查看更多
                        </el-button>
                    </div>
                    <div class="no-more" v-else>没有更多了</div>
                    <message-item v-for="message in currentMessageList" :key="message.ID" :message="message" />
                </div>
                <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置</div>
            </div>
            <div>
                <div class="footer" v-if="receptionShow">
                    <message-send-box />
                </div>
                <div class="footer-un-inquiry" v-else>
                    <div class="un-inquiry-con">
                        <div class="con-item">{{timer(timeAll)}}</div>
                        <div class="con-item">倒计时结束未接诊将自动退诊</div>
                        <div class="con-item">
                            <el-button type="danger" round icon="el-icon-close" @click="refund">退诊</el-button>
                            <el-button type="primary" round icon="el-icon-check" @click="accept">接诊</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {Message} from 'element-ui'
import MessageSendBox from '../../message/message-send-box.vue'
import MessageItem from '../../message/message-item.vue'
import {secondToDate} from '../../../utils/date'
// import {secondToDate} from '../../../utils/date'
// import session from '../../../store/modules/session'
export default {
    name: 'ConversationCurrent',
    components: {
        MessageSendBox,
        MessageItem
    },
    data() {
        return {
            isShowScrollButtomTips: false,
            size: 15,
            preScrollHeight: 0,
            showConversationProfile: false,
            timeout: '',
            ticker: '',
            time: ''
        }
    },
    computed: {
        ...mapState({
            currentConversation: state => state.session.currentConversation,
            // 项目选中当前信息
            currentConversationPro: state => state.session.currentConversationPro,
            currentUnreadCount: state => state.session.currentConversationPro.unreadCount,
            currentMessageList: state => state.session.currentMessageList,
            isCompleted: state => state.session.isCompleted,
            receptionShow: (state) => state.session.receptionShow,
            unReceptionEndTime: (state) => state.session.unReceptionEndTime,
            current: (state) => state.session.current,
            userInfo: (state) => state.common.userInfo
        }),
        // 是否显示当前会话组件
        showCurrentConversation() {
            return !!this.currentConversationPro.godId
        },
        showMessageSendBox() {
            // return this.currentConversation.type !== this.TIM.TYPES.CONV_SYSTEM
            return false
        },
        ...mapGetters(['hidden']),
        timeAll: {
            get() {
                return this.time
            }
        }
    },
    mounted() {
        this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom)
        this.$bus.$on('image-loaded', this.onImageLoaded)
        this.$bus.$on('clear-end-time', this.clearEndAcceptTime)
        this.$once('hook:beforeDestroy', ()=>{
            clearInterval(this.timer)
        })
    },
    created() {
        this.time = new Date(this.currentConversationPro.endAcceptTime).getTime() - new Date().getTime()
        if (this.ticker) { // 这一段是防止进入页面出去后再进来计时器重复启动
            clearInterval(this.ticker)
        }
        this.beginTimer()
    },
    updated() {
        this.keepMessageListOnButtom()
    },
    watch: {
        currentUnreadCount(next) {
            if (!this.hidden && next > 0) {
                this.tim.setMessageRead({conversationID: 'C2C' + this.currentConversationPro.godImAcount})
            }
        },
        hidden(next) {
            if (!next && this.currentUnreadCount > 0) {
                this.tim.setMessageRead({conversationID: 'C2C' + this.currentConversationPro.godImAcount})
            }
        }
    },
    methods: {
        clearEndAcceptTime() {
            if (this.ticker) { // 这一段是防止进入页面出去后再进来计时器重复启动
                clearInterval(this.ticker)
            }
            this.beginTimer()
        },
        beginTimer() { // 这个计时器是每秒减去指定字段的时间
            // 未接诊倒计时
            this.time = new Date(this.currentConversationPro.endAcceptTime).getTime() - new Date().getTime()
            this.ticker = setInterval(() => {
                if (this.time > 0) {
                    this.time = this.time - 1000
                } else if (this.time <= 0) {
                    clearInterval(this.ticker)
                }
            }, 1000)

        },
        timer(time) { // 这个函数是每秒把时间重新计算下
            if (time >= 0) {
                return secondToDate(time / 1000)
            }
        },
        onScroll({target: {scrollTop}}) {
            let messageListNode = this.$refs['message-list']
            if (!messageListNode) {
                return
            }
            if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                this.isShowScrollButtomTips = false
            }
        },
        // 如果滚到底部就保持在底部，否则提示是否要滚到底部
        keepMessageListOnButtom() {
            let messageListNode = this.$refs['message-list']
            if (!messageListNode) {
                return
            }
            // 距离底部20px内强制滚到底部,否则提示有新消息
            if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
                this.$nextTick(() => {
                    messageListNode.scrollTop = messageListNode.scrollHeight
                })
                this.isShowScrollButtomTips = false
            } else {
                this.isShowScrollButtomTips = true
            }
            this.preScrollHeight = messageListNode.scrollHeight
        },
        // 直接滚到底部
        scrollMessageListToButtom() {
            this.$nextTick(() => {
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                messageListNode.scrollTop = messageListNode.scrollHeight
                this.preScrollHeight = messageListNode.scrollHeight
                this.isShowScrollButtomTips = false
            })
        },
        onImageLoaded() {
            this.keepMessageListOnButtom()
        },
        // 退诊
        async refund() {
            let that = this
            this.$confirm('确定要退诊吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let param = {
                    id: this.currentConversationPro.id,
                    refundType: 1
                }
                let res = await this.$post('/sino-medical/appointment/refund', param)
                if (res && res.code === 200) {
                    this.disabled = false
                    // 1. 刷新会话列表 关闭当前页面  2. 关闭sdk的会话记录  3.清空门诊病历和门诊处方
                    this.$store.commit('session/UPDATECURRENTCONVERSATIONPRO', {})
                    this.$store.commit('interrogation/EXITOUTVIDEO')
                    let params = {
                        current: 1,
                        doctorId: this.userInfo.account_id,
                        size: 100
                    }
                    that.$store.dispatch('session/UPDATECONVERSATIONLIST', params)
                    Message({type: 'success', message: '退诊成功'})
                } else {
                    Message({type: 'error', message: res.msg})
                    this.disabled = false
                }
            }).catch(() => {
                /*  */
            })
        },
        // 接诊
        async accept() {
            let param = {
                id: this.currentConversationPro.id
            }
            let res = await this.$post('/sino-medical/appointment/accept', param)
            if (res && res.code === 200) {
                Message({type: 'success', message: '接诊成功'})
                this.$store.commit('session/UPDATERECEPTION', {receptionShow: true})
                let params = {
                    current: 1,
                    doctorId: this.userInfo.account_id,
                    size: 100
                }
                this.$store.dispatch('session/UPDATECONVERSATIONLIST', params)
            } else {
                Message({type: 'error', message: res.msg})
            }
        },
        // 查看更多消息
        async showMore() {
            let current = this.current + 1
            this.$store.commit('session/UPDATECURRENT', current)
            let params = {
                // godId: this.currentConversationPro.godId,
                reflectId: this.currentConversationPro.id,
                current: this.current,
                size: this.size
            }

            let res = await this.$get(this.$api.medical.getbyReflect, params)
            if (res.code === 200) {
                if (this.current * this.size > res.data.total) {
                    console.log('显示完成1')
                    this.$store.commit('session/CHANGECOMPLETED', true)
                } else {
                    this.$store.commit('session/CHANGECOMPLETED', false)
                    console.log('没有显示完成1')
                }
                this.$store.commit('session/GETMESSAGELISTPRO', JSON.parse(JSON.stringify(res.data.records)))
                console.log(res, '获取更多聊天记录')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.current-conversation-wrapper {
    height: 75vh;
    background-color: #FFFFFF;
    color: #1c2438;
    display: flex;
    .current-conversation {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 75vh;
        .content {
            display: flex;
            flex: 1;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            position: relative;
            .message-list {
                width: 100%;
                box-sizing: border-box;
                overflow-y: auto;
                padding: 0 10px;
                .more {
                    display: flex;
                    justify-content: center;
                    font-size: 12px;
                }
                .no-more {
                    display: flex;
                    justify-content: center;
                    color: #a5b5c1;
                    font-size: 12px;
                    padding: 10px 10px;
                }
            }
            .newMessageTips {
                position: absolute;
                cursor: pointer;
                padding: 5px;
                width: 120px;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 5px;
                font-size: 12px;
                text-align: center;
                border-radius: 10px;
                border: #e9eaec 1px solid;
                background-color: #ffffff;
                color: #2d8cf0;
            }
        }
        .footer {
            border-top: 1px solid #e7e7e7;
        }
        .footer-un-inquiry {
            border-top: 1px solid #e7e7e7;
            .un-inquiry-con {
                display: flex;
                flex-direction: column;
                align-items: center;
                .con-item {
                    &:first-child {
                        color: #2d8cf0;
                    }
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>

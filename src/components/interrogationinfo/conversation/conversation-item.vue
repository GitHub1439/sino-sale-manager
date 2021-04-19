<template>
    <div
        class="item-con"
        :class="{ 'choose': conversation.godId === currentConversationPro.godId }"
        @click="selectConversation"
    >
        <!--<div class="close-btn">
            <span class="con-close" title="删除会话" @click="deleteConversation"></span>
        </div>-->
        <div class="row-1">
            <div class="row-1-title">
                <img :src="conversation.godAvatar">
                <div class="row-title">
                    <div
                        class="title title-name"
                        :title="conversation.patientName"
                    >
                        {{conversation.patientName}}
                    </div>
                    <div class="title">{{conversation.patientSex}}</div>
                    <div class="title title-age">{{conversation.patientAge}}岁</div>
                </div>
            </div>
            <div class="unread-count">
                <span class="badge" v-if="showUnreadCount">
                    {{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}
                </span>
            </div>
        </div>
        <div class="row-2">
            <div class="tex-2">
                <span class="text-2-msg">
                    {{messageForShow}}
                </span>
                <!--<span class="text-2-msg" :title="conversation.payload[0].msgContent ? conversation.payload[0].msgContent.Text : ''">
                    {{conversation.payload[0].msgContent ? conversation.payload[0].msgContent.Text : ''}}
                </span>-->
                <span>{{date}}</span>
            </div>
        </div>
        <div class="row-3">
            <div v-if="conversation.status == 2" class="row-3-item">
                <div>
                    <span class="inquiry-3">{{conversation.statusName}}</span>
                    <span>{{timer(timeAll)}}</span>
                </div>
                <div>
                    <span v-if="conversation.orderType == 4"><el-tag effect="plain">咨询</el-tag></span>
                    <span v-else><el-tag effect="plain">复诊</el-tag></span>
                </div>
            </div>
            <div v-else>
                <div class="row-3-item">
                    <div class="inquiry-3">{{conversation.statusName}}</div>
                    <div>
                        <span v-if="conversation.orderType == 4"><el-tag effect="plain">咨询</el-tag></span>
                        <span v-else><el-tag effect="plain">复诊</el-tag></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {isToday, getDate, getTime, secondToDate} from '../../../utils/date'
import {Message} from 'element-ui'
export default {
    name: 'ConversationItem',
    props: {
        conversation: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            // 已接诊倒计时和定时器
            ticker: null,
            time: '',
            // 未接诊倒计时和定时器
            unTime: '',
            unTicker: null,
            size: 15,
            current: 1

        }
    },
    created() {
        this.print()
        this.time = new Date(this.conversation.endInquiryTime).getTime() - new Date().getTime()
        this.unTime = new Date(this.conversation.endAcceptTime).getTime() - new Date().getTime()
        if (this.ticker) { // 这一段是防止进入页面出去后再进来计时器重复启动
            clearInterval(this.ticker)
        } else if (this.unTicker) {
            clearInterval(this.ticker)
        }
        this.beginTimer()
    },
    mounted() {
        this.$once('hook:beforeDestroy', ()=>{
            clearInterval(this.ticker)
            clearInterval(this.unTicker)
        })
    },
    computed: {
        ...mapGetters(['hidden']),
        timeAll: {
            get() {
                return this.time
            }
        },
        showUnreadCount() {
            if (this.$store.getters.hidden) {
                return this.conversation.unreadCount > 0
            }
            // 是否显示未读计数。当前会话和未读计数为0的会话，不显示。
            return (
                this.currentConversationPro.godId !==
                this.conversation.godId && this.conversation.unreadCount > 0
            )
        },
        date() {
            if (
                !this.conversation ||
                !this.conversation.longMsgTime
            ) {
                return ''
            }
            const date = new Date(this.conversation.longMsgTime * 1000)
            if (isToday(date)) {
                return getTime(date)
            }
            return getDate(date)
        },
        conversationName() {
            if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
                return this.conversation.userProfile.nick || this.conversation.userProfile.userID
            }
            if (this.conversation.type === this.TIM.TYPES.CONV_GROUP) {
                return this.conversation.groupProfile.name || this.conversation.groupProfile.groupID
            }
            if (this.conversation.type === this.TIM.TYPES.CONV_SYSTEM) {
                return '系统通知'
            }
            return ''
        },
        messageForShow() {
            if (this.conversation.msgType === 'TIMCustomElem') {
                return  '[自定义消息]'
            } else if (this.conversation.msgType === 'TIMImageElem') {
                return  '[图片]'
            }
            return  this.conversation.payload.text
        },
        ...mapState({
            currentConversationPro: state => state.session.currentConversationPro,
            currentUserProfile: state => state.user.currentUserProfile
        })
    },
    methods: {
        print() {
            console.log(this.conversation, 'conversation')
            console.log(this.currentConversation, 'currentConversation')
        },
        selectConversation() {
            if (this.conversation.godId !== this.currentConversationPro.godId) {
                this.$store.dispatch(
                    'session/CHECKOUTCONVERSATION',
                    this.conversation
                )
                // 请求聊天记录
                // this.getRecord(this.currentConversationPro.godId)
                this.getRecord(this.currentConversationPro.id)
                // 修改内容上的导航文案  1、待就诊；2、就诊中；
                if (this.conversation.status === 1) {
                    this.$store.commit('session/UPDATERECEPTION', {receptionShow: false})
                } else if (this.conversation.status === 2) {
                    this.$store.commit('session/UPDATERECEPTION', {receptionShow: true})
                }
                // 保存当前选中的患者信息
                this.$store.commit('session/UPDATECURRENTCONVERSATIONPRO', this.conversation)
                // 保存就诊流水号
                console.log(this.conversation)
                this.$store.commit('interrogation/CURRENTPATIENTINFO', this.conversation)
                // 保存选择接诊人的信息
                this.print()
                // 保存选择接诊人的信息
                let patientBasicData = {
                    patientName: this.conversation.patientName,
                    patientSex: this.conversation.patientSex === '男' ? 1 : 2,
                    patientAge: this.conversation.patientAge,
                    scheduleDate: this.conversation.scheduleDate,
                    scheduleName: '',
                    deptName: this.conversation.deptName,
                    idCard: this.conversation.patientIdcard,
                    phone: this.conversation.patientPhone,
                    height: '',
                    birthday: '',
                    type: '',
                    id: this.conversation.id,
                    checkImgUrl: '',
                    healthStatus: ''
                }
                // 病人基础信息，包含姓名、年龄等
                this.$store.commit('interrogation/PATIENTBASICDATA', patientBasicData)
                // 把每个患者的门诊病历和门诊处方信息清掉，在切换前
                this.getPatientDetail()
                // 切换的时候更新互联网病历和医院病历
                this.$bus.$emit('get-hospital')
                this.$bus.$emit('get-internet', 'imageText')
                // 需要把中间的tab切到病情沟通
                if (this.conversation.orderType === 4) {
                    this.$bus.$emit('change-tab')
                }
                // 清除未就诊的定时器
                this.$bus.$emit('clear-end-time')
                // 选择的类型是视频，判断复制病历是否显示逻辑
                this.$store.commit('session/UPDATEISVIDEOORTEXT', 'image')
            }
        },
        deleteConversation(event) {
            // 停止冒泡，避免和点击会话的事件冲突
            event.stopPropagation()
            this.tim
                .deleteConversation('C2CD1123598821738675201')
                .then(() => {
                    this.$store.commit('showMessage', {
                        message: '会话删除成功!',
                        type: 'success'
                    })
                    // this.popoverVisible = false
                    // this.$store.commit('conversation/RESETCURRENTCONVERSATION')
                })
                .catch(error => {
                    this.$store.commit('showMessage', {
                        message: '会话【删除失败!' + error,
                        type: 'error'
                    })
                    this.popoverVisible = false
                })
        },
        beginTimer() { // 这个计时器是每秒减去指定字段的时间
            // 已接诊定时器
            this.ticker = setInterval(() => {
                if (this.time > 0) {
                    this.time = this.time - 1000
                } else if (this.time <= 0) {
                    clearInterval(this.ticker)
                    this.overtimeClose()
                }
            }, 1000)

            // 未接诊定时器
            this.unTicker = setInterval(() => {
                if (this.unTime > 0) {
                    this.unTime = this.unTime - 1000
                    // 待接诊，存倒计时
                    // this.$store.commit('session/UPDATEUNREPENDTIME', {unTime: secondToDate(this.unTime / 1000)})
                } else if (this.unTime <= 0) {
                    clearInterval(this.unTicker)
                    this.refund()
                }
            }, 1000)

        },
        timer(time) { // 这个函数是每秒把时间重新计算下
            if (time >= 0) {
                return secondToDate(time / 1000)
            }
        },
        // 自动退诊
        async refund() {
            let param = {
                id: this.conversation.id
            }
            let res = await this.$post('/sino-medical/appointment/refund', param)
            if (res && res.code === 200) {
                Message({type: 'success', message: '退诊成功'})
            } else {
                Message({type: 'error', message: '退诊失败'})
            }
        },
        //  请求聊天记录
        async getRecord(id) {
            let params = {
                // godId: id,
                reflectId: id,
                current: this.current,
                size: this.size
            }
            let res = await this.$get(this.$api.medical.getbyReflect, params)
            if (res.code === 200) {
                if (this.current * this.size > res.data.total) {
                    this.$store.commit('session/CHANGECOMPLETED', true)
                } else {
                    this.$store.commit('session/CHANGECOMPLETED', false)
                }
                this.$store.commit('session/GETMESSAGELISTPRO', JSON.parse(JSON.stringify(res.data.records)))
                console.log(res, '聊天记录')
            }
        },
        async getPatientDetail() {
            // console.log(this.conversation.patientId)
            let param = {profileId: this.conversation.patientId}
            let {code, data, msg} = await this.$get(this.$api.medical.userProfileDetail, param)
            if (code === 200) {
                console.log(data)
                this.$store.commit('interrogation/PATIENTBASICDATA', data)
            } else {
                this.$message(msg)
            }
        },
        // 已接诊超时退
        async overtimeClose() {
            let param = {
                id: this.conversation.id // 挂号id
            }
            let res = await this.$post('/sino-medical/appointment/refund', param)
            if (res.code === 200) {
                console.log('超时退诊成功')
            }
        }

    }
}
</script>

<style lang="scss" scoped>
    .item-con {
        padding:8px 12px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        overflow: hidden;
        transition: .2s;
        position: relative;
        &:hover {
            background: #ECECEC;
            .close-btn {
                right: 3px;
            }
        }
        .close-btn {
            position: absolute;
            right: -20px;
            top: 3px;
            color: #606060;
            transition: all .2s ease;
            &:hover {
                color: #fb5250;
            }
            .con-close:after {
                font-size: 25px;
                content: "\d7";
            }
        }

        &:first-child {
            border-top: 1px solid #ccc;
        }
        .row-1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .row-1-title {
                width: 100%;
                display: flex;
                .title-name {
                    white-space:nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .title-age {
                    width: 36px;
                }
            }
            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
                border-radius: 50%;
                flex-shrink: 0;
            }
            .row-title {
                height: 35px;
                line-height: 35px;
                display: flex;
                .title {
                    font-size: 16px;
                    margin-right: 10px;
                }
            }
            .unread-count {
                margin-top: 8px;
                display: inline-block;
                font-size: 15px;
                padding-left: 10px;
                flex-shrink: 0;
                color: #76828c;
                .badge {
                    vertical-align: bottom;
                    background-color: #f35f5f;
                    border-radius: 10px;
                    color: #FFF;
                    display: inline-block;
                    font-size: 12px;
                    height: 18px;
                    max-width: 40px;
                    line-height: 18px;
                    padding: 0 6px;
                    text-align: center;
                    white-space: nowrap;
                }
            }
        }
        .row-2 {
            margin-bottom: 10px;
            .tex-2 {
                display: flex;
                justify-content: space-between;
                .text-2-msg {
                    color: #6A7682;
                    white-space:nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .row-3 {
            color: #1081EE;
            .inquiry-3 {
                margin-right: 20px;
            }
            .row-3-item {
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .choose {
        background-color: #ECECEC;
    }

</style>

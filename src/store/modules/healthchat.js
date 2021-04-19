/* eslint-disable no-shadow */
import {sortArrayData} from '@/utils'
import httpRequest from '@/utils/http'
const state = {
    socketIo: null,
    socketIostatus: '', // 链接状态
    setStatus: true, // 服务设置状态,默认打开
    ticketId: '', // 每次的会话ID
    profileId: '', // 当前选中的用户会话imAccountId
    profileInfo: '', // 左侧列表选中用户的数据
    sessionList: [], // 组册会话或者待处理的数据
    userlistStatus: 0, // 左侧列表的状态（0处理中、1待处理、2已结束）
    toggleProfileId: '', // 右侧切换用户时的档案id
    toggleProfileInfo: '', // 右侧切换选中用户的档案数据
    currentConversationMessageList: [], // 选中的会话用户的消息数据
    currentConversationMessageListRecord: [], // 查看聊天记录的消息数据
    tmInfoToken: '', // 登录甜蜜账号的token
    tmURL: window.SITE_CONFIG.tmfromUrl, // 甜蜜的请求接口地址
    healthRecordInfo: '', // 健康档案信息
    tasksNum: 0 // 待办任务数量
}

const mutations = {
    SETSTATUS(state, v) {
        state.setStatus = v
    },
    SOCKETIOSTATUS(state, str) {
        state.socketIostatus = str
    },
    CONNECTIONSOCKET(state, v) {
        state.socketIo = v
    },
    UPDATETICKETID(state, v) {
        state.ticketId = v
    },
    UPDATEPROFILEID(state, v) {
        state.profileId = v
    },
    UPDATESESSIONLIST(state, data) {
        state.sessionList = data
    },
    UPDATEPROFILEINFO(state, v) {
        state.profileInfo = v
    },
    UPDATEUSERLISTSTATUS(state, v) {
        state.userlistStatus = v
    },
    UPDATETOGGLEPROFILEID(state, v) {
        state.toggleProfileId = v
    },
    UPDATETOGGLEPROFILEINFO(state, v) {
        state.toggleProfileInfo = v
    },
    UPDATECURRENTCONVERSATIONMESSAGELIST(state, v) {
        state.currentConversationMessageList = v
    },
    UPDATECURRENTCONVERSATIONMESSAGELISTRECORD(state, v) {
        state.currentConversationMessageListRecord = v
    },
    PUSHCURRENTMESSAGELIST(state, item) {
        if (state.ticketId === item.ticketId) { // 如果选中的会话 和推送过来的数据是对应时  添加到消息
            state.currentConversationMessageList.push(item)
            this.dispatch('healthchat/READCLEAR', item)
        }
        let sessionList = JSON.parse(localStorage.getItem('sessionList')) || []
        let current = sessionList.findIndex(v => v.ticketId === item.ticketId)
        if (current < 0) return
        let currentItem = sessionList.find(v => v.ticketId === item.ticketId)
        const types = {image: '[图片]', custom: '[链接]', media: '[文件]', voice: '[语音]', video: '[视频]', emoji: '[自定义表情]'}

        sessionList[current].lastRecord = Object.keys(types).includes(item.msgType) ? types[item.msgType] : item.data.content // 最后一条记录
        sessionList[current].lastRecordType = item.msgType // 消息类型
        if (state.ticketId !== item.ticketId) { // 处理消息未读数
            sessionList[current].notReadCount = sessionList[current].notReadCount + 1
        }
        sessionList[current].lastRecordTime = item.messageTime// timeParse(item.messageTime, 'yyyy-MM-dd HH:mm:ss')
        sessionList[current].record.push(item)

        console.log('noticeNum: ', sessionList.reduce((total, e) => total + Number(e.notReadCount), 0))

        const sortdata = sortArrayData(sessionList, currentItem) // 把最新的聊天数据放到最前面
        console.log('sortdata', sortdata)
        localStorage.setItem('sessionList', JSON.stringify(sortdata)) // 缓存到本地，用来做查询处理
        this.commit('healthchat/UPDATESESSIONLIST', sortdata)
    },
    UPDATETMTOKEN(state, token) {
        state.tmInfoToken = token
    },
    UPDATETMURL(state, url) {
        state.tmURL = url
    },
    UPDATEHEALTHRECORDINFO(state, v) {
        state.healthRecordInfo = v
    },
    UPDATETASKSNUM(state, v) {
        state.tasksNum = v
    }
}

const actions = {
    async READCLEAR(context, item) {
        let {code} = await httpRequest.postData('/sino-chat/health/manager/imrecord/not/read/clear', {imAccountId: item.imAccountId})
        if (code === 200) {
            console.log('reflush')
        }
    },
    async ADDLOG(context, arg) {
        let {code} = await httpRequest.postData('/sino-public/ticket-service-log/add-log', arg)
        if (code === 200) {
            console.log('add log')
        }
    }
}

const getters = {
    getSetStatus(state) {
        return state.setStatus
    },
    getTicketId(state) {
        return state.ticketId
    },
    getProfileId(state) {
        return state.profileId
    },
    getProfileInfo(state) {
        return state.profileInfo
    },
    getSessionList(state) {
        return state.sessionList
    },
    getUserlistStatus(state) {
        return state.userlistStatus
    },
    getToggleProfileId(state) {
        return state.toggleProfileId
    },
    getCurrentConversationMessageList(state) {
        return state.currentConversationMessageList
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

import tim from '@/utils/timClient'
import TIM from 'tim-js-sdk'
import store from '..'
import {titleNotify} from '../../utils'
import httpRequest from '@/utils/http'
import API from '../../config/api'
import {Message} from 'element-ui'
export default {
    namespaced: true,
    state: {
        isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息  true 已拉取完，不显示"查看更多"
        conversationList: [], // 当前会话列表,有哪些人正在聊
        currentConversation: {}, // 当前选中的会话信息
        currentConversationPro: {}, // 项目当前选中的会话信息患者id
        currentMessageList: [], // 当前会话消息列表，发送的消息
        nextReqMessageID: '',
        receptionShow: true, // 根据接诊状态聊天内容导航文案变更
        unReceptionEndTime: '',
        callPatient: {}, // 当前登录人的信息
        current: 1, // 聊天记录当前页
        size: 15, // 聊天记录页数数量
        customImgList: [], // 自定义消息模板图片展示
        message: undefined,
        isVideoOrText: ''
    },
    getters: {
        toAccount: state => {
            if (!state.currentConversationPro || !state.currentConversationPro.godId) {
                return ''
            }
            switch (state.currentConversation.type) {
            case 'C2C':
                return state.currentConversation.conversationID.replace('C2C', '')
            case 'GROUP':
                return state.currentConversation.conversationID.replace('GROUP', '')
            default:
                return state.currentConversation.conversationID
            }
        },
        currentConversationType: state => {
            if (!state.currentConversation || !state.currentConversation.type) {
                return ''
            }
            return state.currentConversation.type
        },
        // 总共未读消息数量，显示在title
        totalUnreadCount: state => {
            const result = state.conversationList.reduce((count, conversation) => {
                // 当前会话不计算总未读
                if (!store.getters.hidden && state.currentConversationPro.conversationID === conversation.conversationID) {
                    return count
                }
                return count + conversation.unreadCount
            }, 0)
            titleNotify(result)
            return result
        },
        imgUrlList: state => {
            return state.currentMessageList
                .filter(message => message.type === TIM.TYPES.MSG_IMAGE && !message.isRevoked) // 筛选出没有撤回并且类型是图片类型的消息
                .map(message => message.payload.imageInfoArray[0].url)
        }
    },
    mutations: {
        /**
         * 更新会话列表
         * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
         * @param {Object} state
         * @param {Object} res
         */
        UPDATECONVERSATIONLIST(state, res) {
            if (res && res.code === 200) {
                state.conversationList = res.data.records
            } else {
                state.conversationList = res
            }
        },
        /**
         * 更新当前会话
         * 调用时机: 切换会话时
         * @param {Object} state
         * @param {Conversation} conversation
         */
        UPDATECURRENTCONVERSATION(state, conversation) {
            state.currentConversation = conversation
            state.currentMessageList = []
            state.nextReqMessageID = ''
            state.isCompleted = false
        },
        /**
         * 项目更新当前会话
         * 调用时机: 切换会话时
         * @param {Object} state
         * @param {Conversation} conversation
         */
        UPDATECURRENTCONVERSATIONPRO(state, conversation) {
            state.currentConversationPro = conversation
            state.currentMessageList = []
            state.nextReqMessageID = ''
            state.isCompleted = false
        },
        /**
         * 将消息插入当前会话列表
         * 调用时机：收/发消息事件触发时
         * @param {Object} state
         * @param {Message[]|Message} data
         * @returns
         */
        PUSHCURRENTMESSAGELIST(state, data) {
            // 还没当前会话，则跳过
            if (!state.currentConversationPro.godId) {
                return
            }
            if (Array.isArray(data)) {
                // 筛选出当前会话的消息
                const result = data.filter(item => item.conversationID.substr(3) === state.currentConversationPro.godImAcount)
                // state.currentMessageList = [...state.currentMessageList, ...result]
                let listNow = [...state.currentMessageList, ...result]
                state.currentMessageList = [...new Set(listNow)]
            //    "C2CD1298500002059579393"      godImAcount  : "D1298500002059579393"
            } else if (data.conversationID.substr(3) === state.currentConversationPro.godImAcount) {
                // state.currentMessageList = [...state.currentMessageList, data]
                let listNow = [...state.currentMessageList, data]
                state.currentMessageList = [...new Set(listNow)]
            }
        },
        UPDATEUNREPENDTIME(state, data) {
            state.unReceptionEndTime = data.unTime
        },
        /**
         * 重置当前会话
         * 调用时机：需要重置当前会话时，例如：当前会话是一个群组，正好被踢出群时（被踢群事件触发），重置当前会话
         * @param {Object} state
         */
        RESETCURRENTCONVERSATION(state) {
            state.currentConversation = {}
        },
        /**
         * 选择会话判断聊天内容上导航是否变更文案
         * 调用时机：重新选择对话人
         * @param {Object} state
         */
        UPDATERECEPTION(state, data) {
            state.receptionShow = data.receptionShow
        },
        // 视频问诊开房信息
        CALLPATIENT(state, val) {
            Object.assign(state.callPatient, val)
        },
        // 获取消息列表
        GETMESSAGELISTPRO (state, val) {
            state.currentMessageList = [...val.reverse(), ...state.currentMessageList]
        },
        // 修改信息拉取状态
        CHANGECOMPLETED(state, val) {
            state.isCompleted = val
        },
        // 更新当前页
        UPDATECURRENT(state, current) {
            state.current = current
        },
        /**
         * 更新模板消息图片列表
         * 调用时机：点击模板图片
         * @param {Object} state
         * @param {list[]} list
         */
        UPDATECUSTOMIMGIMG(state, list) {
            state.customImgList = [...list]
        },
        /**
         * 提示信息
         * @param state
         * @param options
         */
        SHOWMESSAGE(state, options) {
            if (state.message) {
                state.message.close()
            }
            state.message = Message({
                message: options.message,
                type: options.type || 'success',
                duration: options.duration || 2000,
                offset: 40
            })
        },
        UPDATEISVIDEOORTEXT(state, name) {
            state.isVideoOrText = name
        }
    },
    actions: {
        /**
         * 获取消息列表
         * 调用时机：打开某一会话时或下拉获取历史消息时
         * @param {Object} context
         * @param {String} conversationID
         */
        async GETMESSAGELIST(context) {
            /* if (context.state.isCompleted) {
                context.commit('showMessage', {
                    message: '已经没有更多的历史消息了哦',
                    type: 'info'
                })
                return
            }
            const {nextReqMessageID, currentMessageList} = context.state
            tim.getMessageList({conversationID, nextReqMessageID, count: 15}).then(imReponse => {
                // 更新messageID，续拉时要用到
                context.state.nextReqMessageID = imReponse.data.nextReqMessageID
                context.state.isCompleted = imReponse.data.isCompleted
                // 更新当前消息列表，从头部插入
                context.state.currentMessageList = [...imReponse.data.messageList, ...currentMessageList]
            }) */
            context
        },
        /**
         * 切换会话
         * 调用时机：切换会话时
         * @param {Object} context
         * @param {String} conversationID
         */
        CHECKOUTCONVERSATION(context, conversation) {
            // 1.切换会话前，将切换前的会话进行已读上报
            if (context.state.currentConversationPro.godImAcount) {
                const prevConversationID = 'C2C' + context.state.currentConversation.godImAcount
                tim.setMessageRead({conversationID: prevConversationID})
                let list = context.state.conversationList   // UPDATECONVERSATIONLIST
                for (let i = 0; i < list.length; i++) {
                    if (list[i].godImAcount === context.state.currentConversationPro.godImAcount) {
                        list[i].unreadCount = 0
                    }
                }
                context.commit('UPDATECONVERSATIONLIST', list)
            }
            // 2.待切换的会话也进行已读上报
            tim.setMessageRead({conversationID: 'C2C' + conversation.godImAcount})
            context.commit('UPDATECURRENTCONVERSATIONPRO', conversation)
            context.dispatch('GETMESSAGELIST', conversation.godId)
        },
        /**
         *更新会话列表
         */
        async UPDATECONVERSATIONLIST({commit}, params) {
            commit('UPDATECONVERSATIONLIST', await httpRequest.postData(API.medical.imList, params))
        }
    }
}

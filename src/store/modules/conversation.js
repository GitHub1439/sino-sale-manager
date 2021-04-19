import tim from '@/utils/timClient'
import TIM from 'tim-js-sdk'
import store from '..'
import {titleNotify} from '../../utils'
export default {
    namespaced: true,
    state: {
        isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
        conversationList: [], // 当前会话列表,有哪些人正在聊
        currentConversation: {}, // 当前选中的会话
        currentMessageList: [], // 当前会话消息列表，发送的消息
        nextReqMessageID: ''
    },
    getters: {
        toAccount: state => {
            if (!state.currentConversation || !state.currentConversation.conversationID) {
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
            console.log('totalUnreadCount----------------')
            const result = state.conversationList.reduce((count, conversation) => {
                // 当前会话不计算总未读
                if (!store.getters.hidden && state.currentConversation.conversationID === conversation.conversationID) {
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
         * @param {Conversation[]} conversationList
         */
        UPDATECONVERSATIONLIST(state, conversationList) {
            state.conversationList = conversationList
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
         * 将消息插入当前会话列表
         * 调用时机：收/发消息事件触发时
         * @param {Object} state
         * @param {Message[]|Message} data
         * @returns
         */
        PUSHCURRENTMESSAGELIST(state, data) {
            // 还没当前会话，则跳过
            if (!state.currentConversation.conversationID) {
                return
            }
            if (Array.isArray(data)) {
                // 筛选出当前会话的消息
                const result = data.filter(item => item.conversationID === state.currentConversation.conversationID)
                state.currentMessageList = [...state.currentMessageList, ...result]
            } else if (data.conversationID === state.currentConversation.conversationID) {
                state.currentMessageList = [...state.currentMessageList, data]
            }
        },
        /**
         * 重置当前会话
         * 调用时机：需要重置当前会话时，例如：当前会话是一个群组，正好被踢出群时（被踢群事件触发），重置当前会话
         * @param {Object} state
         */
        RESETCURRENTCONVERSATION(state) {
            state.currentConversation = {}
        }
    },
    actions: {
        /**
         * 获取消息列表
         * 调用时机：打开某一会话时或下拉获取历史消息时
         * @param {Object} context
         * @param {String} conversationID
         */
        GETMESSAGELIST(context, conversationID) {
            if (context.state.isCompleted) {
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
            })
        },
        /**
         * 切换会话
         * 调用时机：切换会话时
         * @param {Object} context
         * @param {String} conversationID
         */
        CHECKOUTCONVERSATION(context, conversationID) {
            // context.commit('resetCurrentMemberList')
            // 1.切换会话前，将切换前的会话进行已读上报
            if (context.state.currentConversation.conversationID) {
                const prevConversationID = context.state.currentConversation.conversationID
                tim.setMessageRead({conversationID: prevConversationID})
            }
            // 2.待切换的会话也进行已读上报
            tim.setMessageRead({conversationID})
            // 3. 获取会话信息
            return tim.getConversationProfile(conversationID).then(({data}) => {
                // 3.1 更新当前会话
                context.commit('UPDATECURRENTCONVERSATION', data.conversation)
                // 3.2 获取消息列表
                context.dispatch('GETMESSAGELIST', conversationID)
                // 3.3 拉取第一页群成员列表
                /* if (data.conversation.type === TIM.TYPES.CONV_GROUP) {
                    return context.dispatch('getGroupMemberList', data.conversation.groupProfile.groupID)
                } */
                return Promise.resolve()
            })
        }
    }
}

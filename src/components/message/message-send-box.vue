<template>
    <div id="message-send-box-wrapper" :style="focus ? {'backgroundColor': 'white'} : {}" @drop="dropHandler">
        <div class="send-header-bar">
            <div class="bar-icon" @click="handleSendImageClick">
                <i><icon-svg name='imimg' class="bar-icon">图片</icon-svg></i>
                <span>图片</span>
            </div>
            <div class="bar-icon" @click="sendFastReplyVisible = true">
                <i><icon-svg name='imhuifu' class="bar-icon"></icon-svg></i>
                <span>快捷回复</span>
            </div>
        </div>
        <el-dialog
            :visible.sync="sendFastReplyVisible"
            width="20%"
            class="reply-dia"
            top="30%"
            :show-close="false"
        >
            <div class="fast-reply">
                <div v-for="item in fastInfoList" :key="item.id" class="reply-con" @click="sendFastReply(item.info)">
                    <!--<el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                        <div class="reply-item">{{item.info}}</div>
                    </el-tooltip>-->
                    <div class="reply-item">{{item.info}}</div>
                </div>
            </div>
        </el-dialog>
        <div class="bottom">
            <textarea
                ref="text-input"
                rows="5"
                resize="false"
                v-model="messageContent"
                class="text-input"
                @focus="focus = true"
                @blur="focus = false"
                @keydown.enter.exact.prevent="handleEnter"
                @keyup.ctrl.enter.prevent.exact="handleLine"
                placeholder="请输入回复内容"
            >
            </textarea>
            <el-tooltip
                class="item"
                effect="dark"
                content="按Enter发送消息，Ctrl+Enter换行"
                placement="left-start"
            >
                <div class="btn-send">
                    <el-button class="send-button" round type="info" plain @click="sendTextMessage">发送</el-button>
                    <!--<div class="tim-icon-send"></div>-->
                </div>
            </el-tooltip>
        </div>
        <input
            type="file"
            id="imagePicker"
            ref="imagePicker"
            accept=".jpg, .jpeg, .png, .gif"
            @change="sendImage"
            style="display:none"
        />
    </div>
</template>

<script>
// import {formatTime} from '../../utils/date'
import {mapGetters, mapState} from 'vuex'
export default {
    name: 'MessageSendBox',
    props: {
        scrollMessageListToButtom: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            focus: false,
            messageContent: '',
            sendFastReplyVisible: false,
            fastInfoList: [{
                id: 1,
                info: '您好，请问有什么可以帮助您的?'
            }, {
                id: 2,
                info: '请您尽量一次把您的问题描述清楚，这样能方便我们快速找到问题并给出解决方法'
            }]
        }
    },
    computed: {
        ...mapGetters('session', ['toAccount', 'currentConversationType']),
        ...mapState({
            currentConversationPro: state => state.session.currentConversationPro
        })
    },
    mounted() {
        this.$bus.$on('reEditMessage', this.reEditMessage)
    },
    methods: {
        // eslint-disable-next-line no-empty-function
        dropHandler() {

        },
        reEditMessage(payload) {
            this.messageContent = payload
        },
        handleEnter() {
            this.sendTextMessage()
        },
        handleLine() {
            this.messageContent += '\n'
        },
        sendTextMessage() {
            if (
                this.messageContent === '' ||
                this.messageContent.trim().length === 0
            ) {
                this.messageContent = ''
                this.$store.commit('showMessage', {
                    message: '不能发送空消息哦！',
                    type: 'info'
                })
                return
            }
            console.log(this.currentConversationPro, 'currentConversationPro')
            const message = this.tim.createTextMessage({
                to: this.currentConversationPro.godImAcount,
                conversationType: 'C2C',
                payload: {text: this.messageContent}
            })
            console.log(message, '发送的消息text')
            /* let messagePro = {
                fromAccount: message.from,
                godId: message.conversationID.substring(4, 23),
                msgTime: formatTime(message.time), // 时间戳
                msgType: message.type,
                payload: [{msgContent: {Text: message.payload.text}, msgType: 'TIMTextElem'}]
            } */
            this.$store.commit('session/PUSHCURRENTMESSAGELIST', message)
            this.$bus.$emit('scroll-bottom')
            this.tim.sendMessage(message).catch(error => {
                this.$store.commit('showMessage', {
                    type: 'error',
                    message: error.message
                })
            })
            this.messageContent = ''
        },
        sendFastReply(info) {
            this.messageContent = info
            // this.messageContent = info
            // this.sendTextMessage()
            this.sendFastReplyVisible = false
        },
        handleSendImageClick() {
            this.$refs.imagePicker.click()
        },
        sendImage() {
            const message = this.tim.createImageMessage({
                to: this.currentConversationPro.godImAcount,
                conversationType: 'C2C',
                payload: {
                    file: document.getElementById('imagePicker') // 或者用event.target
                },
                onProgress: percent => {
                    this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
                }
            })
            /* let messagePro = {
                fromAccount: message.from,
                godId: message.conversationID.substring(4, 23),
                msgTime: formatTime(message.time), // 时间戳
                msgType: message.type,
                payload: [{msgContent: {ImageInfoArray: [{URL: message.payload.imageInfoArray[0].url}]}, msgType: 'TIMImageElem'}]
            } */
            this.$store.commit('session/PUSHCURRENTMESSAGELIST', message)
            this.tim
                .sendMessage(message)
                // eslint-disable-next-line no-empty-function
                .then(() => {
                })
                .catch(imError => {
                    this.$store.commit('showMessage', {
                        message: imError.message,
                        type: 'error'
                    })
                })
            this.$refs.imagePicker.value = null
        }
    }
}
</script>

<style lang="scss" scoped>
    #message-send-box-wrapper {
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 20px 0px;
        .send-header-bar {
            box-sizing: border-box;
            display: flex;
            .bar-icon {
                &:hover {
                    color: #000000;
                }
                display: flex;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                color: gray;
                i {
                    font-size: 30px;
                    margin-right: 10px;
                }
                span {
                    margin-right: 15px;
                    font-size: 15px;

                }
            }

        }
        .reply-dia /deep/ .el-dialog__body {
            padding: 0 0 20px;
        }
        .reply-dia /deep/ .el-dialog__header {
            background-color: #fff;
        }
        .fast-reply {
            top:50%;
            .reply-con {
                cursor: pointer;
                &:hover {
                    background-color: #ECECEC;
                }
                border-bottom: 1px solid #f5f5f5;
                &:first-child {
                    border-top: 1px solid #f5f5f5;
                }
                .reply-item {
                    overflow: hidden;
                    width: 100%;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    word-break: keep-all;
                    padding:15px 20px;
                }
            }
        }
        textarea {
            resize: none;
        }
        .text-input {
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            border: none;
            outline: none;
            background-color: transparent;
        }
        .bottom {
            padding-top: 10px;
            position: relative;
            .btn-send {
                cursor: pointer;
                position: absolute;
                color: #2d8cf0;
                font-size: 30px;
                right: 0;
                bottom: 0px;
                padding: 6px 6px 4px 4px;
                .send-button {
                }
            }
        }
    }

</style>

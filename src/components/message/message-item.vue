<template>
    <div class="message-wrapper" :class="messagePosition">
        <div class="c2c-layout" :class="messagePosition">
            <div class="col-1" v-if="showAvatar">
                <img src="https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png" alt="">
            </div>
            <div clas="col-2">
                <div class="content-wrapper">
                    <text-element
                        v-if="message.type === 'TIMTextElem'"
                        :is-mine="isMine"
                        :payload="message.payload"
                        :message="message"
                    />
                    <image-element
                        v-else-if="message.type === 'TIMImageElem'"
                        :is-mine="isMine"
                        :payload="message.payload"
                        :message="message"
                    />
                    <custom-element
                        v-else-if="message.type === 'TIMCustomElem' && message.payload.type == 1"
                        :is-mine="isMine"
                        :payload="message.payload"
                        :message="message"
                    ></custom-element>
                    <custom-evalue
                        v-else-if="message.type === 'TIMCustomElem' && message.payload && message.payload.one && message.payload.type !== 1"
                        :is-mine="isMine"
                        :payload="message.payload"
                        :message="message"
                    ></custom-evalue>
                </div>
                <message-footer :message="message" />
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import TextElement from './text-element.vue'
import ImageElement from './image-element.vue'
import MessageFooter from './message-footer'
import CustomElement from './custom-element'
import CustomEvalue from './custom-evalue'

export default {
    name: 'MessageItem',
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    components: {
        TextElement,
        ImageElement,
        MessageFooter,
        CustomElement,
        CustomEvalue
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            currentConversation: state => state.conversation.currentConversation,
            currentUserProfile: state => state.user.currentUserProfile
        }),
        isMine() {
            return this.message.from.substring(0, 1) === 'S'
        },
        messagePosition() {
            if (
                ['TIMGroupTipElem', 'TIMGroupSystemNoticeElem'].includes(
                    this.message.type
                )
            ) {
                return 'position-center'
            }
            if (this.message.isRevoked) { // 撤回消息
                return 'position-center'
            }
            if (this.isMine) {
                return 'position-right'
            }
            return 'position-left'

        },
        showAvatar() {
            if (this.currentConversation.type === 'C2C' && !this.message.isRevoked) {
                // C2C且没有撤回的消息
                return true
            } else if (this.currentConversation.type === 'GROUP' && !this.message.isRevoked) { // group且没有撤回的消息
                return this.message.type !== this.TIM.TYPES.MSG_GRP_TIP
            }
            return false
        }
    }
}
</script>

<!--<style lang="scss" scoped>
    .message-wrapper {
        margin: 20px 0;
        .c2c-layout {
            display: flex;
            .col-1 {
                img {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
                }
            }
            .col-2 {
                display: flex;
                flex-direction: column;
            }
            &.position-left {
                flex-direction: row-reverse;
                .col-2 {
                    align-items: flex-end;
                }
            }

            &.position-right {
                flex-direction: row-reverse;
                .col-2 {
                    align-items: flex-end;
                }
            }

            &.position-center {
                justify-content: center;
            }
        }
        .content-wrapper {
            display: flex;
            align-items: center;
        }
    }

</style>-->
<style lang="scss" scoped>
    .message-wrapper {
        margin: 20px 0;

        .content-wrapper {
            display: flex;
            align-items: center;
        }
    }

    .group-layout, .c2c-layout, .system-layout {
        display: flex;

        .col-1 {
            img {
                width: 46px;
                height: 46px;
                border-radius: 50%;
                box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
            }
        }

        .group-member-avatar {
            cursor: pointer;
        }

        .col-2 {
            display: flex;
            flex-direction: column;
            // max-width 50% // 此设置可以自适应宽度，目前由bubble限制
        }

        .col-3 {
            width: 30px;
        }

        &.position-left {
            .col-2 {
                align-items: flex-start;
            }
        }

        &.position-right {
            flex-direction: row-reverse;

            .col-2 {
                align-items: flex-end;
            }
        }

        &.position-center {
            justify-content: center;
        }
    }

    .c2c-layout {
        .col-2 {
            .base {
                margin-top: 3px;
            }
        }
    }

    .group-layout {
        .col-2 {
            .chat-bubble {
                margin-top: 5px;
            }
        }
    }
</style>

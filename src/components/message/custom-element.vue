<template>
    <message-bubble :is-mine=isMine :message=message>
        <template>
            <div class="custom">
                <div class="custom-info">
                    <span>{{payload.msgContent.patientName}}</span>
                    <span>{{payload.msgContent.patientSex}}</span>
                    <span>{{payload.msgContent.patientAge}}</span>
                </div>
                <div class="status">病情描述：{{payload.msgContent.diseaseDesc}}</div>
                <div class="status">是否有过敏史：{{payload.msgContent.hasAllergy}}{{payload.msgContent.allergyDetail?'（'+payload.msgContent.allergyDetail+'）':''}}</div>
                <div class="status">是否出现不良反应：{{payload.msgContent.hasReactions}}{{payload.msgContent.reactionsDetail?'（'+payload.msgContent.reactionsDetail+'）':''}}</div>
                <div class="describe">
                    <div class="describe-img" @click="handlePreview(item)" v-for="item in payload.msgContent.checkImgUrl" :key="item.id">
                        <img :src="item" alt="病情描述或确诊图片">
                    </div>
                </div>
            </div>
        </template>
    </message-bubble>
</template>

<script>
import MessageBubble from './message-bubble'
export default {
    name: 'CustomElement',
    components: {
        MessageBubble
    },
    props: {
        payload: {
            type: Object,
            required: true
        },
        message: {
            type: Object,
            required: true
        },
        isMine: {
            type: Boolean
        }
    },
    created() {
        console.log(this.message, '自定义消息message')
        console.log(this.payload, '自定义消息payload')
    },
    methods: {
        handlePreview(item) {
            this.$store.commit('session/UPDATECUSTOMIMGIMG', this.payload.msgContent.checkImgUrl)
            this.$bus.$emit('custom-preview', {
                url: item
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .custom {
        font-size: 14px;
        padding: 12px;
        .custom-info {
            span {
                margin-right: 20px;
            }
            margin-bottom: 8px;
        }
        .status {
            margin-bottom: 8px;
        }
        width: 100%;
        .describe {
            max-width: 500px;
            display: flex;
            flex-wrap: wrap;
            .describe-img {
                width: 80px;
                cursor: zoom-in;
                height: 80px;
                margin: 0 10px 10px 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

</style>

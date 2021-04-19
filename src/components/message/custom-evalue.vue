<template>
    <message-bubble :is-mine=isMine :message=message>
        <template>
            <div class="custom">
                <div class="custom-info">
                    诊前问卷
                </div>
                <div class="status">
                    <p>1、您当前的身高、体重、腰围情况如何：</p>
                    <div class="detail">
                        <p>身高：{{payload.newone.height}} cm</p>
                        <p>体重：{{payload.newone.weight}} kg</p>
                        <p>腰围：{{payload.newone.waistline}} cm</p>
                        <p>BMI：{{payload.newone.bmi}}</p>
                    </div>
                </div>
                <div class="status">
                    <p>2. 您最近血糖控制的情况如何？</p>
                    <div class="detail">
                        <p>空腹血糖在{{payload.one.kfLow ? payload.one.kfLow : 0}}mmol/L 到 {{payload.one.kfHigh ? payload.one.kfHigh : 0}}mmol/L之间</p>
                        <p>餐后血糖在{{payload.one.bfLow ? payload.one.bfLow : 0}}mmol/L 到 {{payload.one.bfHigh ? payload.one.bfHigh : 0}}mmol/L之间</p>
                    </div>
                </div>
                <div class="status">
                    <p>3. 有没有低血糖症状出现？{{payload.two.boolean === 1 ? '是' : '否'}} {{payload.two.twoAnser ? '（'+payload.two.twoAnser+'）':''}}</p>
                </div>
                <div class="status">
                    <p>4. 近期有没有新增加的不适症状？{{payload.three.boolean === 1 ? '是' : '否'}} {{payload.three.twoAnser ? '（'+payload.three.twoAnser+'）':''}}</p>
                </div>
                <div class="status">
                    <p>5. 近期体重有没有明显的变化？</p>
                    <div class="detail">
                        <p v-if="payload.four.boolean === 0">无</p>
                        <p v-if="payload.four.boolean === 1">增重了{{payload.four.fourHigh}}斤</p>
                        <p v-if="payload.four.boolean === 2">减轻了{{payload.four.fourLow}}斤</p>
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
        .detail{
            padding:10px 20px 0;
            p{
                margin-top:10px;
                &:first-child{
                    margin-top:0;
                }
            }
        }
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

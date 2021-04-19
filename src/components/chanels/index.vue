<template>
    <el-popover trigger="click" v-bind="$attrs" @show="searchTalk" ref="pop">
        <div class="sufferer" v-loading="isloading">
            <el-radio-group v-if="chanels.length!==0" class="rad-inline pdt10 pdb10 pdl10 pdr10" v-model="chanelRadio">
                <el-radio :label="index" :value="o.channelPk" :key="index" v-for="(o, index) in chanels">
                    <span class="name ellipsis" :title="o.channelName">{{o.channelName}}</span>
                    <span>(托管)</span>
                    <span class="txt" v-if="o.imAccountName">-></span>
                    <span class="name ellipsis" v-if="o.imAccountName">{{o.imAccountName}}</span>
                </el-radio>
            </el-radio-group>
            <div v-else class="fts12">无沟通渠道</div>
        </div>
        <div v-if="chanels.length!==0" class="mgt10" style="text-align: right">
            <el-button type="primary" size="mini" plain @click="confirm">确定</el-button>
        </div>
        <slot></slot>
        <div slot="reference">
            <slot name="reference"></slot>
        </div>
    </el-popover>
</template>

<script>
export default {
    props: {
        userId: {
            type: String,
            default: ''
        },
        ticketId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            chanels: [],
            chanelRadio: 0,
            isloading: false
        }
    },
    methods: {
        confirm() {
            this.$emit('confirm', this.chanels[this.chanelRadio])
        },
        async searchTalk() {
            this.isloading = true
            let param = this.ticketId ? {ticketId: this.ticketId} : {userId: this.userId}
            let url = this.ticketId ? $api.consultManage.userimchannelByhandled : $api.taskCenter.taskChannel
            let {code, data} = await this.$get(url, param)
            if (code === 200) {
                this.chanels = data
            }
            this.$nextTick(() => {
                this.$refs.pop.updatePopper()
            })
            this.isloading = false
        }
    }
}
</script>

<style lang="scss" scoped>

.rad-inline {
    max-height: 200px;
    overflow: auto;
    label {
        display: flex;
        margin-bottom: 10px;
        /deep/.el-radio__label {
            display: flex;
            align-items: center;
        }
        span {
            display: inline-block;
        }
        .name {
            max-width: 200px;
        }
        .txt {
            margin: 0 10px;
        }
    }
}
</style>

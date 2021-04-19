<template>
    <div>
        <el-popover placement="bottom-start" trigger="manual" v-model="isOpen">
            <ul class="select-box">
                <li class="ellipsis" v-for="item in datas" @click="itemChaoose(item)" :key="item.value">{{item.label}}</li>
            </ul>
            <input
                type="text"
                @blur="snSelectBlur"
                @focus="snSelectFocus"
                @click="usagePopover"
                v-model="value"
                readonly
                class="select-btn ellipsis"
                slot="reference"
            />
        </el-popover>
    </div>
</template>
<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        value: {
            type: String,
            default: ''
        },
        sign: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    methods: {
        itemChaoose(item) {
            this.$emit('itemChaoose', item)
        },
        usagePopover() {
            this.$emit('snPopoverClose', !this.isOpen)
        },
        snSelectFocus() {
            this.$emit('snSelectFocus', this.sign)
        },
        snSelectBlur() {
            this.$emit('snSelectBlur', this.sign)
        }
    }
}
</script>
<style lang="scss" scoped>
.select-btn {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 5px;
    cursor: pointer;
    color: #666;
}
.select-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 300px;
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    li {
        width: 25%;
        cursor: pointer;
        color: #666;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        text-align: center;
        line-height: 36px;
        &:hover {
            // background-color: rgba(6, 95, 155, 0.8);
            color: #FF3F6B;
        }
    }
}
</style>

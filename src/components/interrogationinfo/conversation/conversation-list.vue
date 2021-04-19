<template>
    <div class="list-container">
        <div class="scroll-container">
            <conversation-item
                v-for="item in conversationList"
                :conversation="item"
                :key="item.conversationID"
            />
        </div>
    </div>
</template>

<script>
import ConversationItem from './conversation-item'
import {mapState} from 'vuex'
export default {
    name: 'ConversationList',
    components: {ConversationItem},
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            conversationList: state => state.session.conversationList
        })
    },
    methods: {
        // 把请求列表的接口写这，需要滑动翻页
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    height: 77vh;
    width: 100%;
    display: flex;
    flex-direction: column; // -reverse
    overflow: hidden;
    .scroll-container {
        overflow-y: auto;
        flex: 1;
    }
}

</style>

<template>
    <div class="side-con">
        <div class="list-input">
            <el-input v-model="name" clearable placeholder="请输入患者姓名" suffix-icon="el-icon-search" @keyup.enter.native="search"></el-input>
        </div>
        <div><conversation-list /></div>
        <div v-if="totalUnreadCount == 0"></div>
    </div>
</template>

<script>
import  {mapGetters, mapState} from 'vuex'
import ConversationList from '../conversation/conversation-list'
import {titleNotify} from '../../../utils'
export default {
    name: 'SideBar',
    computed: {
        ...mapGetters('conversation', ['totalUnreadCount']),
        ...mapState('common', {
            userInfo: 'userInfo'
        })
    },
    data() {
        return {
            name: ''
        }
    },
    components: {
        ConversationList
    },
    created() {
        titleNotify(this.totalUnreadCount)
    },
    methods: {
        async search() {
            console.log('121')
            let param = {
                current: 1,
                doctorId: this.userInfo.account_id,
                size: 15,
                patientName: this.name
            }
            let res = await this.$post('/sino-medical/appointment/doctor/im/list', param)
            if (res && res.code === 200) {
                console.log(res, 'res问诊列表')
                this.$store.commit(
                    'session/UPDATECONVERSATIONLIST',
                    res.data.records
                )
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .side-con {
        .list-input {
            margin: 9px 20px;
        }
        .con-list {
        }
    }
</style>

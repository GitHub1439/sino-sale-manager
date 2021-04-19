<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商家活动" name="0" v-if="accountType=='inner'"></el-tab-pane>
                    <el-tab-pane label="厂家活动" name="1" v-if="accountType=='syser'"></el-tab-pane>
                    <el-tab-pane label="商家赠品池" name="2" v-if="accountType=='inner'"></el-tab-pane>
                    <el-tab-pane label="厂家赠品池" name="3" v-if="accountType=='syser'"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <merchant v-if="activeName=='0'" />
        <manufacturers v-if="activeName=='1'" />
        <present v-if="activeName=='2'" />
        <factory-pool v-if="activeName=='3'" />
    </div>
</template>

<script>
import merchant from './merchant-activity'
import manufacturers from './manufacturers-activity'
import present from './present-pool'
import factoryPool from './factory-pool'
export default {
    components: {
        merchant,
        manufacturers,
        present,
        factoryPool
    },
    data() {
        return {
            activeName: '0',
            accountType: ''
        }
    },
    created() {
        this.accountType = localStorage.getItem('account_type')
        if (this.accountType === 'inner') {
            this.activeName = '0'
        } else {
            this.activeName = '1'
        }
    },
    methods: {
        handleClick(tab) {
            console.log(tab.name)
        }
    }
}
</script>

<style>
</style>

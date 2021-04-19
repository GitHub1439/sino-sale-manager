<template>
    <div>
        <div class="top-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="0"></el-tab-pane>
                    <el-tab-pane label="运费模板" name="1"></el-tab-pane>
                    <el-tab-pane label="品牌代理" name="2"></el-tab-pane>
                    <el-tab-pane label="自测客户" name="4"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="mini-switch-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="生效中" name="0"></el-tab-pane>
                    <el-tab-pane label="已失效" name="1"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="mini-switch-nav">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="所有产品" name="0"></el-tab-pane>
                    <el-tab-pane label="最新产品" name="1"></el-tab-pane>
                    <el-tab-pane label="活动产品" name="2"></el-tab-pane>
                    <el-tab-pane label="已导入" name="3"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="mini-switch-navorbtn">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="所有产品" name="0"></el-tab-pane>
                    <el-tab-pane label="最新产品" name="1"></el-tab-pane>
                    <el-tab-pane label="活动产品" name="2"></el-tab-pane>
                    <el-tab-pane label="已导入" name="3"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="btnlist">
               <button><icon-svg name="tianjia"></icon-svg><span>添加</span></button>
                <button><icon-svg name="bianji"></icon-svg><span>修改</span></button>
                <button><icon-svg name="shanchu"></icon-svg><span>删除</span></button>
                <button><icon-svg name="success"></icon-svg><span>审核</span></button>
            </div>
        </div>
        <div class="mini-switch-navorbtn">
            <div class="tabs-card">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="所有产品" name="0"></el-tab-pane>
                    <el-tab-pane label="最新产品" name="1"></el-tab-pane>
                    <el-tab-pane label="活动产品" name="2"></el-tab-pane>
                    <el-tab-pane label="已导入" name="3"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="btnlist">
                <input class="inputval-noborder" placeholder="请输入商品名或编码搜索"></input>
                <button><icon-svg name="success"></icon-svg><span>导入店铺</span></button>
            </div>

        </div>
        <div class="mgt10 mgb10">
            <button class="button-red"><icon-svg name="tianjia"></icon-svg><span>导入店铺</span></button>
        </div>
        <div>
            <sn-table
                :table-data="tableData"
                :columns="columns"
                :loading="loading"
                :page-obj="pageObj"
                :is-fit="true"
            >
                <template slot="drugName" slot-scope="scope">

                    <div v-for="item in scope.scope.orderItemList" :key="item.name">
                        <div>{{item.name + item.specs}}</div>
                    </div>
                </template>
                <template slot="amount" slot-scope="{scope}">
                    <div>
                        <div>{{'￥'+scope.amount}}</div>
                    </div>
                </template>
                <template slot="operate" slot-scope="scope">
                    <div v-if="scope.scope.status == 1"><el-button size="small" type="text" @click="previewSend(scope.scope)">发送药品</el-button></div>
                    <div v-else><el-button size="small" type="text" @click="preview(scope.scope)">查看</el-button></div>
                </template>
            </sn-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[

                ],
                columns: [
                    {label: '产品名称', prop: 'medicineName', width: '140'},
                    {label: '产品SKU码', prop: '1298579137406111746', width: 180},
                    {label: '厂商编码', prop: 'specs'},
                    {label: '厂商规格', prop: 'phone'},
                    {label: '配图', slot: 'drugName', width: 180},
                    {label: '建议零售价', slot: 'amount'},
                    {slot: 'operate', label: '操作'}
                ], // 操作列
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>

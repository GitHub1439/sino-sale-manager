<template>
    <el-dialog
        :visible.sync="showVisible"
        width="50%"
        :title="title"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        class="reply-dia"
        top="12%"
        :show-close="true"
    >
        <div class="container">

            <el-input
                placeholder="请输入内容"
                v-model="customerLabel"
                clearable
            >
            </el-input>


            <div class="btn">
                <el-button type="info" @click="cancelDialog">取消</el-button>

                <el-button type="primary" @click="addPrice">提交</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default{
        props:["showVisible"],
        data(){
            return{

            }
        },
        methods:{
            async cancelDialog() {
                this.showVisible = false
                this.custNameTags = []
            },
            addPrice(){
                
            }
        }
    }
</script>

<style>
</style>

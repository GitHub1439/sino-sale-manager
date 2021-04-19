<template>
    <div class='basic-info'>
        <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px' class='demo-ruleForm'>
            <div class='title-w'>
                <icon-svg name='bianji' style='font-size: 22px; margin-left: 16px; '></icon-svg>
                <i class='title'>基本信息：</i>
            </div>
            <div class='me-row-content'>
                <el-form-item label='产品名称' prop='name' class='me-row-item-clear'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='产品编码' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='厂商编码' class='me-row-item'>
                    <el-input v-model='ruleForm.name' disabled></el-input>
                </el-form-item>
                <el-form-item label='所属分类' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='厂商分类' class='me-row-item'>
                    <el-input v-model='ruleForm.name' disabled></el-input>
                </el-form-item>
                <el-form-item label='产品型号' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='所属品牌' class='me-row-item'>
                    <el-input v-model='ruleForm.name' disabled></el-input>
                </el-form-item>
                <el-form-item label='产品标签' class='me-row-item-clear'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='是否上架' prop='name' class='me-row-item'>
                    <div class="mini-switch-navorbtn" style="margin: 0;">
                        <div class="tabs-card" style="flex: 0.5; padding: 0;">
                            <el-tabs v-model="ruleForm.gift" type="card">
                                <el-tab-pane label="是" name="1"></el-tab-pane>
                                <el-tab-pane label="否" name="0"></el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label='是否赠品' prop='name' class='me-row-item'>
                    <el-select v-model="ruleForm.payType" clearable>
                        <el-option label="商品" value="0"></el-option>
                        <el-option label="赠品" value="1"></el-option>
                        <el-option label="商品&赠品" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='产品单位' prop='name' class='me-row-item'>
                    <el-select v-model="ruleForm.payType" clearable>
                        <el-option label="aa" value="1"></el-option>
                        <el-option label="bb" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='库存数量' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='安全库存' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='最少购买' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='调整间隔' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='标准价格' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='不含税价' prop='name' class='me-row-item'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>
                <el-form-item label='产品描述' class='me-row-item-clear'>
                    <el-input v-model='ruleForm.name'></el-input>
                </el-form-item>

            </div>

        </el-form>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            ruleForm: {
                name: '',
                gift: '1'
            },
            rules: {
                name: [
                    {required: true, message: '请输入', trigger: 'blur'},
                    {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang='scss' scoped>
.basic-info {
    width: 60%;
    margin: 0 auto;
}

.title-w {
    height: 45px;
    background: #F2F3F3;
    opacity: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
}

.title {
    font-size: 0.25rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    margin-left: 17px;
    color: #333333;
}

.me-row-content {
    padding-right: 15px;
}

.me-row-item {
    width: 50%;
    float: left;

    .el-form-item__content .el-select {
        width: 100%;
    }
}
.me-row-item-clear {
    clear: both;
}

</style>

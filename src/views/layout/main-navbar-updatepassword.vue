<template>
    <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true" width="400px">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="帐号">
                <span>{{userName}}</span>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="dataForm.password" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="dataForm.newPassword" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="dataForm.newPasswordAgain" maxlength="16"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()" :disabled="saveButton">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {clearLoginInfo} from '@/utils'
export default {
    data() {
        let validatePassword = (rule, value, callback) => {
            if (value == null || value.trim() === '') {
                callback(new Error('原密码不能为空'))
                return false
            }
            callback()

        }
        let validateNewPassword = (rule, value, callback) => {
            if (value == null || value.trim() === '') {
                callback(new Error('新密码不能为空'))
                return false
            }
            if (!/^[\S]{6,16}$/.test(value.trim())) {
                callback(new Error('请输入6-16位任意字符'))
                return false
            }
            callback()

        }
        let validateConfirmPassword = (rule, value, callback) => {
            if (value == null || value.trim() === '') {
                callback(new Error('确认密码不能为空'))
                return false
            }
            if (this.dataForm.newPassword !== value) {
                callback(new Error('确认密码与新密码不一致'))
                return false
            }
            if (!/^[\S]{6,16}$/.test(value.trim())) {
                callback(new Error('请输入6-16位任意字符'))
                return false
            }
            callback()

        }
        return {
            visible: false,
            dataForm: {
                password: '',
                newPassword: '',
                newPasswordAgain: ''
            },
            dataRule: {
                password: [
                    {
                        required: true,
                        validator: validatePassword,
                        trigger: 'blur'
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        validator: validateNewPassword,
                        trigger: 'blur'
                    }
                ],
                newPasswordAgain: [
                    {
                        required: true,
                        validator: validateConfirmPassword,
                        trigger: 'blur'
                    }
                ]
            },
            saveButton: false
        }
    },
    computed: {
        userName: {
            get() {
                return this.$store.state.common.userInfo.account
            }
        },
        mainTabs: {
            get() {
                return this.$store.state.common.mainTabs
            },
            set(val) {
                this.$store.commit('common/UPDATEMAINTABS', val)
            }
        }
    },
    methods: {
        // 初始化
        init() {
            this.visible = true
            this.$nextTick(() => {
                this.$refs.dataForm.resetFields()
            })
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs.dataForm.validate(valid => {
                if (valid) {
                    this.updatePass()
                }
            })
        },
        async updatePass() {
            let param = {
                oldPassword: this.dataForm.password.trim(),
                newPassword: this.dataForm.newPassword.trim(),
                newPasswordAgain: this.dataForm.newPasswordAgain.trim()
            }
            this.saveButton = true
            let result = await this.$post('/sino-dst/account/update-password', param)
            if (result && result.code === 200) {
                this.$message({
                    message: '密码修改成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                        this.saveButton = false
                        this.visible = false
                        this.$nextTick(() => {
                            this.mainTabs = []
                            clearLoginInfo()
                            this.$router.replace({name: 'login', params: {out: true}})
                        })
                    }
                })
            } else {
                this.$message.error(result.msg)
                this.saveButton = false
            }
        }
    }
}
</script>

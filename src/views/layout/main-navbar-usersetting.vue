<template>
    <el-dialog title="个人设置" :visible.sync="visible" :append-to-body="true" width="600px">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    :headers="headers"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="dataForm.imageUrl" :src="dataForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="dataForm.name" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model="dataForm.phone" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="签名设置" prop="sinoimg">
                <div class="signifo-item">
                    <div class="sign-img">
                        <img :src="dataForm.signimg" v-if="dataForm.signimg" alt="签名">
                    </div>
                    <a class="sign-qr" href="javascript:void(0);" v-if="dataForm.signimg">修改签名</a>
                    <el-popover placement="top-start" trigger="hover" @show="popoverShow">
                        <div class="popo">
                            <canvas id="canvas"></canvas>
                            <div class="tip">手机扫一扫</div>
                        </div>
                        <i class="el-icon-question mgl10" slot="reference">扫码后在手机端书写签名</i>
                    </el-popover>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import QRCode from 'qrcode'
export default {
    data() {
        return {
            visible: false,
            headers: {
                'Sino-Auth': localStorage.getItem('Sino-Auth')
            },
            action: window.SITE_CONFIG.baseUrl + '/sino-resource/oss/endpoint/put-file',
            dataForm: {
                imageUrl: '',
                name: '',
                phone: '',
                signimg: ''
            },
            dataRule: {
                name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^1[0-9]\d{9}$/, message: '手机号码格式有误'}
                ]
            },
            qrcodeImg: '',
            websocket: null,
            timeout: 1000 * 10,        // 在接近断开的情况下以通信的方式去重置连接时间。
            serverTimeoutObj: null
        }
    },
    destroyed() {
        this.websocket.close()
    },
    mounted() {
        this.createWebSocket()
        // this.initTest()
    },
    watch: {
        visible(val) {
            console.log(val)
            if (!val) {
                this.websocket.close()
                this.websocket = null
                this.reset()
            } else {
                this.createWebSocket()
            }
        }
    },
    methods: {
        initTest() {
            if (typeof (EventSource) !== 'undefined') {
                const se = new EventSource(window.SITE_CONFIG.baseUrl + '/sino-resource/sse/endpoint/subscribe', {withCredentials: true})
                se.onopen = function(e) {
                    console.log('onopen===>', e)
                }
                se.onmessage = function(e) {
                    console.log('onmessage===>', e)
                }
                se.onerror = function(e) {
                    console.log('onerror===>', e)
                }
            } else {
                this.$message.error('当前浏览器不支持服务器发送的事件')
            }
        },
        // 初始化
        init() {
            this.visible = true
            this.$nextTick(() => {
                this.$refs.dataForm.resetFields()
            })
        },
        createWebSocket() {
            if (this.websocket) {
                return
            }
            let url = window.SITE_CONFIG.baseUrl.replace('http', 'ws')
            let accountId = localStorage.getItem('account_id')

            this.websocket = new WebSocket(url + `/sino-resource/ws?accountId=${accountId}`)
            // this.websocket = new WebSocket(`ws://192.168.151.72:6005/ws?accountId=${accountId}`)
            this.websocket.onmessage = (event) => {
                let msgData = event.data
                if (msgData) {
                    let data = JSON.parse(msgData)
                    if (data.protocol !== 'heartbeat') {
                        console.log('返回了数据', data)
                        this.dataForm.signimg = data.data.link
                    }
                }
            }
            this.websocket.onopen = () => {
                this.start()
                console.log('websocket 服务已经开启。')
            }
            this.websocket.onclose = () => {
                console.log('抱歉，websocket 服务已经关闭。')
            }
            this.websocket.onerror = () => {
                this.$message.error('抱歉，websocket 服务异常。')
            }
        },
        reset() {
            clearInterval(this.serverTimeoutObj)
            return this
        },
        start() {
            this.serverTimeoutObj = setInterval(() => {
                if (this.websocket) {
                    let msg = {protocol: 'heartbeat', content: '心跳'}
                    this.websocket.send(JSON.stringify(msg))
                    console.log('连接状态，发送消息保持连接', msg)
                }
                /* if (this.websocket.readyState === 1) {
                    console.log('连接状态，发送消息保持连接')
                } else {
                    console.log('断开状态，尝试重连')
                } */
            }, this.timeout)
        },
        popoverShow() {
            let canvas = document.getElementById('canvas')
            let url = document.location.origin + '/draw.html#/?id=' + localStorage.getItem('account_id')
            QRCode.toCanvas(canvas, url, (error) => {
                if (error) console.error(error)
                console.log('QR success!')
            })
        },
        handleAvatarSuccess(res) {
            this.dataForm.imageUrl = res.data.link// URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 9
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 9MB!')
            }
            return isIMAGE && isLt2M
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs.dataForm.validate(valid => {
                if (valid) {
                    this.update()
                }
            })
        },
        async update() {
            let param = {
                accountId: localStorage.getItem('account_id'),
                avatar: this.dataForm.imageUrl,
                name: this.dataForm.name,
                phone: this.dataForm.phone,
                doctorSign: this.dataForm.signimg
            }
            let {code} = await this.$post('/sino-account/profile/update', param)
            if (code === 200) {
                this.$message.success('修改成功')
                this.visible = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #FF3F6B;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.avatar {
    width: 80px;
    height: 80px;
    display: block;
}
.sign-qr {
    margin-left: 10px;
}
.sign-img {
    width: 160px;
    height: 80px;
    border-radius: 6px;
    border: 1px dashed #ccc;
    img {
        width: 100%;
        vertical-align: middle;
    }
}
.signifo-item {
    display: flex;
    align-items: center;
}
.popo {
    text-align: center;
}
</style>

<template>
    <div class="mod-wrap">
        <canvas id="canvas"></canvas>
        <h1 style="text-align: center; background: #fff; padding: 10px; margin: 0;">测试</h1>
        <img :src="signImgUrl" alt="" style="width: 100%;">
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    data() {
        return {
            signImgUrl: '',
            websocket: null,
            timeout: 1000 * 60 * 15,        // 在接近断开的情况下以通信的方式去重置连接时间。
            serverTimeoutObj: null
        }
    },
    destroyed() {
        this.websocket.close()
    },
    mounted() {
        this.createWebSocket()
        let canvas = document.getElementById('canvas')
        let url = document.location.origin + '/draw.html'
        QRCode.toCanvas(canvas, url, (error) => {
            if (error) console.error(error)
            console.log('success!')
        })
    },
    methods: {
        createWebSocket() {
            if (this.websocket) {
                return
            }
            let url = window.SITE_CONFIG.baseUrl.replace('http', 'ws')
            let accountId = JSON.parse(localStorage.getItem('userInfo')).account_id
            this.websocket = new WebSocket(url + `/sino-resource/ws?accountId=${accountId}`)
            this.websocket.onmessage = (event) => {
                let msgData = event.data
                if (msgData) {
                    let {data} = JSON.parse(msgData)
                    this.signImgUrl = data.link
                }
            }
            this.websocket.onopen = () => {
                this.reset().start()
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
                if (this.websocket.readyState === 1) {
                    console.log('连接状态，发送消息保持连接')
                    this.websocket.send('ping')
                    let token = window.localStorage.getItem('Sino-Auth')
                    let msg = {
                        cmd: 'init',
                        data: {time: new Date(), token}
                    }
                    this.websocket.send(JSON.stringify(msg))
                    this.reset().start()    // 如果获取到消息，说明连接是正常的，重置心跳检测
                } else {
                    console.log('断开状态，尝试重连')
                }
            }, this.timeout)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

<template>
    <div class="draw-box">
        <div class="draw-wrap">
            <div class="sign-title">请绘制清晰可辨的签名，并保存</div>
            <div class="sign-canvas">
                <canvas ref="drawCanvas"></canvas>
            </div>
            <div class="action-wrap">
                <button class="clear" @click="clear">清除</button>
                <button class="save" type="primary" @click="save">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import SignaturePad from 'signature_pad'
export default {
    name: 'Drawing',
    data() {
        return {
            drawCanvas: null,
            signaturePad: null
        }
    },
    mounted() {
        this.drawCanvas = this.$refs.drawCanvas
        this.signaturePad = new SignaturePad(this.drawCanvas, {
            minWidth: 1.5,
            maxWidth: 4.5
        })
        let evt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
        this.onResize()
        window.addEventListener(evt, this.onResize)
    },
    methods: {
        onResize() {
            setTimeout(() => {
                let signCanvas = document.querySelector('.sign-canvas')
                let drawBox = document.querySelector('.draw-box')
                let width = document.documentElement.clientWidth
                let height =  document.documentElement.clientHeight
                let ratio = Math.max(window.devicePixelRatio || 1, 1)
                let ctx = this.drawCanvas.getContext('2d')
                if (height >= width) {
                    signCanvas.style.width = height + 'px'
                    signCanvas.style.height = width - 100 + 'px'
                    this.drawCanvas.width = height * ratio
                    this.drawCanvas.height = (width - 100) * ratio

                    drawBox.style.width = height + 'px'
                    drawBox.style.height = width + 'px'
                    drawBox.style.top = (height - width) / 2 + 'px'
                    drawBox.style.left = (width - height) / 2 + 'px'
                    drawBox.style.transform = 'rotate(90deg)'
                    ctx.rotate(1.5 * Math.PI)
                    ctx.translate(-this.drawCanvas.height, 0)
                } else {
                    signCanvas.style.width = width + 'px'
                    signCanvas.style.height = height - 100 + 'px'
                    this.drawCanvas.width = width * ratio
                    this.drawCanvas.height = (height - 100) * ratio
                    drawBox.style.width = width + 'px'
                    drawBox.style.height = height + 'px'
                    drawBox.style.top = 0
                    drawBox.style.left = 0
                    drawBox.style.transform = 'none'
                }
                ctx.scale(ratio, ratio)
                this.signaturePad.clear()
            }, 50)
        },
        // 清除
        clear() {
            this.signaturePad.clear()
            this.$emit('clear', false)
        },
        // 确认
        save() {
            let imgBase64 = this.signaturePad.toDataURL()
            localStorage.setItem('base64', imgBase64)
            this.submit(imgBase64)
        },
        async submit(imgBase64) {
            let id = window.location.href.split('?')[1].split('=')[1].replace('/', '').replace('#', '')
            let data = await this.$post('/sino-medical/prescription/sign?accountId=' + id, {sign: imgBase64, accountId: id})
            if (data) {
                this.$message.success({
                    message: '保存签名成功',
                    type: 'success',
                    duration: 1500
                })
                this.clear()
            } else {
                this.$message.error({
                    message: data.msg,
                    type: 'success',
                    duration: 1500
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.draw-box {
    position: relative;
    width: 100%;
    height: 100%;
    .sign-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        color: #2e3439;
        text-align: center;
        background: #fff;
        box-sizing: border-box;
        touch-action: none;
        user-select: none;
    }
}
.canvas-box {
    height: 100%;
}

.draw-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.action-wrap {
    padding-right: 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    touch-action: none;
    user-select: none;
}
.sign-canvas {
    overflow: hidden;
    height: 100%;
    position: relative;
    flex: 1;
}
.sign-canvas canvas {
    border: 1px solid #eee;
    background-color: #e0e3e5;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.02);
}
.action-wrap button {
    text-align: center;
    color: #888;
    border: none;
    outline: none;
    padding: 7px 25px;
    margin-right: 20px;
    border-radius: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
}
.action-wrap button:active {
    opacity: 0.8;
}
.action-wrap .clear {
    background-color: #eee;
}
.action-wrap .save {
    margin-right: 0;
    background-color: #0073cf;
    color: #fff;
}
</style>

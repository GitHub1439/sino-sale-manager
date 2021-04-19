<template>
    <div class="audio-wrap" :class="customClass">
        <audio controls :src="src" ref="audioPlayer" style="display:none"></audio>
        <div class="self-audio">
            <div class="audio-duration">{{duration}}秒</div>
            <div class="audio-trigger" @click="playAudioHandler">
                <div :class="{ 'wifi-symbol': true, 'wifi-symbol--avtive': isPlaying}">
                    <div class="wifi-circle first"></div>
                    <div class="wifi-circle second"></div>
                    <div class="wifi-circle third"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isPlaying: false,
            duration: ''
        }
    },
    props: {
        src: {
            type: String,
            required: true
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        playAudioHandler() {
            this.isPlaying = !this.isPlaying
            const player = this.$refs.audioPlayer
            if (this.isPlaying) {
                player.load()
                player.play()
            } else {
                player.pause()
            }
        }
    },
    mounted() {
        const player = this.$refs.audioPlayer
        player.load()
        player.oncanplay = () => {
            this.duration = Math.ceil(player.duration)
        }
        player.onended = () => {
            this.isPlaying = false
        }
    }
}
</script>
<style lang="scss" scoped>
.audio-wrap {
    .self-audio {
        .audio-duration {
            display: inline-block;
            line-height: 32px;
            height: 32px;
            padding-right: 6px;
            color: #444;
        }
        .audio-trigger {
            cursor: pointer;
            vertical-align: top;
            display: inline-block;
            line-height: 32px;
            height: 32px;
            width: 80px;
            border-radius: 4px;
            position: relative;
            .wifi-symbol {
                position: absolute;
                right: 4px;
                top: -8px;
                width: 50px;
                height: 50px;
                box-sizing: border-box;
                overflow: hidden;
                transform: rotate(-45deg) scale(0.5);
                .wifi-circle {
                    border: 4px solid #444;
                    border-radius: 50%;
                    position: absolute;
                }

                .first {
                    width: 5px;
                    height: 5px;
                    background: #444;
                    top: 45px;
                    left: 45px;
                }
                .second {
                    width: 25px;
                    height: 25px;
                    top: 35px;
                    left: 35px;
                }
                .third {
                    width: 40px;
                    height: 40px;
                    top: 25px;
                    left: 25px;
                }
            }
            .wifi-symbol--avtive {
                .wifi-circle {
                    border: 4px solid #0073cf;
                }
                .second {
                    animation: bounce 1s infinite 0.2s;
                }
                .third {
                    animation: bounce 1s infinite 0.4s;
                }
            }
        }
        @keyframes bounce {
            0% {
                opacity: 0; /*初始状态 透明度为0*/
            }
            100% {
                opacity: 1; /*结尾状态 透明度为1*/
            }
        }
    }
    &.left {
        .self-audio {
            display: flex;
            flex-flow: row-reverse;
        }
        .audio-trigger {
            transform: rotate(180deg);
        }
    }
}
</style>

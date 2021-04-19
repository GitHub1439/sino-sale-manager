<template>
    <div :id="'video-'+index" class="video-payer"></div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            default: 0
        },
        url: {
            type: String,
            default: ''
        },
        poster: { // 封面
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        // http://h5player.bytedance.com/
        new Player({
            el: document.querySelector('#video-' + this.index),
            autoplay: false,
            volume: 0.3,
            fluid: true,
            url: 'http://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4',
            poster: 'https://cdn.sspai.com/article/7187139a-207b-c1eb-7106-535d105f374d.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1',
            playsinline: true,
            lang: 'zh-cn',
            height: 150,
            width: 250
        })
    }
}
</script>

<style></style>

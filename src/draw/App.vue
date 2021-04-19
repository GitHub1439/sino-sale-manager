<template>
    <div id="app" class="app-page">
        <drawing></drawing>
    </div>
</template>

<script>
import drawing from './components/drawing'
export default {
    components: {
        drawing
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss">
html,
body {
    margin: 0;
}
.app-page {
    width: 100%;
    height: 100%;
}
@media screen and (orientation: portrait) {
    body, html {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
@media screen and (orientation: portrait) {
    .draw-box {
        position: absolute !important;
    }
}
</style>

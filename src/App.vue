<template>
    <transition name="fade">
        <div id="app">
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
export default {
    mounted() {
        this.pageResize()
    },
    methods: {
        pageResize(callback) {
            var appConfig = {
                screen: {
                    width: 1920,
                    height: 1080,
                    scale: 19.2
                }
            }
            function init() {
                // console.log(window.innerHeight + "," + window.innerWidth);
                let _el = document.getElementById('app')

                var hScale = window.innerHeight / appConfig.screen.height
                let wScale = window.innerWidth / appConfig.screen.width
                let pageH = window.innerHeight
                let pageW = window.innerWidth

                let isWider =
                    window.innerWidth / window.innerHeight >=
                    appConfig.screen.width / appConfig.screen.height
                // console.log(isWider);
                if (isWider) {
                    _el.style.height = window.innerHeight + 'px' // '100%';
                    _el.style.width =
                        (pageH * appConfig.screen.width) /
                            appConfig.screen.height +
                        'px'
                    _el.style.top = '0px'
                    _el.style.left =
                        (window.innerWidth -
                            (pageH * appConfig.screen.width) /
                                appConfig.screen.height) *
                            0.5 +
                        'px'
                    // console.log(_el.style.width + "," + _el.style.height)
                } else {
                    _el.style.width = window.innerWidth + 'px' // '100%';
                    _el.style.height =
                        (pageW * appConfig.screen.height) /
                            appConfig.screen.width +
                        'px'
                    _el.style.top =
                        0.5 *
                            (window.innerHeight -
                                (pageW * appConfig.screen.height) /
                                    appConfig.screen.width) +
                        'px'
                    _el.style.left = '0px'
                    // console.log(_el.style.height);
                    // console.log(_el.style.top);
                }
                document.documentElement.style.fontSize =
                    _el.clientWidth / appConfig.screen.scale + 'px'
            }
            var resizeEvt =
                'orientationchange' in window ? 'orientationchange' : 'resize'
            window.addEventListener(resizeEvt, init, false)
            document.documentElement.addEventListener(
                'DOMContentLoaded',
                init,
                false
            )
            init()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .top-nav {
    .el-tabs--card > .el-tabs__header {
        .el-tabs__nav {
            border: none;
        }
        .el-tabs__item {
            border: 0px;
            font-size: 14px;
            letter-spacing: 1px;
            padding: 0px 28px;
            font-size: 16px;
            height: 42px;
            line-height: 42px;
            border-radius: 6px;
            margin: 0 10px;
            &:hover {
                color: #ff4d04;
            }
        }
        .is-active {
            background-color: #ff4d07;
            color: #fff;
            &:hover {
                color: #fff;
            }
        }
    }
}

/deep/ .mini-switch-navorbtn {
    .el-tabs--card > .el-tabs__header {
        .el-tabs__nav {
            border: 0;
            background: #f2f3f3;
            border-radius: 35px;
        }
        .el-tabs__item {
            border: 0px;
            font-size: 14px;
            letter-spacing: 1px;
            padding: 0px 16px;
            height: 32px;
            line-height: 32px;
            border-radius: 35px;
            &:hover {
                color: #ff4d04;
            }
        }
        .is-active {
            background-color: #ff4d07;
            color: #fff;
            &:hover {
                color: #fff;
            }
        }
    }
}

/deep/ .mini-switch-nav,/deep/ .switch-nav {
    .el-tabs--card > .el-tabs__header {
        .el-tabs__nav {
            border: 0;
            background: #f2f3f3;
            border-radius: 35px;
        }
        .el-tabs__item {
            border: 0px;
            font-size: 14px;
            letter-spacing: 1px;
            padding: 0px 16px;
            height: 32px;
            line-height: 32px;
            border-radius: 35px;
            &:hover {
                color: #ff4d04;
            }
        }
        .is-active {
            background-color: #ff4d07;
            color: #fff;
            &:hover {
                color: #fff;
            }
        }
    }
}
</style>

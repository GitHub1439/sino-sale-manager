<template>
    <div>
        <div ref="slideBox" class="wrapper">
            <ul ref="itembox" class="content">
                <li @click="selectItem(index, $event)" :class="[{'center':itemIdx==index}]" class="item-li" v-for="(item, index) in dataList" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import BetterScroll from 'better-scroll'
export default {
    props: {
        options: {
            type: Object,
            default: () => {
                return {}
            }
        },
        optionsArray: {
            type: Array,
            default: () => {
                return []
            }
        },
        defaultPos: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            bs: null,
            scrollY: 0,
            listHeight: [],
            dataList: [],
            clickEvent: false,
            isJz: false,
            isClick: false,
            itemIndex: 0,
            birthyYearBegin: 1940,
            birthyYearEnd: 2020,
            liHeight: 30
        }
    },
    computed: {
        itemIdx() {
            let result = 0
            let ipx = this.scrollY % this.liHeight
            console.log(ipx)
            if (ipx > this.liHeight / 2 || ipx === 0) {
                result = Math.ceil(this.scrollY / this.liHeight) + 1
            } else {
                result = Math.ceil(this.scrollY / this.liHeight)
            }
            return result
        }
    },
    created() {
        if (this.options.min) {
            for (let i = this.options.min;i <= this.options.max;i++) {
                this.dataList.push(i)
            }
        } else {
            this.dataList = this.optionsArray
        }
    },
    mounted() {
        setTimeout(() => {
            let wrapper = this.$refs.slideBox
            this.bs = new BetterScroll(wrapper, {
                probeType: 3,
                click: true
            })
            this.bs.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
                // console.log(this.scrollY)
            })
            if (this.defaultPos) {
                this.dataList.map((v, i)=>{
                    if (v === this.defaultPos) {
                        this.bs.scrollTo(0, -(i - 1) * this.liHeight, 0)
                    }
                })
            }
            this.bs.on('scrollEnd', () => {
                console.log('end', this.scrollY)
                if (this.isClick) {
                    this.isClick = false
                    return
                }
                console.log(this.itemIdx)
                // this.bs.scrollTo(0, -this.itemIdx * this.liHeight, 0)
                // this.isJz = !this.isJz
                // if (this.isJz) {
                //     let ipx = this.scrollY % this.liHeight
                //     if (ipx > this.liHeight / 2 || ipx === 0) {
                //         this.bs.scrollBy(0, this.liHeight - ipx)
                //     } else {
                //         this.bs.scrollBy(0, ipx - this.liHeight)
                //     }
                // }
                // itemIdx
            })
        }, 1000)
    },
    methods: {
        setSex(val) {
            this.sexVal = val
        },
        result() {
            let result = ''
            console.log(this.itemIdx)
            this.dataList.map((v, i)=>{
                if (i === this.itemIdx) {
                    result = v
                }
            })
            return result
        },
        selectItem(index, event) {
            this.clickEvent = true
            console.log(index)
            console.log(event)
            if (!event._constructed) {
                console.log(event._constructed)
            } else {
                this.isClick = true
                let rightItems = this.$refs.itembox.getElementsByClassName(
                    'item-li'
                )
                console.log(rightItems)
                let el = rightItems[index]
                this.bs.scrollToElement(el, 300)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.basic-container {
    padding: 20px 10px;
    background-color: #fff;
    .form {
        margin-top: 10px;
    }
    .sex-img {
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
            width: 100px;
        }
    }
}
.wrapper {
    height: 90px;
    display: inline-block;
    overflow: hidden;
    padding: 0 5px;
    position: relative;
    .content {
        li {
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            font-size: 14px;
            font-weight: normal;
            color: #999;
        }
        .center{
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .top,.bottom{
            font-size: 14px;
            font-weight: normal;
            color: #999;
        }
    }
}
</style>

<template>
    <div class="sn-column" style="background:#F3F4F5">
        <div class="head-view">
            <div class="sn-row" style="align-items: center">
                <div class="div-left sn-row">
                    <div class="sn-column pointer" @click="goPage('moduledesk-urgent-mission')">
                        <div class="smtitle">待处理订单</div>
                        <div class="num" style="color: #FF4D07">
                            {{deskObj.urgencyTaskCnt?deskObj.urgencyTaskCnt:'0'}}
                        </div>
                        <div class="num-title" style="color: #FF4D07">马上处理</div>
                    </div>
                    <span class="divider"></span>
                    <div class="sn-column pointer" @click="goPage('mouduleconsulting-consulting-index')">
                        <div class="smtitle">待审核客户</div>
                        <div class="num" style="color: #FF4D07">
                            {{deskObj.consultCnt?deskObj.consultCnt:'0'}}
                        </div>
                        <div class="num-title" style="color: #FF4D07">马上处理</div>
                    </div>
                    <span class="divider"></span>
                    <div class="sn-column pointer" @click="goPage('moduledesk-unwork-mission')">
                        <div class="smtitle">今日累计销售额</div>
                        <div class="num" style="color: #FF4D07">
                            {{deskObj.undidTaskCnt?deskObj.undidTaskCnt:'0'}}
                        </div>
                        <div class="num-title">查看明细</div>
                    </div>
                    <span class="divider"></span>
                    <div class="sn-column pointer" @click="goPage('mouduleconsulting-consulting-index',{activeName:'over'})">
                        <div class="smtitle">本月累计销售额</div>
                        <div class="num" style="color: #FF4D07">
                            {{deskObj.todayDidConsultCnt?deskObj.todayDidConsultCnt:'0'}}
                        </div>
                        <div class="num-title">查看明细</div>
                    </div>
                    <span class="divider"></span>
                    <div class="sn-column pointer" @click="goPage('moduledesk-history-mission')">
                        <div class="smtitle">商品上架数</div>
                        <div class="num" style="color: #FF4D07">
                            {{deskObj.todayDidTaskCnt?deskObj.todayDidTaskCnt:'0'}}
                        </div>
                        <div class="num-title">查看明细</div>
                    </div>
                    <span class="divider"></span>
                    <div class="sn-column pointer" @click="goPage('mouduleconsulting-consulting-index',{activeName:'over'})">
                        <div class="smtitle">本月新增/活跃客户</div>
                        <div class="num">
                            {{deskObj.didConsultCnt?deskObj.didConsultCnt:'0'}}/{{deskObj.activeCustomerCnt?deskObj.activeCustomerCnt:'0'}}
                        </div>
                        <div class="num-title">查看明细</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="report-view" style="padding-left: 20px;padding-top: 20px">

            <img src="../../assets/images/report.png"  width="1040"/></div>
        <div class="foot-view" style="margin-top: 20px">
            <div class="mod-wrap">
                <div class="box">
                    <h3 class="icon-hot">热销商品<a href="#" class="more">更多</a></h3>
                    <div class="goods-list">
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">安稳+,商品毛重：0.567kg,类别：指尖血检测调码</div>
                                <div class="goods-detail-total">
                                    <span>月售<b>13</b>套</span><span><b>13</b>个买家</span><span>剩余<b>13</b>套</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">安稳+,类别：指尖血检测调码方式：全自动免调码</div>
                                <div class="goods-detail-total">
                                    <span>月售<b>13</b>套</span><span><b>13</b>个买家</span><span>剩余<b>13</b>套</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">安稳+,检测调码方式：全自动免调码</div>
                                <div class="goods-detail-total">
                                    <span>月售<b>13</b>套</span><span><b>13</b>个买家</span><span>剩余<b>13</b>套</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" style="margin: 0 30px">
                    <h3 class="icon-kucun">库存预警<a href="#" class="more">更多</a></h3>
                    <div class="tab-list">
                        <div class="rows rname">
                            <span style="flex: 0.4">产品编码</span>
                            <span>产品名称</span>
                            <span style="flex: 0.3">安全库存</span>
                            <span style="flex: 0.3">实际库存</span>
                        </div>
                        <div class="rows goods-name" v-for="item in totalPro" :key="item.code"  >
                            <span style="flex: 0.4">{{item.code}}</span>
                            <span style="text-align:left">{{item.cpanme}}</span>
                            <span style="flex: 0.3">{{item.cpatotal}}</span>
                            <span style="flex: 0.3">{{item.cptotal}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot-view"  style="margin-top: 20px; height: 460px">
            <div class="mod-wrap">
                <div class="box">
                    <h3 class="icon-notice">厂家公告<a href="#" class="more">更多</a></h3>
                    <div class="factory-list">
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/> <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">公告名称：<b>共赢计划</b></div>
                                <div class="goods-detail-total">
                                    <span>生产厂家：<b>三诺生物</b></span><span>活动类型：<b>买赠</b></span>  <span>活动时间：<b>1/30~4/10</b></span><span>参与产品：<b>安稳+，金系列</b></span>
                                </div>
                                <div class="goods-detail-total">
                                    <span>活动说明：在2021年内，本月1号到下月30前下单，三诺向终端免费配送血压计。满5送1</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/> <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">公告名称：<b>共赢计划</b></div>
                                <div class="goods-detail-total">
                                    <span>生产厂家：<b>三诺生物</b></span><span>活动类型：<b>买赠</b></span> <span>活动时间：<b>1/30~4/10</b></span><span>参与产品：<b>安稳+，金系列</b></span>
                                </div>
                                <div class="goods-detail-total">
                                    <span>活动说明：暂无</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/> <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">公告名称：<b>共赢计划</b></div>
                                <div class="goods-detail-total">
                                    <span>生产厂家：<b>三诺生物</b></span><span>活动类型：<b>加提</b></span><span>活动时间：<b>1/30~4/10</b></span><span>参与产品：<b>试纸</b></span>
                                </div>
                                <div class="goods-detail-total">
                                    <span>活动说明：活动结束了</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="goods-pig">
                                <img src="../../assets/images/pro1.png" height="60" width="60"/> <img src="../../assets/images/pro1.png" height="60" width="60"/>
                            </div>
                            <div class="goods-detail">
                                <div class="goods-detail-name">公告名称：<b>共赢计划</b></div>
                                <div class="goods-detail-total">
                                    <span>生产厂家：<b>三诺生物</b></span><span>活动类型：<b>加提</b></span><span>活动时间：<b>1/30~4/10</b></span><span>参与产品：<b>试纸</b></span>
                                </div>
                                <div class="goods-detail-total">
                                    <span>活动说明：活动结束了</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep'
    import chanels from '@/components/chanels'
    export default {
        components: {
            chanels
        },
        data () {
            return {
                columns: [
                    {slot: 'godName', label: '患者', prop: 'godName'},
                    {label: '用户来源', prop: 'userSourceName'},
                    {label: '服务包', prop: 'servicePackName'},
                    {label: '任务来源', prop: 'createName'},
                    {label: '任务类型', prop: 'taskTypeName'},
                    {slot: 'ticketUrgency', label: '紧急程度', prop: 'ticketUrgencyName'},
                    {slot: 'deadlineTime', label: '截止时间', prop: 'deadlineTime'},
                    {label: '备注', prop: 'ticketRemark'},
                    {slot: 'status', label: '任务状态', prop: 'status'},
                    {slot: 'operate', label: '操作', width: '198px'}
                ], // 操作列
                operates: [
                    {text: '完成任务', type: 'complete', title: '完成任务', btnType: 'single'},
                    {text: '移交', type: 'transfer', title: '移交任务', btnType: 'single'},
                    {text: '去沟通', type: 'communicate', title: '去沟通'},
                    {text: '删除', type: 'delete', color: '#F56C6C', title: '删除'}
                ],
                totalPro:[
                    {
                        code: "14100354",
                        cpanme: "安稳+瓶装试条套装~25支/套（透明）",
                        cpatotal: "10",
                        cptotal: "100",
                    },
                    {
                        code: "001001",
                        cpanme: "三诺专供50支独立装采血针~50支/盒，一箱装60盒",
                        cpatotal: "70",
                        cptotal: "10",
                    },{
                        code: "001001",
                        cpanme: "GA-3瓶装试条套装（无USB）~50支/盒（透明）",
                        cpatotal: "40",
                        cptotal: "300",
                    },{
                        code: "001001",
                        cpanme: "安稳免调码瓶装试条~150支/盒",
                        cpatotal: "120",
                        cptotal: "900",
                    },{
                        code: "001001",
                        cpanme: "安稳免调码瓶装试条~150支/盒",
                        cpatotal: "110",
                        cptotal: "1020",
                    },{
                        code: "001001",
                        cpanme: "安稳免调码瓶装试条~150支/盒",
                        cpatotal: "10",
                        cptotal: "1100",
                    },
                    {
                        code: "001001",
                        cpanme: "安稳+血糖试纸",
                        cpatotal: "10",
                        cptotal: "1100",
                    }
                ],
                loading: false,
                popoverVisible: false,
                pageObj: {
                    size: 10,
                    total: 0,
                    currentPage: 1,
                    func: currentPage => {
                        this.pageTurning(currentPage)
                    },
                    handleSizeChange: size => {
                        this.sizeChange(size)
                    }
                },
                searchLoading: false,
                tableData: [],
                selectedData: [],
                chanelRadio: 0, // 沟通渠道
                chanels: [], // 沟通渠道
                dataForm: {
                    godName: '', // 患者名字
                    staffFullName: '', // 责任人
                    createId: '', // 任务来源id
                    startTime: '', // 开始时间
                    endTime: '', // 结束时间
                    userSource: '', // 用户来源
                    godId: '', // 用户来源id
                    taskStatus: '', // 任务状态
                    taskType: '', // 任务类型
                    ticketUrgency: ''// 任务紧急程度
                },
                valueTime: [], // 时间
                id: 0, // 任务id
                dialogVisible: false,
                dialogType: {},
                taskStatus: [
                    {dictKey: 1, dictValue: '未开始', color: '#F59323'},
                    {dictKey: 2, dictValue: '沟通中', color: '#0F996D'},
                    {dictKey: 3, dictValue: '沟通结束', color: ''},
                    {dictKey: 4, dictValue: '已完成', color: '#0F996D'}],
                TaskTypeOptions: [], // 任务类型
                TicketUrgencyOptions: [], // 紧急程度
                TaskRegionOptions: [], // 任务来源
                usersOptions: [], // 用户来源
                deskObj: {}, // 工作台参数
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 7
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30
                                )
                                picker.$emit('pick', [start, end])
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90
                                )
                                picker.$emit('pick', [start, end])
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            compareDate() {
                return (date)=>{
                    let nDate = new Date(date)
                    if (new Date().getTime() > nDate.getTime()) {
                        return true
                    }
                    return false

                }
            }
        },
        created () {
            this.getTaskCnt()
            // this.getTaskList()
            // this.getTaskType()
            // this.getTicketUrgency()
            // this.getUserRegionOptions()
            // this.getTaskRegionOptions()
        },
        methods: {
            goPage(name, query = {}) {
                this.$router.push({name, query})
            },
            async getTaskCnt() {
                let {code, data} = await this.$get(this.$api.taskCenter.taskCnt)
                if (code === 200) {
                    this.deskObj = data || {}
                }
            },
            handleSelectionChange(val) {
                this.selectedData = val
                console.log(val)
            },
            // 页码改变
            pageTurning (page) {
                this.pageObj.currentPage = page
                this.getTaskList()
                console.log(page)
            },
            // 页面数量改变
            sizeChange (size) {
                this.pageObj.size = size
                this.getTaskList()
                console.log(size, 'size')
            },
            handleClose () {
                this.dialogVisible = false
                if (this.dialogType.btnType !== 'batch') {
                    this.selectedData = []
                }
            },
            preview (row, e) {
                this.dialogType = e
                switch (e.text) {
                    case '移交':
                    case '完成任务':
                        if (this.selectedData.length === 0 && e.btnType === 'batch') {
                            this.$message.warning('请选择需要操作的任务')
                            return
                        } else if (e.btnType === 'single') {
                            this.selectedData = []
                            this.selectedData.push(row)
                            console.log(this.selectedData)
                        }
                        this.dialogVisible = true
                        break
                    case '创建':
                        this.dialogVisible = true
                        break
                    case '删除':
                        this.taskDelete('single', row)
                        break
                    default:
                        break
                }

            },
            // 创建会话
            async createTalk(e, row) {
                let channel = e
                let params = {
                    godId: row.godId,
                    godProfileId: row.godId,
                    imAccountName: channel.imAccountName,
                    imAccountId: channel.imAccountId,
                    channelType: channel.channelType,
                    channelId: channel.imChannelId,
                    reflectId: row.taskId,
                    reflectType: 3,
                    staffId: row.staffId,
                    ticketRemark: row.ticketRemark,
                    ticketUrgency: row.ticketUrgency
                }
                let {code, data, msg} = await this.$post(this.$api.taskCenter.taskCreateTalk, params)
                if (code === 200) {
                    await this.$router.push({name: 'mouduleconsulting-consulting-index', query: {ticketId: data.id}})
                } else {
                    this.$message.warning(msg)
                }
            },
            changeRadio(e) {
                console.log(e)
                console.log(this.chanelRadio)
            },
            // 搜索沟通渠道
            async searchTalk(row) {
                console.log(row)
                let {code, data} = await this.$get(this.$api.taskCenter.taskChannel, {userId: row.godId})
                if (code === 200) {
                    this.chanels = cloneDeep(data)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn-bg-blue {
        color: $--color-primary;
    }
    .head-view{
        width: 100%;
        height: 180px;
        padding: 20px 10px;
        background: #fff;
        border-radius:20px;
    }
    .foot-view{
        width: 100%;
        padding: 20px 30px;
        background: #fff;
        border-radius:20px;
    }
    .line{
        width: 100%;
        height: 21px;
        background-color: #F3F4F5;
    }
    .divider{
        width: 1px;
        height: 120px;
        border-left: 1px solid #CACDD7;
        opacity: 1;
        margin-top: 20px;
    }
    .div-left{
        flex: 666;
        height: 127px;
        align-items: center;
        div{
            flex: 1;
            justify-content: center;
            height: 100%;
            align-items: center;
        }
    }
    .div-right{
        flex: 953;
        height: 127px;
        align-items: center;
        justify-content: center;
        div{
            flex: 1;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
    }
    .subtitle-left{
        height: 23px;
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: #2D405E;
        opacity: 1;
        flex: 666;
        padding-left: 65px;
    }
    .subtitle-right{
        height: 23px;
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: #2D405E;
        opacity: 1;
        flex: 953;
        padding-left: 65px;
    }
    .title{
        height: 23px;
        font-size: 18px;
        font-weight: 400;
        color: #FF4D07;
        opacity: 1;
        margin-left: 20px;
        margin-top: 24px;
    }
    .num{
        line-height: 61px;
        text-align: center;
        font-size: 48px;
        font-weight: bold;
        color: #FF4D07;
        margin-top: 10px;
    }
    .num-title{
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei UI,serif;
        font-weight: 400;
        color: #FF4D07;
        letter-spacing: 5px;
    }
    .smtitle {
        justify-content: center;
        font-size: 18px;
        letter-spacing: 1px;
        font-weight: normal;
        margin-top: 15px;
    }
    .report-view{
        background: #fff;
        border-radius: 20px; height: 260px; width: 100%;margin-top: 20px
    }
    .mod-wrap{
        display: flex;
    }
    .mod-wrap .box{
        flex: 1;
        height: 340px;
        h3{
            border-bottom: 1px solid #F3F4F5;
            height: 46px;
            line-height: 46px;
            margin: 0 0 10px 0;
            font-weight: 14px;
            letter-spacing: 2px;
            text-indent: 40px;
        }
        .icon-hot{
            background: url(../../assets/images/hot.png) 5px 8px;
            background-size: 26px auto;
            background-repeat: no-repeat;
        }
        .icon-kucun{
            background: url(../../assets/images/kucun.png) 5px 10px;
            background-size: 24px auto;
            background-repeat: no-repeat;
        }
        .icon-notice{
            background: url(../../assets/images/tips1.png) 5px 8px;
            background-size: 26px auto;
            background-repeat: no-repeat;
        }
        .more{
            color: #999;letter-spacing: 2px; float:right;font-size: 10px;
        }
        .goods-list,.factory-list,.tab-list{
            border: 1px solid #F3F4F5;
            background: #F3F4F5;
            border-radius: 1px;
        }
        .goods-list{
            .rows{
                display: flex;
                .goods-pig{
                    flex: 0.48;
                    img{
                        margin: 10px 0 0 10px;
                        border: 1px solid #F4F3F3;
                    }
                }
                .goods-detail{
                    flex: 2;
                    padding-right: 10px;
                    height: 40px;
                    .goods-detail-name{
                        line-height: 20px;
                        padding: 5px;
                        background: #FAF7F7;
                        height: 50px;
                        margin: 5px 0;
                    }
                    .goods-detail-total{
                        height: 20px;
                        display: flex;
                        span{
                            flex: 1;
                            b{
                                margin: 0 5px;
                                color: orange;
                            }
                        }
                    }
                }

            }
            div {
                background: #fff;
                height: 82px;
                margin-top: 1px;
                border-radius: 5px;
            }
            div:first-child {
                margin-top: 0px;
            }
        }

        .factory-list{
            .rows{
                display: flex;
                .goods-pig{
                    flex: 0.38;
                    img{
                        margin: 10px 0 0 10px;
                        border: 1px solid #dedede;
                        border-radius: 50%;
                    }
                }
                .goods-detail{
                    flex: 2;
                    padding: 10px;
                    height: 40px;
                    .goods-detail-name{
                        line-height: 20px;
                        height: 20px;
                        margin-bottom: 6px;
                    }
                    .goods-detail-total{
                        height: 20px;
                        display: flex;
                        span{
                            flex: 1;
                            b{
                                margin: 0 5px;
                                color: orange;
                            }
                        }
                    }
                }

            }
            div {
                background: #fff;
                height: 82px;
                margin-top: 1px;
                border-radius: 5px;
            }
            div:first-child {
                margin-top: 0px;
            }
        }
    }
</style>

<template>
    <div class="container radiodiy">
        <div class="name">
            <span><b>*</b>模板名称：</span>
            <el-input
                class="input-name"
                v-model="detailInfo.name"
                placeholder="请输入"
            ></el-input>
        </div>
        <div class="name">
            <div>
                <span><b>*</b>收费方式：</span>
                <el-radio text-color="#f00" v-model="detailInfo.isFree" :label=0>
                    买家付费
                </el-radio>
                <el-radio v-model="detailInfo.isFree" :label=1>
                    商家包邮
                </el-radio>
            </div>
            <div class="right-col">
                <span><b>*</b>计费方式：</span>
                <el-radio v-model="detailInfo.chargeType" :label="0">
                    按件数计价
                </el-radio>
                <el-radio v-model="detailInfo.chargeType" :label="1">
                    按重量计价
                </el-radio>
                <!--
                <el-radio v-model="detailInfo.chargeType" :label="2">
                    按体积计价
                </el-radio> -->
            </div>
        </div>
        <div class="name">
            <div>
                <span><b>*</b>是否开启：</span>
                <el-radio v-model="detailInfo.isEnabled" :label="true">生效</el-radio>
                <el-radio v-model="detailInfo.isEnabled" :label="false">失效</el-radio>
            </div>
            <!-- <div class="name">
                <span><b>*</b>优先等级：</span>
                <el-select
                    style="width: 50%"
                    v-model="detailInfo.sort"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in deptTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div> -->
        </div>
        <div class="line2px"></div>
        <div v-show="detailInfo.isFree == 0" class="editareabox">
            <div class="edit_area">
                <div class="title">
                    <el-button
                        icon="el-icon-circle-plus-outline"
                        type="primary"
                        @click="addArea"
                    >
                        添加可配送区域
                    </el-button>
                    <el-button
                        icon="el-icon-circle-plus-outline"
                        type="primary"
                        @click="addFreeSend"
                    >
                        添加包邮条件
                    </el-button>
                </div>
            </div>
            <div class="editbox">
                <div class="edit_area_box bdl">
                    <div class="box_tit">
                        <p class="area_add">可配送区域</p>
                        <div>
                            <p>{{detailInfo.chargeType=='0'?'首件(个)':'首重(kg)'}}</p>
                            <p>运费(元)</p>
                            <p>{{detailInfo.chargeType=='0'?'续件(个)':'续重(kg)'}}</p>
                            <p>续费(元)</p>
                        </div>
                    </div>

                    <div
                        class="area_list"
                        v-for="(item, index) in detailInfo.transportFees"
                        :key="index"
                    >
                        <div class="area_address">
                            <ul>
                                <li v-if="isHidds && item.transportFeeAreas.length > 0" @click="handleHidds">
                                    <span>{{item.transportFeeAreas.length + "个区"}}</span>
                                    <i style="margin-left: 3px;" class="el-icon-circle-plus-outline"></i>
                                </li>
                                <li v-else v-for="(areaItem, idx) in item.transportFeeAreas" :key="areaItem.id">
                                    <span>{{areaItem.areaName}}</span>
                                    <i @click="deleteArea(item.transportFeeAreas, idx, 1)" class="el-icon-circle-close"></i>
                                </li>
                                <li class="allarea" v-if="item.transportFeeAreas.length == 0">全地区</li>

                                <li class="opabox">
                                    <span v-if="item.transportFeeAreas.length == 0" @click="editArea(item, index, 1)">{{toEditCanAreaText}}</span>
                                    <span @click="addAreaItem(item, index, 1)" v-if="item.transportFeeAreas.length != 0">新增</span>
                                </li>
                                <el-checkbox v-model="item.feeType" style="margin-left: 1px">超首重按全部重量计价</el-checkbox><span title="点击查看说明" style="color: #d4280a;font-weight: bold;margin: 0 6px;padding: 5px;" @click="showtips">说明</span>
                            </ul>
                            <div style="position: absolute;left: 50px;z-index: 999; border: 1px solid #dedede;padding: 10px; background: #f1f1f1;border-radius: 5px" v-if="isShow">
                                <div style="color: #d4280a;margin-bottom: 5px" @click="closetips">关闭</div>
                                <img src="../../../../assets/images/feenote.png" width="600"/>
                            </div>
                        </div>
                        <div class="rightflex">
                            <div class="area_first_num">
                                <el-input
                                    placeholder="请输入"
                                    type="number"
                                    v-model="item.firstPiece"
                                ></el-input>
                            </div>
                            <div class="area_first_price">
                                <el-input
                                    placeholder="请输入"
                                    class="rinput"
                                    type="number"
                                    v-model="item.firstFee"
                                ></el-input>
                            </div>

                            <div class="area_another_num">
                                <el-input
                                    placeholder="请输入"
                                    class="rinput"
                                    style="padding: 0 1px"
                                    v-model="item.continuousPiece"
                                ></el-input>
                            </div>
                            <div class="area_another_price">
                                <el-input
                                    placeholder="请输入"
                                    class="rinput"
                                    type="number"
                                    v-model="item.continuousFee"
                                ></el-input>
                            </div>
                        </div>
                        <div @click="areaItemDelete(index)" class="area_item_delete">
                            <i class="el-icon-delete-solid"></i>
                        </div>
                    </div>
                </div>
                <div class="free_radio">
                    <el-checkbox :true-label="1" :false-label="0" v-model="detailInfo.hasFreeCondition">指定条件包邮</el-checkbox>
                </div>
                <div class="edit_area_box bdl freesend">
                    <div class="box_tit">
                        <p class="area_add">可配送区域</p>
                        <div>
                            <p>设置包邮条件</p>
                            <p style="height: 10px"></p>
                        </div>
                    </div>
                    <div
                        class="area_list"
                        :class="item.freeType == 2 ? 'max_height' : ''"
                        v-for="(item, index) in detailInfo.transportFrees"
                        :key="index"
                    >
                        <div class="area_address">
                            <ul>
                                <li v-if="isHidd && item.transportFreeAreas.length > 0" @click="handleHidd">
                                    <span>{{item.transportFreeAreas.length + "个区"}}</span>
                                    <i style="margin-left: 3px;" class="el-icon-circle-plus-outline"></i>
                                </li>
                                <li v-for="(areaItem, idx) in item.transportFreeAreas" :key="areaItem.id" v-else>
                                    <span>{{areaItem.areaName}}</span>
                                    <i @click="deleteArea(item.transportFreeAreas, idx, 2)" class="el-icon-circle-close"></i>
                                </li>
                                <li class="allarea" v-if="item.transportFreeAreas.length == 0">全地区</li>
                                <li class="opabox">
                                    <span v-if="item.transportFreeAreas.length == 0" @click="editArea(item, index, 2)">{{toEditCanFreeText}}</span>
                                    <span @click="addAreaItem(item, index, 2)" v-if="item.transportFreeAreas.length != 0">新增</span>
                                </li>
                            </ul>
                        </div>
                        <div class="rightflex">
                            <div class="area_first_num" style="padding-left: 10px;">
                                <el-radio v-model="item.freeType" :label="0">
                                    满件包邮
                                </el-radio>
                                <el-radio v-model="item.freeType" :label="1">
                                    满金额包邮
                                </el-radio>
                                <el-radio v-model="item.freeType" :label="2">
                                    满件且满金额包邮
                                </el-radio>
                            </div>
                            <div class="area_first_num freesends" style="padding-left:10px">
                                <p
                                    v-show="
                                        item.freeType == '0' || item.freeType == '2'
                                    "
                                >
                                    满<el-input
                                        class="frnum"
                                        placeholder="请输入"
                                        v-model="item.piece"
                                    ></el-input>件包邮
                                </p>
                                <p v-show="item.freeType == '2'" style="height:10px"></p>
                                <p
                                    v-show="
                                        item.freeType == '1' || item.freeType == '2'
                                    "
                                >
                                    满<el-input
                                        class="frnum"
                                        placeholder="请输入"
                                        v-model="item.amount"
                                    ></el-input>元包邮
                                </p>
                            </div>
                        </div>
                        <div @click="areaItemDelete(index, 2)" class="area_item_delete">
                            <i class="el-icon-delete-solid"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn">
            <el-button type="info" @click="cancelDialog">取消</el-button>
            <!-- <el-button v-if="isEdit" type="primary" @click="updatePres">
                提交
            </el-button> -->
            <el-button type="primary" @click="addPres">提交</el-button>
        </div>
        <el-dialog
            title="选择地址"
            :visible.sync="dialogVisible"
            width="60%"
            height="80%"
            :close-on-click-modal="false"
            append-to-body
            :before-close="handleClose"
        >
            <div v-if="dialogVisible" class="set_address">
                <sn-address-select
                    :is-town-show="false"
                    @addressInfo="addressInfo"
                ></sn-address-select>
            </div>
            <div class="btn">
                <el-button type="info" @click="addCancelDialog">取消</el-button>
                <!-- <el-button v-if="isEdit" type="primary" @click="updatePres">
                    提交
                </el-button> -->
                <el-button type="primary" @click="addPresSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
/**
 * @name PrescriptionAddDialog (组件名称)
 * @module @/views/pages/moduledoctor/minecomponents/prescription-add-dialog
 * @desc 组件-我的-我的药房-添加药品
 * @author Wangming
 * @date 2020-08-03
 * @param {Boolean} [isEdit]    - 是否为编辑状态
 * @param {Object} [prescData]    - 编辑信息
 * @example 调用示例
 *  <prescription-add-dialog :is-edit="true" :presc-data="{}"></prescription-add-dialog>
 */
import cloneDeep from 'lodash/cloneDeep'
// import snAddressSelect from '@/components/snaddressselect/sn-address-select-common'

import snAddressSelect from './freight-address'
export default {
    name: 'FreightAddDialog',
    components: {
        snAddressSelect
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        prescData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            isShow:false,
            dialogVisible: false,
            chooseArea: [],
            chooseAreaSure: [],
            regTestt: /^\+?[1-9]\d*$/, // 大于0的正整数
            regTest: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            toEditCanArea: false,
            toEditCanFree: false,
            toEditCanAreaText: '编辑',
            toEditCanFreeText: '编辑',
            idx: '',
            type: '',
            deptTypeOptions: [
                {
                    value: 1,
                    label: '1'
                },
                {
                    value: 2,
                    label: '2'
                },
                {
                    value: 3,
                    label: '3'
                },
                {
                    value: 4,
                    label: '4'
                },
                {
                    value: 5,
                    label: '5'
                }
            ],
            areaInit: {
                transportFeeAreas: [],
                firstPiece: '1', // 首件/首重
                firstFee: '0', // 首件/首重费用
                continuousPiece: '1', // 续件/续重数量
                continuousFee: '0', // 续件/续重费用
                feeType: '0',
                sort: '', // 排序
                allArea: 1 // 全地区，0否1是
            },
            freeInit: {
                transportFreeAreas: [],
                freeType: 0, // 包邮方式 （0 满x件/重量包邮 1满金额包邮 2满x件/重量且满金额包邮）
                amount: '', // 需满金额
                piece: '', // 包邮x件/重量/体积
                sort: '', // 排序
                allArea: 1 // 全地区，0否1是
            },
            detailInfo: {
                name: '',
                storeId: '', // 店铺id
                isFree: 0, // 是否包邮 0 不包邮 1 包邮
                chargeType: 0, // 计费方式 0 件数 1 重量 2 体积
                hasFreeCondition: 0, // 是否含有包邮条件 0 不含有 1 含有
                // sort: 1, // 优先等级
                isEnabled: true,
                isSpecifiedPinkage: true,
                transportFees: [
                    {
                        transportFeeAreas: [],
                        firstPiece: '', // 首件/首重
                        firstFee: '', // 首件/首重费用
                        continuousPiece: '', // 续件/续重数量
                        continuousFee: '', // 续件/续重费用
                        feeType: '',
                        sort: '', // 排序
                        allArea: 1 // 全地区，0否1是
                    }
                ],
                transportFrees: [
                    {
                        transportFreeAreas: [],
                        freeType: 0, // 包邮方式 （0 满x件/重量包邮 1满金额包邮 2满x件/重量且满金额包邮）
                        amount: '', // 需满金额
                        piece: '', // 包邮x件/重量/体积
                        sort: '', // 排序
                        allArea: 1 // 全地区，0否1是
                    }
                ]
            },
            isHidd: true,
            isHidds: true
        }
    },
    computed: {},
    async mounted() {
        // this.getPresDetail()
        // eslint-disable-next-line no-unused-vars
        if (this.isEdit) {
            console.log(this.prescData)
            let data = await this.$get(this.$api.extra.transportDetail + '?id=' + this.prescData.id)
            console.log(data)
            if (data && data.code === 200) {
                let temp = data.data
                temp.transportFees.forEach(item => {
                    if (item.feeType === 0) {
                        // 'status'为属性名，'非活动'为修改后的内容
                        this.$set(item, 'feeType', false)
                    } else if (item.feeType === 1) {
                        this.$set(item, 'feeType', true)
                    }
                })
                this.detailInfo = temp
                this.detailInfo.transportFrees.map((v)=>{
                    if (v.piece == '-1' || v.piece == '-1.00') {
                        v.piece = ''
                    }
                    if (v.amount == '-1' || v.amount == '-1.00') {
                        v.amount = ''
                    }
                })
            } else {
                this.$message.error(data.msg)
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        setChargeType(e) {
            debugger
        },
        addAreaItem(item, idx, type) {
            console.log(item)
            this.idx = idx
            this.type = type
            this.dialogVisible = true
        },
        deleteArea(item, idx, type) {
            item.splice(idx, 1)
            console.log(item)
            if (item.length == 0) {
                if (type == 1) {
                    this.toEditCanAreaText = '编辑'
                } else {
                    this.toEditCanFreeText = '编辑'
                }
            }
        },
        showtips(){
            this.isShow=true
        },
        closetips(){
            this.isShow=false
        },
        editArea(item, idx, type) {
            console.log(item)
            this.idx = idx
            this.type = type
            if (type == 1) {
                if (!item.transportFeeAreas.length) {
                    this.dialogVisible = true
                } else {
                    if (!this.toEditCanArea) {
                        this.toEditCanArea = true
                        this.toEditCanAreaText = '取消'
                    } else {
                        this.toEditCanArea = false
                        this.toEditCanAreaText = '编辑'
                    }
                }
            } else {
                if (!item.transportFreeAreas.length) {
                    this.dialogVisible = true
                } else {
                    if (!this.toEditCanFree) {
                        this.toEditCanFree = true
                        this.toEditCanFreeText = '取消'
                    } else {
                        this.toEditCanFree = false
                        this.toEditCanFreeText = '编辑'
                    }
                }
            }

        },
        addressInfo(address) {
            console.log(address)
            this.chooseArea = address
        },
        addCancelDialog() {
            this.dialogVisible = false
            this.chooseArea = []
        },
        addPresSubmit() {
            if (!this.chooseArea.length) {
                return
            }
            this.chooseAreaSure = this.chooseArea
            if (this.type == 1) {
                let hasArea = ''
                this.detailInfo.transportFees.map((v)=>{
                    if (v.transportFeeAreas.length) {
                        v.transportFeeAreas.map((k)=>{
                            this.chooseArea.map((j)=>{
                                if (j.areaId == k.areaId) {
                                    hasArea += k.areaName + ','
                                }
                            })
                        })
                    }
                })
                if (hasArea) {
                    this.$message.error('"' + hasArea.substring(0, hasArea.length - 1) + '"' + '已选择，请删除重复区域')
                    return
                }
                this.dialogVisible = false
                let tempindx = this.detailInfo.transportFees[this.idx].transportFeeAreas
                let arr = cloneDeep(tempindx)
                this.detailInfo.transportFees[this.idx].transportFeeAreas = [...arr, ...this.chooseArea]
            } else {
                let hasArea = ''
                this.detailInfo.transportFrees.map((v)=>{
                    if (v.transportFreeAreas.length) {
                        v.transportFreeAreas.map((k)=>{
                            this.chooseArea.map((j)=>{
                                if (j.areaId == k.areaId) {
                                    hasArea += k.areaName + ','
                                }
                            })
                        })
                    }
                })
                console.log(hasArea)
                if (hasArea) {
                    this.$message.error('"' + hasArea.substring(0, hasArea.length - 1) + '"' + '已选择，请删除重复区域')
                    return
                }
                this.dialogVisible = false
                let arr = cloneDeep(this.detailInfo.transportFrees[this.idx].transportFreeAreas)
                this.detailInfo.transportFrees[this.idx].transportFreeAreas = [...arr, ...this.chooseArea]
            }
        },
        addArea() {
            console.log('新增区域')
            let j = cloneDeep(this.areaInit)
            debugger
            this.detailInfo.transportFees.push(j)
        },
        addFreeSend() {
            console.log('新增包邮')
            let j = cloneDeep(this.freeInit)
            this.detailInfo.transportFrees.push(j)
        },
        areaItemDelete(idx, type) {
            if (type == 2) {
                this.detailInfo.transportFrees.splice(idx, 1)
            } else {
                this.detailInfo.transportFees.splice(idx, 1)
            }
        },
        cancelDialog() {
            this.$emit('cancelDialog')
        },
        async updatePres() {},
        async addPres() {
            // presAdd
            //
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
            if (!userInfo.mch_id) {
                this.$message.error('未获取到店铺id')
                return
            }
            console.log(this.detailInfo)
            let flag = false
            if (!this.detailInfo.name) {
                this.$message.error('模板名称为必填')
                return
            }
            // if (this.detailInfo.isFree == 0) {
            //     this.detailInfo.transportFees.map((v)=>{
            //         if (
            //             !this.regTestt.test(v.firstPiece) ||
            //             !this.regTest.test(v.firstFee) ||
            //             !this.regTestt.test(v.continuousPiece) ||
            //             !this.regTest.test(v.continuousFee)
            //         ) {
            //             flag = true
            //         }
            //         if (v.transportFeeAreas.length) {
            //             v.allArea = 0
            //         }
            //     })
            //     if (this.detailInfo.hasFreeCondition == 1) {
            //         this.detailInfo.transportFrees.map((v)=>{
            //             if (v.freeType == 0) {
            //                 if (!this.regTest.test(v.piece)) {
            //                     flag = true
            //                 }
            //             }
            //             if (v.freeType == 1) {
            //                 if (!this.regTest.test(v.amount)) {
            //                     flag = true
            //                 }
            //             }
            //             if (v.freeType == 2) {
            //                 if (!this.regTest.test(v.amount) || !this.regTest.test(v.piece)) {
            //                     flag = true
            //                 }
            //             }
            //             if (v.transportFreeAreas.length) {
            //                 v.allArea = 0
            //             }
            //         })
            //     }
            // }
            // if (flag) {
            //     this.$message.error('模板数据必填且大于0')
            //     return
            // }

            // 如果选择地区修改全地区标识
            let temp = this.detailInfo

            temp.transportFees.forEach(item => {
                if (item.transportFeeAreas.length > 0) {
                    item.allArea = 0
                }
            })
            temp.transportFrees.forEach(item => {
                if (item.transportFreeAreas.length > 0) {
                    item.allArea = 0
                }
            })
            if (this.isEdit) {
                let temp = this.detailInfo
                temp.transportFees.forEach(item => {
                    if (item.feeType === false) {
                        // 'status'为属性名，'非活动'为修改后的内容
                        this.$set(item, 'feeType', '0')
                    } else if (item.feeType === true) {
                        this.$set(item, 'feeType', '1')
                    }
                })

                let {code, msg} = await this.$post(
                    this.$api.extra.transportSubmit, temp
                )
                if (code === 200) {
                    this.cancelDialog()
                    this.$emit('refreshPres')
                } else {
                    this.$message.error(msg)
                }
            } else {

                let {code, msg} = await this.$post(
                    this.$api.extra.transportSave, this.detailInfo
                )
                if (code === 200) {
                    this.cancelDialog()
                    this.$emit('refreshPres')
                } else {
                    this.$message.error(msg)
                }
            }
        },
        async getPresDetail() {
            // eslint-disable-next-line no-unused-vars
            let {code, data, msg} = await this.$get(this.$api.extra.transportList)
            if (code === 200) {
            }
            console.log(data)
        },
        handleHidd(){
            this.isHidd = !this.isHidd
        },
        handleHidds(){
            this.isHidds = !this.isHidds
        }
    }
}
</script>
<style lang="scss" scoped>
.set_address{
    height: 300px;
}
.bdl{
    border: 1px solid #eee;
    border-bottom: none;
}
.free_radio{
    height: 40px;
    display: flex;
    margin-top: 15px;
    align-items: center;
}
.edit_area_box {
    // margin: 20px 0;
    .box_tit {
        display: flex;
        text-align: center;
        align-items: center;
        border-bottom: 1px solid #eee;
        height: 40px;
        line-height: 40px;
        div p {
            flex: 2;
            padding: 0 10px;
            border-left: 1px solid #eee;
        }
        div {
            display: flex;
            flex: 1;
            align-items: center;
        }
        .area_add {
            width: 350px;
        }
    }
    .area_list {
        display: flex;
        align-items: center;
        position: relative;
        min-height: 50px;
        position: relative;
        border-bottom: 1px solid #eee;
        .area_item_delete {
            position: absolute;
            right: -28px;
            top: 50%;
            font-size: 23px;
            color: #fd7624;
            transform: translateY(-50%);
        }
        .rightflex .freesends {
            // padding-left: 20px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .frnum {
                width: 80px;
                margin: 0 5px;
            }
            // p {
            //     &:last-child {
            //         margin-top: 10px;
            //     }
            // }
        }
        .rightflex {
            display: flex;
            align-items: center;
            width: calc(100% - 350px);
            position: absolute;
            height: 100%;
            top:0;
            left: 350px;
            & > div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid #eee;
                position: relative;
                height: 100%;
            }
            .rinput {
                padding: 0 10px;
                box-sizing: border-box;
            }
        }
        .area_address {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 350px;
            padding:10px 0;
            cursor: pointer;
            ul {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                li {
                    padding: 3px;
                    background-color: $--color-primary;
                    color: #fff;
                    margin: 5px 5px 0;
                    border-radius: 4px;
                    font-size: 14px;
                    width: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i{
                        font-size: 16px;
                        color: #fff;
                        transition: all ease .5s;
                        display: none;
                        &:hover{
                            transform: scale(1.2);
                        }
                    }
                    &:hover{
                        i{
                            display: inline-block;
                        }
                    }
                }
                .allarea{

                }
                .opabox {
                    background-color: transparent;
                    span {
                        background-color: #fd7624;
                        padding: 3px;
                        margin-right: 10px;
                        border-radius: 4px;
                    }
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
    }
}
.freesend {
    // padding-top: 20px;
    .box_tit {
        display: flex;
        align-items: center;
        p {
            text-align: center;
            padding: 0 20px;
        }
    }
    .area_list {
        display: flex;
        align-items: center;
        // margin: 10px 0;
        min-height: 50px;
        position: relative;
        &.max_height{
            min-height: 100px;
        }
        .area_item_delete {
            position: absolute;
            right: -28px;
            top: 50%;
            font-size: 23px;
            color: #fd7624;
            transform: translateY(-50%);
        }
        // & > div {
        //     flex: 4;
        //     display: flex;
        //     padding: 0 20px;
        //     align-items: center;
        //     justify-content: center;
        // }
        .area_address {
            display: flex;
            align-items: center;
            width: 350px;
            cursor: pointer;
            ul {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                li {
                    padding: 3px;
                    background-color: $--color-primary;
                    color: #fff;
                    margin: 5px 5px 0;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .opabox {
                    background-color: transparent;
                    span {
                        background-color: #fd7624;
                        padding: 3px;
                        margin-right: 10px;
                        border-radius: 4px;
                    }
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
    }
}
.area_first_num /deep/ .el-radio {
    margin-right: 10px;
}
.btn {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        flex: 1;
    }
}
.edit_area {
    .title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
.editbox{
    // border: 1px solid #eee;
    border-bottom: none;
    // padding:15px 40px 0 20px;
    margin-top: 20px;
    // max-height: 600px;
    // overflow: auto;
}
.line2px{
    height: 1px;
    width: 100%;
    background-color: #eee;
    margin-bottom: 20px;
}
.container>.name{
    margin-bottom: 20px;
}
.name {
    display: flex;
    align-items: center;
    .input-name {
        width: 400px;
    }
    b {
        color: red;
        margin-right: 5px;
        font-size: 15px;
    }
    .right-col {
    }
    div {
        flex: 1;
    }
}
.drug-lists-item {
    .module-box {
        display: flex;
        align-items: center;
        position: relative;
    }
    .delete-icon {
        position: absolute;
        right: -20px;
        top: 7px;
        color: #fd7624;
        font-size: 20px;
        margin-left: 5px;
    }
    /deep/ .el-input__inner {
        padding: 0 5px;
    }
    /deep/ .cell {
        overflow: initial;
        .group-num .el-input__suffix {
            display: none;
        }
        .group-num .el-input__inner {
            text-align: center;
        }
    }
}

.p-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    padding-bottom: 30px;
}
.search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .p1 {
        flex: 1;
    }
    .p2 {
        width: 150px;
    }
    .p3 {
        width: 100px;
    }
    .p4 {
        width: 100px;
    }
}
.hteat {
    padding: 10px 20px;
}
.sign {
    font-weight: bold;
    margin-bottom: 20px;
    .drug-modu {
        font-weight: normal;
        color: $--color-primary;
        cursor: pointer;
        position: relative;
        padding-right: 15px;
        font-size: 15x;
        i {
            position: absolute;
            right: 0;
            top: 1px;
        }
    }
}
.patient-lists {
    margin-bottom: 30px;
}
.drug .sign {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.drug-item {
    margin-bottom: 30px;
    .add-item {
        color: #fd7624;
        cursor: pointer;
        margin-left: 10px;
    }
}
.radiodiy /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: #fd7624 !important;
}
.radiodiy /deep/ .el-radio__input.is-checked .el-radio__inner {
    background: #fd7624 !important;
    border-color: #fd7624 !important;
}

</style>

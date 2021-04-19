<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="收款日期">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="收款金额">
                            <el-input></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="收款人">
                            <el-input></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <div class="mini-switch-navorbtn">
                <div class="tabs-card" style="flex: 0.5">
                    <el-tabs v-model="activeProtype" type="card" >
                        <el-tab-pane label="未核销" name="0"></el-tab-pane>
                        <el-tab-pane label="已逾期" name="1"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="btnlist">
                    <!-- <button><icon-svg name="tianjia"></icon-svg><span>导出明细</span></button>
                    <button><icon-svg name="bianji"></icon-svg><span>批量出库</span></button>
                    <button><icon-svg name="success"></icon-svg><span>批量确认</span></button> -->
                    <button @click="shouxin"><icon-svg name="sousuo"></icon-svg><span>搜索</span></button>
                </div>
            </div>
            <sn-table
                :table-data="tableData"
                :columns="columns"
                :loading="loading"
                :page-obj="pageObj"
                :is-fit="true"
            >
                <template slot="drugName" slot-scope="scope">
                    <div v-for="item in scope.scope.orderItemList" :key="item.name">
                        <div>{{item.name + item.specs}}</div>
                    </div>
                </template>
                <template slot="amount" slot-scope="{scope}">
                    <div>
                        <div>{{'￥'+scope.amount}}</div>
                    </div>
                </template>
                <template slot="operate" slot-scope="scope">
                    <div v-if="scope.scope.status == 1"><el-button size="small" type="text" @click="previewSend(scope.scope)">发送药品</el-button></div>
                    <div v-else><el-button size="small" type="text" @click="preview(scope.scope)">查看</el-button></div>
                </template>
            </sn-table>
        
        <!-- <div class="name">
            <span><b>*</b>模板名称：</span>
            <el-input class="input-name" v-model="formdata.modelname" placeholder="请输入"></el-input>
        </div>
        <div  class="name">
            <div>
                <span><b>*</b>收费方式：</span>
                <el-radio v-model="formdata.chargetype" label="1">买家付费</el-radio>
                <el-radio v-model="formdata.chargetype" label="2">商家包邮</el-radio>
            </div>
            <div class="right-col">
                <span><b>*</b>计费方式：</span>
                <el-radio v-model="formdata.feeltype" label="1">按件数计价</el-radio>
                <el-radio v-model="formdata.feeltype" label="2">按重量计价</el-radio>
                <el-radio v-model="formdata.feeltype" label="3">按体积计价</el-radio>
            </div>

        </div>
        <div  class="name">
            <div>
                <span><b>*</b>是否开启：</span>
                <el-radio v-model="formdata.isdis" label="1">生效</el-radio>
                <el-radio v-model="formdata.isdis" label="2">失效</el-radio>

            </div>
            <div class="name">
                <span><b>*</b>优先等级：</span>
                <el-select style="width:50%" v-model="formdata.feellevel" placeholder="请选择">
                    <el-option v-for="item in deptTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
        </div> -->
        <div class="btn">
            <el-button type="info"  @click="cancelDialog">取消</el-button>
            <el-button v-if="isEdit" type="primary" @click="updatePres">提交</el-button>
            <el-button v-else type="primary" @click="addPres">提交</el-button>
        </div>
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
import {mapState, mapMutations} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: '',
    components: {
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
                }, {
                    value: 5,
                    label: '5'
                }
            ],
            formdata: {
                modelname:'',
                chargetype:'',
                feeltype:'',
                feellevel:'',
                isdis:''
            },
            tableData: [],
            columns: [
                {label: '订单编号', prop: 'serialNo', width: '140'},
                {label: '订单日期', prop: 'createTime', width: 180},
                {label: '订单金额', prop: 'patientName'},
                {label: '订单状态', prop: 'phone'},
                {label: '订单内容', slot: 'drugName', width: 180},
                {label: '超期日期', slot: 'amount'},
                {slot: 'operate', label: '操作'}
            ], // 操作列
        }
    },
    computed: {
        ...mapState('interrogation', {
            isDrugModuleShow: 'isDrugModuleShow',
            prescriptionModules: 'prescriptionModules'
        }),
        ...mapState('common', {
            userInfo: 'userInfo'
        })
    },
    beforeDestroy() {
        // this.PRESCRIPTIONMODULES([[]])
    },
    mounted() {
        if (this.isEdit) {
            this.listData = cloneDeep(this.prescData)
            this.drugData = this.listData.drugDataLists
            this.presName = this.listData.name
        }
        // this.getPresDetail()
        // eslint-disable-next-line no-unused-vars
    },
    methods: {
        ...mapMutations('interrogation', {
            ISDRUGMODULESHOW: 'ISDRUGMODULESHOW',
            PRESCRIPTIONMODULES: 'PRESCRIPTIONMODULES'
        }),
        cancelDialog() {
            this.$emit('cancelDialog')
        },
        async updatePres() {
            let J = cloneDeep(this.initPrescriptionModules())
            J.id = this.prescData.id
            J.name = this.presName
            J.medicalContent = JSON.stringify(J.medicalPrescriptionsList)
            console.log(J)
            let {code, msg} = await this.$post(
                this.$api.medical.presUpdate,
                J
            )
            if (code === 200) {
                this.$emit('refreshPres')
            } else {
                this.$message(msg)
            }
        },
        async addPres() {
            // presAdd
            let {code, msg} = await this.$post(
                this.$api.medical.presAdd,
                this.initPrescriptionModules()
            )
            if (code === 200) {
                this.$emit('refreshPres')
            } else {
                this.$message(msg)
            }
        },
        initPrescriptionModules() {
            let sendData = {}
            let initData = cloneDeep(this.prescriptionModules)
            sendData.medicalPrescriptionsList = []
            sendData.name = this.presName
            sendData.priority = 1
            sendData.doctorId = this.userInfo.account_id
            console.log(initData)
            initData.map((v) => {
                if (v.length) {
                    // let K = {}
                    // K.prescriptionType = '1'
                    // K.medicineItems = []
                    v.map((k) => {
                        let J = {}
                        J.dosage = k.singleDose.num
                        J.doseUnit =
                            k.doseUnit
                        J.dosageUnit =
                            k.singleDose.unit
                        J.drugType = k.drugType
                        J.duration = k.days
                        J.frequency = k.frequency.selectValue
                        J.medicineId = k.id
                        J.miniUnit = k.miniUnit
                        J.medicineName = k.name
                        J.quantity = k.total.num
                        J.specs = k.specs
                        J.price = k.price
                        J.unit = k.unit
                        J.usage = k.usage.selectValue
                        sendData.medicalPrescriptionsList.push(J)
                    })
                }
            })
            return sendData
        },
        // sino-medical/medicalPrescriptionTemplate/detail
        async getPresDetail() {
            // eslint-disable-next-line no-unused-vars
            let {code, data, meg} = this.$post(
                '/sino-medical/prescription-template/detail',
                {
                    id: '1295630656931385346'
                }
            )
        },
        drugModule() {
            if (this.isDrugModuleShow === 'drugModules') {
                this.ISDRUGMODULESHOW('healthRecords')
            } else {
                this.ISDRUGMODULESHOW('drugModules')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.btn {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    p {
        flex: 1;
    }
}

.name {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .input-name {
        width: 400px;
    }
    b{
        color: red;margin-right: 5px;font-size: 15px;
    }
    .right-col{
    }
    div{
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
        color: #09f;
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
        color: #09f;
        cursor: pointer;
        margin-left: 10px;
    }
}
</style>

<template>
    <div>
        <el-row class="elrow">
            <span class="sign">请选择省：</span>
            <el-select
                v-model="addressForm.provinceCode"
                v-if="provinceList"
                placeholder="请选择省"
                @change="provinceChange"
                size="small"
                filterable
            >
                <el-option value>请选择</el-option>
                <el-option
                    v-for="item in provinceList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </el-select>
        </el-row>
        <el-row class="elrow">
            <span class="sign">请选择市：</span>
            <el-select
                v-model="addressForm.cityCode"
                placeholder="请选择市"
                @change="cityChange"
                filterable
            >
                <el-option value>请选择</el-option>
                <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </el-select>
        </el-row>
        <el-row class="elrow">
            <span class="sign">请选择区（县）：</span>
            <el-select
                v-model="addressForm.areaCode"
                placeholder="请选择区（县）"
                @change="areaChange"
                multiple
                filterable
            >
                <el-option value>请选择</el-option>
                <el-option
                    v-for="item in areaList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </el-select>
        </el-row>
        <el-row v-if="isTownShow">
            <el-select
                v-model="addressForm.townCode"
                @change="townChange"
                placeholder="请选择街道（乡镇）"
                filterable
            >
                <el-option value>请选择</el-option>
                <el-option
                    v-for="item in townList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </el-select>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        isTownShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        colSpan() {
            let J = {}
            if (this.isTownShow) {
                J = {
                    provinceWidth: 9,
                    cityWidth: 5,
                    areaWidth: 5,
                    townWidth: 5
                }
            } else {
                J = {
                    provinceWidth: 9,
                    cityWidth: 7,
                    areaWidth: 8,
                    townWidth: 5
                }
            }
            return J
        }
    },
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            townList: [],
            addressForm: {
                provinceCode: '',
                cityCode: '',
                areaCode: '',
                townCode: ''
            }
        }
    },
    mounted() {
        this.getAdress({
            // 获取省列表
            level: 0,
            code: ''
        })
    },
    methods: {
        getAdress(options) {
            this.$get('/sino-dst/region/select', options).then((data) => {
                if (data.code === 200) {
                    switch (options.level) {
                        case 0:
                            this.provinceList = data.data
                            this.cityList = []
                            this.areaList = []
                            this.townList = []
                            this.addressForm.cityCode = ''
                            this.addressForm.areaCode = ''
                            this.addressForm.townCode = ''
                            break
                        case 1:
                            this.cityList = data.data
                            this.areaList = []
                            this.townList = []
                            this.addressForm.cityCode = ''
                            this.addressForm.areaCode = ''
                            this.addressForm.townCode = ''
                            break
                        case 2:
                            this.areaList = data.data
                            this.townList = []
                            this.addressForm.areaCode = ''
                            this.addressForm.townCode = ''
                            break
                        case 3:
                            this.townList = data.data
                            this.addressForm.townCode = ''
                            break
                        default:
                            return ''
                    }
                }
            })
        },
        provinceChange(val) {
            this.getAdress({
                level: 1,
                code: val
            })
            // this.$emit('addressInfo', this.addressForm)
        },
        cityChange(val) {
            this.getAdress({
                level: 2,
                code: val
            })
            // this.$emit('addressInfo', this.addressForm)
        },
        areaChange(val) {
            this.getAdress({
                level: 3,
                code: val
            })
            let arr = []
            this.areaList.map((v)=>{
                this.addressForm.areaCode.map((k)=>{
                    if (v.code == k) {
                        let j = {}
                        j.areaId = v.code
                        j.areaName = v.name
                        arr.push(j)
                    }
                })
            })
            this.$emit('addressInfo', arr)
        },
        townChange() {
            this.$emit('addressInfo', this.addressForm)
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-select {
    flex: 1;
}
.elrow{
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    .sign{
        width:120px;
        text-align: right;
    }
}
</style>

<template>
    <div>
        <el-row class="elrow">
            <span class="sign">请选择省：</span>
            <el-select
                multiple
                v-model="addressForm.provinceCode"
                v-if="addList"
                placeholder="请选择省"
                @change="provinceChange"
                @remove-tag="removeProvince"
                size="small"
                filterable
            >
                <el-option
                    v-for="item in addList"
                    :key="item.provinceCode"
                    :label="item.provinceName"
                    :value="item.provinceCode"
                ></el-option>
            </el-select>
        </el-row>
        <el-row class="elrow">
            <span class="sign">请选择市：</span>
            <div class="cityBox" v-if="hiddCity">
                <div class="areaRow">
                    <el-tag
                        @close="delCityChange(item.code)"
                        v-model="addressForm.areaCode"
                        v-for="item in cityList"
                        :key="item.cityCode"
                        closable
                        :type="item.type"
                    >
                        {{item.cityName}}
                    </el-tag>
                </div>
            </div>
            <el-tag @click="changeHiddCity" v-else-if="!hiddCity&& cityList.length > 0">{{cityList.length}}  +</el-tag>
        </el-row>
        <el-row class="elrow">
            <span class="sign">区（县）：</span>
            <div class="cityBox" v-if="hiddArea">
                <div class="areaRow">
                    <el-tag
                        @close="delAreaChange(item.code)"
                        v-model="addressForm.areaCode"
                        v-for="item in areaList"
                        :key="item.areaCode"
                        closable
                        :type="item.type"
                    >
                        {{item.name}}
                    </el-tag>
                </div>
            </div>
            <el-tag @click="changeHiddArea" v-else-if="!hiddArea && areaList.length> 0">{{areaList.length}}  +</el-tag>
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
import allAreaList from '@/components/snaddressselect/new_area'

export default {
    props: {
        isTownShow: {
            type: Boolean,
            default: false
        },
        isAreaShow: {
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
    watch:{
        cityList(newval,oldval){
            if(newval.length < oldval.length){
                return false
            }
            if(newval.length == 0 && this.areaList.length == 0){
                this.$data.selectApp=''
            }
            newval.forEach(item => {
                item.childrenRegion.forEach(item1 => {
                    this.areaList.push(item1)
                })
            })
            this.repeatArr()
        }
    },
    data() {
        return {
            addList: [], // 全省市区
            cityList: [],
            areaList: [],
            hiddCity: false,
            hiddArea: false,
            addressForm: {
                provinceCode: '',
                cityCode: '',
                areaCode: '',
                townCode: ''
            },
        }
    },
    mounted() {
        this.addList = allAreaList.childrenRegion
    },
    methods: {
        provinceChange(val) {
            let arr = [];
            val.forEach(item => {
                for(let i=0;i<this.addList.length;i++){
                    if(item == this.addList[i].provinceCode){
                        arr = arr.concat(this.addList[i].childrenRegion)
                    }
                }
            })
            this.cityList = arr
        },
        removeProvince(val){
            // 删除省对应的市
            for(let i=0;i<this.cityList.length;i++){
                if(this.cityList[i].provinceCode == val){
                    this.cityList.splice(i,1)
                }
            }

            this.delAddress(val,"province")
        },
        delAddress(code,type){
            // 删除省对应的区
            let list = this.areaList
            let codeStr = type=="province" ? "provinceCode" : "cityCode"

            for(let i=0;i<list.length;){
                if(list[i][codeStr] == code){
                    list.splice(i,1)
                }else{
                    i++
                }
            }
        },
        repeatArr() {
            let repeatRrr = [];
            let repeatRrrS = [];
            //先把请求的数据去重
            for (let i = 0; i < this.areaList.length; i++) {
                if (!repeatRrr.includes(this.areaList[i].districtCode)) {
                    repeatRrr.push(this.areaList[i].districtCode);
                    repeatRrrS.push(this.areaList[i]);
                }
            }

            this.areaList = repeatRrrS
            this.packageArr()
        },
        packageArr(){
            //数据组装
            let arr = []
            for(let i = 0;i < this.areaList.length;i++) {
                arr.push({
                    areaId: this.areaList[i].districtCode,
                    areaName: this.areaList[i].districtName
                })
            }
            this.$emit('addressInfo', arr)
        },
        delCityChange(val){
             for(let i=0;i<this.cityList.length;i++){
                 if(this.cityList[i].cityCode == val){
                     this.delAddress(this.cityList[i].cityCode,"city")
                     this.cityList.splice(i,1)
                     return false
                 }
             }
        },
        delAreaChange(val) {
            // this.getAdress({
            //     level: 3,
            //     code: val
            // })
            // this.areaList.map((v)=>{
            //     // this.addressForm.areaCode.map((k)=>{
            //     if (v.code != val) {
            //         arr.push(v)
            //     }
            //     // })
            // })
            // this.areaList = arr
            let arr = []

            if(this.areaList.length == 1){
                this.cityList = []
            }

            for(let i = 0;i < this.areaList.length;i++) {
                if(val == this.areaList[i].districtCode){
                    this.areaList.splice(i,1)
                }
            }
            for(let j = 0;j < this.areaList.length;j++) {
                arr.push({
                    areaId: this.areaList[j].districtCode,
                    areaName: this.areaList[j].districtName
                })
            }
            this.$emit('addressInfo', arr)
        },
        townChange() {
            this.$emit('addressInfo', this.addressForm)
        },
        changeHiddArea(){
            this.hiddArea = !this.hiddArea
        },
        changeHiddCity(){
            this.hiddCity = !this.hiddCity
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
    .areaRow{
        width: 700px;
        display: flex;
        flex-wrap: wrap;

        .el-tag {
            margin-bottom: 10px;
        }
    }

    .cityBox{
        max-height: 110px;
        overflow-y:scroll;
        overflow-x:hidden;
    }
</style>

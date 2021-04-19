<template>
    <div class="container bgff">
        <div class="tab w400">
            <tab @changeTabCurrent="changeTabCurrent"></tab>
        </div>
        <div @callPatient="callPatient" :is="currentModule" class="module-box w400">
        </div>
    </div>
</template>
<script>
import tab from '../patienthandle/handle-tab'
import des from '../patienthandle/handle-des'
import records from '../patienthandle/handle-records'
import prescription from '../patienthandle/handle-prescription'
export default {
    components: {
        tab,
        des,
        records,
        prescription
    },
    data() {
        return {
            currentModule: 'des'
        }
    },
    methods: {
        changeTabCurrent(item) {
            console.log(item)
            this.currentModule = item.componentName
        },
        callPatient() {
            console.log(567)
        }
    }
}
</script>
<style lang="scss" scoped>
    .w400{
        width:100%;
    }
    .module-box{
        padding:10px 20px;
    }

</style>

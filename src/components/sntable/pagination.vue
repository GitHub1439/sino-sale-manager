<template>
    <div>
        <el-pagination
            v-if="pageObj.total > 0"
            background
            layout="total, prev, pager, next, sizes, jumper"
            :page-size="pageObj.size"
            :total="pageObj.total"
            :current-page="pageObj.currentPage"
            @current-change="pageObj.func"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pageObj: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>

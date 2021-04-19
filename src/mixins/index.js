let dealMixin = {
    beforeDestroy() {
        window.removeEventListener('scroll', this.onscroll)
    },
    mounted() {
        window.addEventListener('scroll', this.onscroll)
    },
    methods: {
        mixinsHideDropDown(refs) {
            refs.forEach(element => {
                if (this.$refs[element]) {
                    if (this.$refs[element].hidePicker) { // el-date-picker
                        this.$refs[element].hidePicker()
                    } else if (this.$refs[element].toggleDropDownVisible) { // el-cascader
                        this.$refs[element].toggleDropDownVisible(false)
                    } else { // el-select
                        this.$refs[element].blur()
                    }
                }
            })
        }
    }
}

export default dealMixin

import Vue from 'vue'
import nodata from './nodata'
import snTable from './sntable/sn-table'
import snScroll from './snscroll/sn-scroll'

Vue.component('tempty', nodata)
Vue.component('sn-table', snTable)
Vue.component('sn-scroll', snScroll)
Vue.prototype.noDataTemplate = () => {
    let url = require('../assets/images/icon-nodata.png')
    let template = `<div class="empty-wrap classname">
            <img src="${url}" alt=""></img>
            <div class="empty-text">暂无数据</div>
        </div>`
    return template
}

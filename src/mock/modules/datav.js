import Mock from 'mockjs'

// 组件列表
export function get() {
    // 生成数据列表
    return {
        isOpen: true,
        url: '/datav/get',
        type: 'post',
        initData(opts) {
            // if(opts.data.page){}
            let dataList = []
            for (let i = 0; i < opts.data.data.pageSize; i++) {
                dataList.push(
                    Mock.mock({
                        id: '@increment',
                        datavname: '@name',
                        remark: '@name',
                        img: 'https://www.tubiaoxiu.com/src/assets/chart/icon/' + (i + 1) + '.png',
                        'time|1-100': 100,
                        ip: '@ip',
                        createDate: '@datetime'
                    })
                )
            }
            return dataList
        }
    }
}
// 模版列表
export function gettemplate() {
    // 生成数据列表
    let dataList = []
    for (let i = 0; i < 5; i++) {
        dataList.push(
            Mock.mock({
                id: '@increment',
                datavname: '@name',
                remark: '@name',
                img: './static/img/image.png',
                'time|1-100': 100,
                ip: '@ip',
                createDate: '@datetime'
            })
        )
    }
    return {
        isOpen: true,
        url: '/datav/gettemplate',
        type: 'post',
        data: {
            msg: 'success',
            code: 0,
            data: dataList,
            total: dataList.length
        }
    }
}

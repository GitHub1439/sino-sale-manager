import Moment from 'moment'
const videoInterrogationStatus = val => {
    // 问诊状态
    switch (val) {
    case 1:
        return {
            status: '进行中',
            isHighLight: true
        }
    case 2:
        return {
            status: '未就诊',
            isHighLight: false
        }
    default:
        return {
            status: '未就诊',
            isHighLight: false
        }
    }
}
const sex = val => {
    switch (val) {
    case 1:
        return '男'
    case 2:
        return '女'
    default:
        return ''
    }
}
const recordType = val => {
    switch (val) {
    case 1:
        return '线下'
    case 2:
        return '图文问诊'
    case 3:
        return '视频问诊'
    default:
        return '未知'
    }
}

const formatDate = val => {
    return Moment(val).format('YYYY-MM-DD HH:mm')
}

export {
    videoInterrogationStatus,
    sex,
    recordType,
    formatDate
}

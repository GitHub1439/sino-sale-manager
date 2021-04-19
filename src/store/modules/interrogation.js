// 医生问诊
/* eslint-disable no-shadow */
import RtcClient from '@/utils/rtcClient'
import cloneDeep from 'lodash/cloneDeep'
import {formatSeconds} from '@/utils/index'
const state = {
    isBegin: false, // 是否开始视频问诊
    isVideoEnd: false, // 医生结束视频但没有结束问诊
    isCalling: false, // 是否在叫号中
    videoTimer: null,
    rewardsDrawer: true,
    videoTimerCount: 0,
    timerCountFormat: '',
    currentPatientInfo: JSON.parse(localStorage.getItem('currentPatientInfo')), // 病人问诊信息，包含病例、处方、诊断等
    patientBasicData: {
        patientName: '',
        patientSex: '',
        patientAge: '',
        scheduleDate: '',
        scheduleName: '',
        deptName: '',
        idCard: '',
        phone: '',
        height: '',
        birthday: '',
        type: '',
        id: '',
        checkImgUrl: '',
        healthStatus: ''
    }, // 病人基础信息，包含姓名、年龄等
    isDrugModuleShow: 'healthRecords', // 是否显示药品模板
    recordInfo: {
        medicalSerialNo: '', // 就诊流水号
        chiefComplaint: '', // 主诉
        presentIllness: '', // 现病史
        diagnosis: '', // 诊断
        historyIllness: '' // 既往史
    }, // 门诊病例
    diagnosis: [], // 医生已选诊断
    isVideoDomShow: true, // 视频模块是否显示
    prescriptionLists: {
        data: []
    }, // 处方药品列表
    prescriptionModules: [[]], // 多处方
    callPatient: {
        imAccount: 'wangming', // 用户名
        sdkAppId: '1400411969', // 应用Id
        // eslint-disable-next-line max-len
        userSig: 'eJw1TssKgkAU-ZfZGnJnHOchtCpoofTAQHAXziTX8IGZSdG-N2jtzpvzJuck9e3UYW9JJIArgNWsjbYnEWE*kIXfze3SdWhIRDkAp1QLvThobDPgFefCljINiisWMBGClMzB-wKWLlCLaqpwk2t2Gqssfnq0yLk9vlIjldfsH*WhyJJ4105tuf4VB6zdORpqGQjJhfh8ASr-M4k_', // 签名
        userId: '', // 用户ID
        roomId: localStorage.getItem('roomId'), // 房间ID
        clientDomId: 'video-patient',
        streamDomId: 'video-doctor'
    },
    RTC: null // 视频对象
}

const mutations = {
    // 开始问诊
    ISBEGIN(state, val) {
        state.isBegin = val
        console.log(5555)
        state.isVideoDomShow = val
        if (val && !state.isVideoEnd) {
            state.videoTimer = setInterval(()=>{
                state.videoTimerCount++
                state.timerCountFormat = formatSeconds(state.videoTimerCount)
            }, 1000)
            // state.RTC = null
            if (!state.RTC) {
                state.callPatient.userId = state.callPatient.imAccount
                state.RTC = new RtcClient(state.callPatient)
                state.RTC.join()
            } else {
                state.RTC.leave()
                state.RTC.join()
            }
        } else {
            if (state.RTC) {
                state.RTC.leave()
                state.RTC = null
                state.videoTimerCount = 0
                clearInterval(state.videoTimer)
            }
        }
    },
    // 医生结束视频但未结束问诊
    ISVIDEOEND(state, val) {
        state.isVideoEnd = val
        clearInterval(state.videoTimer)
        if (val) {
            if (state.RTC) {
                state.RTC.leave()
                state.RTC = null
            }
        }
    },
    ISCALLING(state, val) {
        state.isCalling = val
    },
    // 全局视频对象
    RTC(state, val) {
        state.RTC = val
    },
    // 健康档案抽屉
    REWARDSDRAWER(state, val) {
        state.rewardsDrawer = val
    },
    // 视频问诊开房信息
    CALLPATIENT(state, val) {
        Object.assign(state.callPatient, val)
    },
    // 医生诊断已选病种
    DIAGNOSIS(state, val) {
        state.diagnosis = val
        state.recordInfo.diagnosis = val.join(',')
    },
    // 当前视频问诊病人诊断信息
    CURRENTPATIENTINFO(state, val) {
        // if (!val.roomId && state.currentPatientInfo) {
        //     val.roomId = state.currentPatientInfo.roomId
        // }
        console.log('medicalSerialNo', val)
        state.currentPatientInfo = val
        state.recordInfo.medicalSerialNo = val.medicalSerialNo
        console.log('state.recordInfo.medicalSerialNo', state.recordInfo.medicalSerialNo)
        localStorage.setItem('currentPatientInfo', JSON.stringify(state.currentPatientInfo))
    },
    // 当前视频问诊病人基础信息
    PATIENTBASICDATA(state, val) {
        Object.assign(state.patientBasicData, val)
        Object.keys(state.patientBasicData).map((v)=>{
            if (!state.patientBasicData[v] && state.patientBasicData[v] !== 0) {
                state.patientBasicData[v] = '未填写'
            }
        })
    },
    // 门诊病例
    RECORDINFO(state, val) {
        Object.assign(state.recordInfo, val)
    },
    // 视频模块是否显示
    ISVIDEODOMSHOW(state, val) {
        state.isVideoDomShow = val
    },
    // 处方药品
    PRESCRIPTIONLISTS(state, val) {
        if (val.isAdd) {
            let J =  Object.assign({}, val)
            J.data = cloneDeep(state.prescriptionModules[J.index])
            J.data.push(cloneDeep(val.data))
            state.prescriptionLists = Object.assign({}, J)
        } else {
            state.prescriptionLists = val
        }
    },
    // 多处方
    PRESCRIPTIONMODULES(state, val) {
        state.prescriptionModules = val
        console.log(state.prescriptionModules)
    },
    // 处方/药品模板
    ISDRUGMODULESHOW(state, val) {
        state.isDrugModuleShow = val
    },
    // 退出问诊
    EXITOUTVIDEO(state) {
        state.recordInfo = {
            medicalSerialNo: '', // 就诊流水号
            chiefComplaint: '', // 主诉
            presentIllness: '', // 现病史
            diagnosis: '', // 诊断
            historyIllness: '' // 既往史
        }
        state.diagnosis = []
        state.isVideoDomShow = false
        state.prescriptionLists = {
            data: []
        }, // 处方药品列表
        state.prescriptionModules = [[]]
    }
}

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

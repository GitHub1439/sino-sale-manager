import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
let options = {
//     SDKAppID: store.state.session.callPatient.sdkAppId // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
//     SDKAppID: '1400411969' // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    SDKAppID: localStorage.getItem('sdkAppId')
}
let tim = TIM.create(options)
tim.setLogLevel(1) // 0 开启日志 1 关闭日志
tim.registerPlugin({'cos-js-sdk': COS})
export default tim

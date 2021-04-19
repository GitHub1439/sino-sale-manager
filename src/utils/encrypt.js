import {Base64} from 'js-base64'

// 加盐
let salting = 'yn-sinocare'

// 加密
export const encryptString = name => {
    return Base64.encode(name + salting)
}

// 解密
export const decodeString = name => {
    let decodeName = Base64.decode(name) || ''
    if (decodeName && decodeName.split && decodeName.split(salting) && decodeName.split(salting)[0]) {
        return decodeName.split(salting)[0]
    }
    return ''
}

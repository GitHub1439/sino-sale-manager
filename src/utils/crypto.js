import CryptoJS from 'crypto-js'

export default class crypto {
    // 使用AesUtil.genAesKey()生成,需和后端配置保持一致
    static aesKey = 'SnxWJxWmJzlS7wZk4f45VEVWTWXeeor4'

    // 使用DesUtil.genDesKey()生成,需和后端配置保持一致
    static desKey = 'T8KsZldUXCrQO6lH'

    /**
     * aes 加密方法，同java：AesUtil.encryptToBase64(text, aesKey);
     */
    static encryptAES(data, key) {
        const dataBytes = CryptoJS.enc.Utf8.parse(data)
        const keyBytes = CryptoJS.enc.Utf8.parse(key)
        const encrypted = CryptoJS.AES.encrypt(dataBytes, keyBytes, {
            iv: keyBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    }

    /**
     * aes 解密方法，同java：AesUtil.decryptFormBase64ToString(encrypt, aesKey);
     */
    static decryptAES(data, key) {
        const keyBytes = CryptoJS.enc.Utf8.parse(key)
        const decrypted = CryptoJS.AES.decrypt(data, keyBytes, {
            iv: keyBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return CryptoJS.enc.Utf8.stringify(decrypted)
    }

    /**
     * des 加密方法，同java：DesUtil.encryptToBase64(text, desKey)
     */
    static encryptDES(data, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key)
        const encrypted = CryptoJS.DES.encrypt(data, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        return encrypted.toString()
    }

    /**
     * des 解密方法，同java：DesUtil.decryptFormBase64(encryptBase64, desKey);
     */
    static decryptDES(data, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key)
        const decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(data)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}

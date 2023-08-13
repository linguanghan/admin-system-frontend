import JSEncrypt from 'jsencrypt/bin/jsencrypt'
/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description RSA加密
 * @param data
 * @returns {Promise<{param: PromiseLike<ArrayBuffer>}|*>}
 */
export async function encryptedData(data) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(
    "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKvCed1MUPZ21POv15qzSb7GkMJDOWAw0X7/l/+KsPbEUltdzkak0nLfO7+tm6JQ7XeCfX5TILqDYVMACvKJGNECAwEAAQ=="
  )
  return encrypt.encrypt(data)
}

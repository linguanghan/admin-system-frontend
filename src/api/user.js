import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'
// 向后端发起登录验证
// 登录接口
export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  console.log('data',data)
  return request({
    url: '/login',
    method: 'get',
    params:{
      'username': startTime,
      'password': endTime,
    },
  })
}

export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

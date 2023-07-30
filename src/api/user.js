import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

var urlPrefix = 'http://47.122.17.43:39003'
// var urlPrefix = 'http://127.0.0.1:39003'

export async function login(data) {
  console.log(data);
  const password = await encryptedData(data?.password)
  
  console.log(password);
  return request({
     url: urlPrefix+'/user/login',
     method: 'post',
     params:{
      'userName': data.username,
      'password': password,
    }
    
  })
}

export function getUserInfo(username) {
  return request({
    url: urlPrefix+'/user/getUserInfoByName',
     method: 'post',
     params:{
      'username': username
    }
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

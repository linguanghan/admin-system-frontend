import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'


export async function login(data) {
  console.log(data);
  const password = await encryptedData(data?.password)
  
  console.log(password);
  return request({
     url: '/user/login',
     method: 'post',
     params:{
      'userName': data.username,
      'password': password,
    }
    
  })
}

export function getUserInfo(username) {
  return request({
    url: '/user/getUserInfoByName',
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

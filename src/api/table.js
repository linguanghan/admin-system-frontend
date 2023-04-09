import request from '@/utils/request'

var urlPrefix = 'http://47.122.17.43:39001'
// var urlPrefix = 'http://localhost:39001'

export function getList(data) {
  return request({
    url: '/table/getList',
    method: 'post',
    data,
  })
}

export function getDailyList(startTime,endTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/register/rangedate/detail',
    url: urlPrefix+'/player/register/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

export function doEdit(data) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}

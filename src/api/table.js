import request from '@/utils/request'


export function getList(data) {
  return request({
    url: '/table/getList',
    method: 'post',
    data,
  })
}

export function getDailyList(startTime,endTime, pageNo, pageSize ) {
  return request({
    // url: 'http://47.122.17.43:39003/player/register/rangedate/detail',
    url: '/player/register/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
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

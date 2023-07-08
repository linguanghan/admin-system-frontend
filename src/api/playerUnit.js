import request from '@/utils/request'

// var urlPrefix = 'http://47.122.17.43:39003'
var urlPrefix = 'http://localhost:39003'

export function getHuibenDetailList(startTime,endTime, pageNo, pageSize) {
  return request({
    url: urlPrefix+'/player/unit/huiben/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}

export function getPurchaseDetailList(startTime,endTime, pageNo, pageSize) {
  return request({
    url: urlPrefix+'/player/unit/purchase/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize

    }
  })
}

export function getVersionDetailList(startTime,endTime, pageNo, pageSize) {
  return request({
    url: urlPrefix+'/player/unit/version/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize

    }
  })
}


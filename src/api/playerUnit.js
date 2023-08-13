import request from '@/utils/request'


export function getHuibenDetailList(startTime,endTime, pageNo, pageSize) {
  return request({
    url: '/player/unit/huiben/rangedate/detail',
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
    url: '/player/unit/purchase/rangedate/detail',
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
    url: '/player/unit/version/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize

    }
  })
}


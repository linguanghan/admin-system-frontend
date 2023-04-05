import request from '@/utils/request'

import urlPrefix from '@/api/env'

export function getHuibenDetailList(startTime,endTime) {
  return request({
    url: urlPrefix+'/player/unit/huiben/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

export function getPurchaseDetailList(startTime,endTime) {
  return request({
    url: urlPrefix+'/player/unit/purchase/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

export function getVersionDetailList(startTime,endTime) {
  return request({
    url: urlPrefix+'/player/unit/version/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}


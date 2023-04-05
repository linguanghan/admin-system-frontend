import request from '@/utils/request'

import urlPrefix from '@/api/env'

export function getVideoDetailList(startTime,endTime) {
  return request({
    url: urlPrefix+'/player/video/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}


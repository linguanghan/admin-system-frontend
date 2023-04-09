import request from '@/utils/request'

var urlPrefix = 'http://47.122.17.43:39001'
// var urlPrefix = 'http://localhost:39001'

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


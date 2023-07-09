import request from '@/utils/request'

var urlPrefix = 'http://47.122.17.43:39003'
// var urlPrefix = 'http://localhost:39003'

export function getVideoDetailList(startTime,endTime,pageNo,pageSize) {
  return request({
    url: urlPrefix+'/player/video/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}


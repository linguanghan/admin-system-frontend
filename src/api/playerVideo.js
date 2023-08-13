import request from '@/utils/request'


export function getVideoDetailList(startTime,endTime,pageNo,pageSize) {
  return request({
    url: '/player/video/rangedate/detail',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}


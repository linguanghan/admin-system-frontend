import request from '@/utils/request'


export function getPlayerOrderList(startTime,endTime,pageNo,pageSize) {
  return request({
    url: '/player/unit/page',
    method: 'post',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}


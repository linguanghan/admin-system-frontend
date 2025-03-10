import request from '@/utils/request'

export function queryPlayerRecharge(startTime,endTime) {
  return request({
    url: '/player/unit/queryPlayerRecharge',
    method: 'get',
    params: {
      'startTime': startTime,
      'endTime' : endTime
    },
  })
}


export function queryAppRechargeCount() {
  return request({
    url: '/player/unit/queryAppRechargeCount',
    method: 'get'
  })
}

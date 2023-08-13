import request from '@/utils/request'


export function getList(startTime,endTime) {
  return request({
    url: '/player/register/num/day',
    method: 'get',
    params: {
      'startTime': startTime,
      'endTime' : endTime
    },
  })
}

export function getRegisterNum(dateTime) {
  return request({
    url: '/player/register/num',
    method: 'get',
    params: {
      'dateTime': dateTime
    },
  })
}

export function getRegisterDetailList(startTime,endTime,pageNo,pageSize) {
  return request({
    url: '/player/register/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}

export function getActiveList(startTime,endTime) {
  return request({
    url: '/player/active/num/day',
    method: 'get',
    params: {
      'startTime': startTime,
      'endTime' : endTime
    },
  })
}

export function getActiveNum(dateTime) {
  return request({
    url: '/player/active/num',
    method: 'get',
    params: {
      'dateTime': dateTime
    },
  })
}

export function getActiveDetailList(countTime,pageNo,pageSize) {
  return request({
    url:'/active/log/fetchDailyActiveUserLogByPage',
    method: 'post',
    params:{
      'countTime': countTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}




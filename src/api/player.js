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

export function getRegisterDetailList(startTime,endTime) {
  return request({
    url: '/player/register/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

export function getRegisterDetail(startTime,endTime,pageNo,pageSize) {
  return request({
    url: '/player/register/rangedate/detail',
    method: 'post',
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

export function getActiveDetailList(startTime,endTime) {
  return request({
    url: '/player/active/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}


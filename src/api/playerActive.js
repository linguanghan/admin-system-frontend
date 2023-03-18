import request from '@/utils/request'


var urlPrefix = 'http://47.122.17.43:39001'
// var urlPrefix = 'http://localhost:39001'

export function getList(startTime,endTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/register/num/day',
    url: urlPrefix+'/player/register/num/day',
    method: 'get',
    params: {
      'startTime': startTime,
      'endTime' : endTime
    },
  })
}

export function getRegisterNum(dateTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/register/num',
    url: urlPrefix+'/player/register/num',
    method: 'get',
    params: {
      'dateTime': dateTime
    },
  })
}

export function getRegisterDetailList(startTime,endTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/register/rangedate/detail',
    url: urlPrefix+'/player/register/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

export function getActiveList(startTime,endTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/active/num/day',
    url: urlPrefix+'/player/active/num/day',
    method: 'get',
    params: {
      'startTime': startTime,
      'endTime' : endTime
    },
  })
}

export function getActiveNum(dateTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/active/num',
    url: urlPrefix+'/player/active/num',
    method: 'get',
    params: {
      'dateTime': dateTime
    },
  })
}

export function getActiveDetailList(startTime,endTime) {
  return request({
    // url: 'http://47.122.17.43:39001/player/active/rangedate/detail',
    url: urlPrefix+'/player/active/rangedate/detail',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}




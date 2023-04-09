import request from '@/utils/request'
// import urlPrefix from '@/api/env'

import { parseTime } from '@/utils/index'

export function getChannelList() {
  return request({
    url: urlPrefix + '/channel/list',
    method: 'get',
  })
}
export function getChannelListByDate(date) {
  const startTime = parseTime(date[0]);
  console.log('startTime',startTime)
  const endTime = parseTime(date[1]);
  console.log('endTime',endTime)

  return request({
    url: '/player/unit/channel/sort',
    method: 'get',
    params:{
      'startTime': startTime,
      'endTime': endTime,
    }
  })
}

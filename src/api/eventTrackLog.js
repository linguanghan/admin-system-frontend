import request from '@/utils/request'


export function searchPageEventTrackLogByPage(pageNo,pageSize) {
  return request({
    url: '/pageEventTrackLog/searchPageEventTrackLogByPage',
    method: 'get',
    params: {
      'pageNo' : pageNo,
      'pageSize' : pageSize,
    },
  })
}




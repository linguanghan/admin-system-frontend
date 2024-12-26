import request from '@/utils/request'


// export function getList(data) {
//   return request({
//     url: '/table/getList',
//     method: 'post',
//     data,
//   })
// }

export function getDailyList(pageNo, pageSize ) {
  return request({
    // url: 'http://47.122.17.43:39003/player/register/rangedate/detail',
    url: '/studyClass/page',
    method: 'get',
    params:{
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}

export function doAdd(data) {
  return request({
    url: '/studyClass/create',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/studyClass/update',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}

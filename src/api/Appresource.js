import request from '@/utils/request'

export function getAppDetailList(queryForm) {
  return request({
    url: '/app/resource/list',
    method: 'post',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      packageIdx: queryForm.packageIdx,
      appName: queryForm.appName,
    },
  })
}

export function getAppDetailListByName(appName) {
  return request({
    url: '/app/resource/list/appName',
    method: 'get',
    params: {
      appName: appName,
    },
  })
}
// 根据书本的Id查询
export function getAppDetailListById(packageIdx) {
  return request({
    url: '/app/resource/search',
    method: 'get',
    params: {
      packageIdx: packageIdx,
    },
  })
}

export function updateAppinfo(data) {
  return request({
    url: '/app/resource/update/info',
    method: 'post',
    data,
  })
}

export function deleteAppinfo(data) {
  return request({
    url: '/app/resource/del/info',
    method: 'post',
    data,
  })
}

export function saveAppinfo(data) {
  return request({
    url: '/app/resource/save/info',
    method: 'post',
    data,
  })
}
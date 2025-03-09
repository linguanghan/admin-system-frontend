import request from '@/utils/request'

export function getGeneralParamConfigList(pageNo, pageSize) {
  return request({
    url: '/api/general/page',
    method: 'get',
    params:{
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}

export function getGeneralParamConfigListByName(appName) {
  return request({
    url: '/app/resource/list/appName',
    method: 'get',
    params: {
      appName: appName,
    },
  })
}
// 根据书本的Id查询
export function getGeneralParamConfigListById(packageIdx) {
  return request({
    url: '/app/resource/search',
    method: 'get',
    params: {
      packageIdx: packageIdx,
    },
  })
}

export function updateGeneralParamConfig(data) {
  return request({
    url: '/api/general/update',
    method: 'post',
    data,
  })
}

export function deleteGeneralParamConfig(data) {
  return request({
    url: '/api/general/delete',
    method: 'post',
    data,
  })
}

export function saveGeneralParamConfig(data) {
  return request({
    url: '/api/general/create',
    method: 'post',
    data,
  })
}
import request from '@/utils/request'


var urlPrefix = 'http://47.122.17.43:39003'
// var urlPrefix = 'http://localhost:39003'

export function searchFuncBundleVersionLogByKeyWord(queryForm) {
  return request({
    url: urlPrefix + '/funcBundleVersionLog/searchFuncBundleVersionLogByKeyWord',
    method: 'post',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      keyWord: queryForm.keyword
    },
  })
}

export function updateFuncBundleVersionLog(data) {
  return request({
    url: urlPrefix + '/funcBundleVersionLog/updateFuncBundleVersionLog',
    method: 'post',
    data,
  })
}

export function deleteFuncBundleVersionLogById(data) {
  return request({
    url: urlPrefix + '/funcBundleVersionLog/deleteFuncBundleVersionLogById',
    method: 'post',
    params: {
      "id":data?.id
    },
  })
}

export function saveFuncBundleVersionLog(data) {
  return request({
    url: urlPrefix + '/funcBundleVersionLog/saveFuncBundleVersionLog',
    method: 'post',
    data,
  })
}

export function searchFuncBundleVersionLogByIdx(idx) {
  return request({
    url: urlPrefix + `/funcBundleVersionLog/searchFuncBundleVersionLogByIdx?idx=${idx}`,
    method: 'get',
  })
}
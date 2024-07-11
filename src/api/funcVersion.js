import request from '@/utils/request'


export function searchFuncBundleVersionLogByKeyWord(queryForm) {
  return request({
    url: '/funcBundleVersionLog/searchFuncBundleVersionLogByKeyWord',
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
    url: '/funcBundleVersionLog/updateFuncBundleVersionLog',
    method: 'post',
    data,
  })
}

export function deleteFuncBundleVersionLogById(data) {
  return request({
    url: '/funcBundleVersionLog/deleteFuncBundleVersionLogById',
    method: 'post',
    params: {
      "id":data?.id
    },
  })
}

export function saveFuncBundleVersionLog(data) {
  return request({
    url: '/funcBundleVersionLog/saveFuncBundleVersionLog',
    method: 'post',
    data,
  })
}

export function searchFuncBundleVersionLogByIdx(idx) {
  return request({
    url: `/funcBundleVersionLog/searchFuncBundleVersionLogByIdx?idx=${idx}`,
    method: 'get',
  })
}
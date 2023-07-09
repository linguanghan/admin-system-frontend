import request from '@/utils/request'
// var urlPrefix = 'http://47.122.17.43:39003'
var urlPrefix = 'http://localhost:39003'

export function getBookDetailList(queryForm) {
  return request({
    url: urlPrefix + '/book/resource/list',
    method: 'post',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      bookId: queryForm.bookId,
      bookName: queryForm.bookName,
    },
  })
}

export function getBookDetailListByName(bookId) {
  return request({
    url: urlPrefix + '/book/resource/list/bookId',
    method: 'get',
    params: {
      bookId: bookId,
    },
  })
}
// 根据书本的Id查询
export function getBookDetailListById(bookId) {
  return request({
    url: urlPrefix + '/book/resource/search',
    method: 'get',
    params: {
      bookId: bookId,
    },
  })
}

export function updateBookinfo(data) {
  return request({
    url: urlPrefix + '/book/resource/update/info',
    method: 'post',
    data,
  })
}

export function deleteBookinfo(data) {
  return request({
    url: urlPrefix + '/book/resource/del/info',
    method: 'post',
    data,
  })
}

export function saveBookinfo(data) {
  return request({
    url: urlPrefix + '/book/resource/save/info',
    method: 'post',
    data,
  })
}
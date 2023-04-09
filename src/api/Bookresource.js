import request from '@/utils/request'
var urlPrefix = 'http://47.122.17.43:39001'
// var urlPrefix = 'http://localhost:39001'

export function getBookDetailList(startTime, endTime) {
  return request({
    url: urlPrefix + '/book/resource/list',
    method: 'get',
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
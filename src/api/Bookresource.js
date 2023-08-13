import request from '@/utils/request'

export function getBookDetailList(queryForm) {
  return request({
    url: '/book/resource/list',
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
    url: '/book/resource/list/bookId',
    method: 'get',
    params: {
      bookId: bookId,
    },
  })
}
// 根据书本的Id查询
export function getBookDetailListById(bookId) {
  return request({
    url: '/book/resource/search',
    method: 'get',
    params: {
      bookId: bookId,
    },
  })
}

export function updateBookinfo(data) {
  return request({
    url: '/book/resource/update/info',
    method: 'post',
    data,
  })
}

export function deleteBookinfo(data) {
  return request({
    url: '/book/resource/del/info',
    method: 'post',
    data,
  })
}

export function saveBookinfo(data) {
  return request({
    url: '/book/resource/save/info',
    method: 'post',
    data,
  })
}
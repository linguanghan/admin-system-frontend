// 用于调用用户API接口的方法
import request from '@/utils/request'
// var urlPrefix = 'http://47.122.17.43:39001'
// var urlPrefix = 'http://localhost:39001'
// 返回所有用户评论的接口
export function getAllUserReviewList(queryForm) {
  console.log(queryForm)
  return request({
    url: '/feedback/selectAllPageQuery',
    method: 'get',
    params: {
      pageNum: queryForm.pageNum,
      pageSize: queryForm.pageSize,
    },
  })
}

// 用于调用用户API接口的方法
import request from '@/utils/request'
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

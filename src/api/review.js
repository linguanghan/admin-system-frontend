// 用于调用用户API接口的方法
import request from '@/utils/request'
import urlPrefix from '@/api/env'
// 返回所有用户评论的接口
export function getAllUserReviewList(queryForm) {
  return request({
    url: urlPrefix + '/feedback/selectAllPageQuery',
    method: 'get',
    params: {
      pageNum: queryForm.pageNo,
      pageSize: queryForm.pageSize,
    },
  })
}

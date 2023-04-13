// 用于调用用户API接口的方法
import request from '@/utils/request'
// 查询根据用户id查询购买的记录
export function getCustomerByUserId(queryForm) {
  return request({
    url: '/feedback/selectAllPageQuery',
    method: 'get',
    params: {
      pageNum: queryForm.pageNum,
      pageSize: queryForm.pageSize,
    },
  })
}
// 查询用户所有的购买记录
export function getAllBillInfo(queryForm) {
  return request({
    url: '/player/unit/billinfo',
    method: 'get',
    params: {
      pageNum: queryForm.pageNum,
      pageSize: queryForm.pageSize,
    },
  })
}
// 转移新用户书本信息
export function transferCustomerBookinfo(data) {
  console.log('postData',data)
  return request({
    url: '/player/unit/transfer/user',
    method: 'post',
    data,
  })
}
// 更新用户书本信息
export function updateCustomerBookinfo(data) {
  return request({
    url: 'player/unit/update/user',
    method: 'post',
    data,
  })
}
// 查询用户所有客户的编号
export function getAllCustomerIds() {
  return request({
    url: '/player/unit/selectDistinctPidList',
    method: 'get',
  })
}

import request from '@/utils/request'

export function queryChangeRechargeRecord(params) {
  return request({
    url: `/operateRecord/queryChangeRechargeRecord`,
    method: 'post',
    params:params
  })
}
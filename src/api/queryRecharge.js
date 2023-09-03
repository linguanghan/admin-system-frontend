import request from '@/utils/request'

export function getPlayerUnitOptionListByPid(pid) {
  return request({
    url: `/player/unit/getPlayerUnitOptionListByPid?pid=${pid}`,
    method: 'get'
  })
}

export function queryRechargeByPage(queryForm) {
  return request({
    url: '/player/unit/queryRechargeByPage',
    method: 'post',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      pid: queryForm.pid,
      orderId: queryForm.orderId,
    },
  })
}

// 账号转移
export function changeRecharge(form) {
  return request({
    url: '/player/unit/changeRecharge',
    method: 'post',
    params: {
      bookIdx: form.bookIdx,
      originPid: form.originPid,
      targetPid: form.targetPid
    },
  })
}


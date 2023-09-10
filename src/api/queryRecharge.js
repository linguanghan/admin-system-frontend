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
    params: queryForm,
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

/**
 * 加锁解锁
 * @param {*} form 
 * @returns 
 */
export function updateUnlockStatus(id, unlock) {
  return request({
    url: '/player/unit/updateUnlockStatus',
    method: 'post',
    params: {
      id: id,
      unlock: unlock
    },
  })
}


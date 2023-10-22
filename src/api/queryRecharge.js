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

export function queryBookResourceOptions(pid) {
  return request({
    url: '/player/unit/queryBookResourceOptions',
    method: 'get',
    params:{
      'pid': pid
    }
  })
  
}

export function addBookUnit(param) {
  return request({
    url: '/player/unit/addBookUnit',
    method: 'post',
    params:{
      'pid': param?.pid,
      'channel': param?.channel,
      'packageIdx': param?.packageIdx,
      'bookIdx': param?.bookIdx,
      'remainTime': param?.remainTime
    }
  })
  
}

export function updateBookUnitUpdateTimeOrLearnTime(param) {
  return request({
    url: '/player/unit/updateBookUnitUpdateTimeOrLearnTime',
    method: 'post',
    params:{
      'id': param?.id,
      'pid': param?.pid,
      'bookIdx': param?.bookIdx,
      'remainTime': param?.remainTime,
      'learnTime': param?.totalTime,
      'createTime':  param?.createTime,
      'bookType': param?.bookType,
      'packageIdx': param?.packageIdx
    }
  })
  
}






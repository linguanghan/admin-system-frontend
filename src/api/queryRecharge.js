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
export function updateUnlockStatus(id, unlock, pid) {
  return request({
    url: '/player/unit/updateUnlockStatus',
    method: 'post',
    params: {
      id: id,
      unlock: unlock,
      pid: pid
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
      'remainTime': param?.remainTime,
      'bookType': param?.bookType
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
      'packageIdx': param?.packageIdx,
      'learnTimeUnit1': param?.learnTimeUnit1,
      'learnTimeUnit2': param?.learnTimeUnit2,
      'learnTimeUnit3': param?.learnTimeUnit3,
      'learnTimeUnit4': param?.learnTimeUnit4,
      'learnTimeUnit5': param?.learnTimeUnit5,
      'learnTimeUnit6': param?.learnTimeUnit6,
      'learnTimeUnit7': param?.learnTimeUnit7,
      'learnTimeUnit8': param?.learnTimeUnit8,
      'learnTimeUnit9': param?.learnTimeUnit9,
      'learnTimeUnit10': param?.learnTimeUnit10,
      'learnTimeUnit11': param?.learnTimeUnit11,
      'learnTimeUnit12': param?.learnTimeUnit12,
      'learnTimeUnit13': param?.learnTimeUnit13,
      'learnTimeUnit14': param?.learnTimeUnit14,
      'learnTimeUnit15': param?.learnTimeUnit15,
      'learnTimeUnit16': param?.learnTimeUnit16,
      'learnTimeUnit17': param?.learnTimeUnit17,
      'learnTimeUnit18': param?.learnTimeUnit18,
      'learnTimeUnit19': param?.learnTimeUnit19,
      'learnTimeUnit20': param?.learnTimeUnit20
    }
  })
  
}






import request from '@/utils/request'

export function getPlayerDetailList(queryForm) {
  return request({
    url: '/player/management/list',
    method: 'post',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      agentPid: queryForm.agentPid,
      agentName: queryForm.agentName,
    },
  })
}

export function getPlayerDetailListByName(agentPid) {
  return request({
    url: '/player/management/list/name',
    method: 'get',
    params: {
      agentPid: agentPid,
    },
  })
}

export function getPlayerDetailListById(agentPid) {
  return request({
    url: '/player/management/search',
    method: 'get',
    params: {
      agentPid: agentPid,
    },
  })
}

export function updatePlayerInfo(data) {
  data = {
    ...data,
  }
  return request({
    url: '/player/management/update/info',
    method: 'post',
    data,
  })
}

export function deletePlayerInfo(data) {
  return request({
    url: '/player/management/del/info',
    method: 'post',
    data,
  })
}

export function savePlayerInfo(data) {
  return request({
    url: '/player/management/save/info',
    method: 'post',
    data,
  })
}


export function getPlayerInfoById(playerId) {
  return request({
    url: '/player/getPlayerInfoById?playerId=' + playerId,
    method: 'get'
  })
}

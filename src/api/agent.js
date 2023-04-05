import request from '@/utils/request'
import urlPrefix from '@/api/env'

export function getAgentList() {
  return request({
    url: urlPrefix + '/agentInfo/list',
    method: 'get',
  })
}
export function updateAgentInfoState(data) {
  return request({
    url: urlPrefix + '/agentInfo/update/state',
    method: 'get',
    params: {
      id: data.id,
      state: data.state,
    },
  })
}

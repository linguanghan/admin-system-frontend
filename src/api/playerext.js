import request from '@/utils/request'

export function queryPlayerExt(params) {
  return request({
    url: '/playerExt/queryPlayerExt',
    method: 'post',
    params: {
      ...params
    },
  })
}
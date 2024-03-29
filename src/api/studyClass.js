import request from '@/utils/request'

export function getStudyClassInfo(queryForm) {
  return request({
    url: '/studyClass/list',
    method: 'get',
    params: {
      pageNo: queryForm.pageNo,
      pageSize: queryForm.pageSize,
      agentPid: queryForm.agentPid,
      agentName: queryForm.agentName,
    },
  })
}

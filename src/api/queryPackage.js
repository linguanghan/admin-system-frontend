import request from '@/utils/request'

export function getPackageRechargeData(packageIdx, startTime, endTime, pageNo, pageSize) {
  return request({
    url: '/player/unit/queryPackage',
    method: 'get',
    params: {
      'packageIdx': packageIdx,
      'startTime': startTime,
      'endTime': endTime,
      'pageNo': pageNo,
      'pageSize': pageSize,
    },
  })
}

import request from '@/utils/request'


export function fetchDailyVipRechargeUserLogByPage(countTime,endTime,pageNo,pageSize) {
  return request({
    url:'/vipRecharge/log/fetchDailyVipRechargeUserLogByPage',
    method: 'post',
    params:{
      'countTime': countTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}




import request from '@/utils/request'


export function fetchDailyVipRechargeUserLogByPage(pageNo,pageSize) {
  return request({
    url:'/playerExt/getPictureBookDailyRecharges',
    method: 'post',
    params:{
      // 'countTime': countTime,
      'pageNo': pageNo,
      'pageSize': pageSize
    }
  })
}




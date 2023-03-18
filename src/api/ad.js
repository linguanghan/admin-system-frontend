import request from '@/utils/request'

export function getList(data) {
  return request({
    //url: '/ad/getList',
    url: 'https://851edf02-46eb-43e6-828d-64c7e483ea41.bspapp.com/http/getAd',
    method: 'get',
    data,
  })
}

export function getList2(data) {
  var content = {
    _id: '60fbdf329c77390001ea7806',
    title: '双12特惠，1299版本买1得4，799版本买1得2，点我购买',
    url: 'https://vue-admin-beautiful.com/authorization',
  }
  var datas = new Array(content)
  return datas
}

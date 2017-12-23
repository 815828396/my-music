import jsonp from './jsonp.js'

const publicData = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
  uin: 0,
  needNewCode: 1,
  platform: 'h5'
}
const options = {
  param: 'jsonpCallback'
}

export function getRank () { // 排行榜
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  return jsonp(url, publicData, options)
}

export function getHotSearch () { // 热门搜索
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  return jsonp(url, publicData, options)
}

export function getTopList (topId) { // 排行榜详情热歌
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, publicData, {
    g_tk: 5381,
    page: 'detal',
    type: 'top',
    tpl: 3,
    topid: topId
  })

  return jsonp(url, data, options)
}

export function getSearchMusic (query) { // 搜索歌词
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = {
    w: query,
    p: 1,
    n: 20
  }

  return jsonp(url, data, options)
}

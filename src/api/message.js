import axios from 'axios'
axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000
})
axios.defaults.withCredentials = true
// 获取留言信息（无分页）
export function getMessageList () {
  return axios({
    url: '/api/GetMessageList',
    method: 'get'
  })
}

// 获取留言信息（带分页）
export function getMessageListForPaging (params) {
  return axios({
    url: '/api/GetMessageListForPaging',
    method: 'post',
    data: params
  })
}

// 新增留言
export function addMessageInfo(params) {
  return axios({
    url: '/api/AddMessage',
    method: 'post',
    data: params
  })
}

// 删除留言
export function delMessageInfo(id) {
  return axios({
    url: '/api/DeleteMessage',
    method: 'post',
    data: {id: id}
  })
}
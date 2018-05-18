import axios from 'axios'
axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000
})

// 获取登录状态
export function getLoginStatus() {
  return axios({
    url: '/api/loginStatus',
    method: 'get'
  })
}

// 登录
export function userLogin(params) {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params
  })
}

// 登出
export function userLogout() {
  return axios({
    url: '/api/logout',
    method: 'get'
  })
}

// 注册用户
export function addUser(params) {
  return axios({
    url: '/api/AddUser',
    method: 'post',
    data: params
  })
}
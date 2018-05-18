import { cookie } from '@/common/service/common.service.js'
export const userInfo = (state) => Object.keys(state.userInfo).length ? state.userInfo : JSON.parse(cookie.get('userInfo'))
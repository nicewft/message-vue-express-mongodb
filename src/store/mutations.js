import * as types from './mutation_types'
export default {
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
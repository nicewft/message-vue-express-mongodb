import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  userInfo: {}
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
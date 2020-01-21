import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  state() {
    return {}
  },
  getters: {

  },
  actions: {
  },
  mutations: {
    ...vuexfireMutations
  },
})

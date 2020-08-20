import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import auth from './modules/auth'
import questions from './modules/questions'
import visas from './modules/visas'
import helpCentre from './modules/helpCentre'
import prCalc from './modules/prCalc'
import news from './modules/news.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    questions,
    visas,
    helpCentre,
    prCalc,
    news
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

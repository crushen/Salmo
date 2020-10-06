import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
import VCalendar from 'v-calendar'
import VueFormulate from '@braid/vue-formulate'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VCalendar)
Vue.use(VueFormulate)

Vue.mixin({
  methods: {
    makeOptions(array) {
      return Object.assign({}, ...array.map(key => ({[key]: key})))
    }
  }
})

let app
firebase.auth().onAuthStateChanged(async user => {
  if(user) {
    await store.dispatch('auth/storeAuthUser', user)
  }
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})

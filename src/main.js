import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// import Vuelidate from 'vuelidate'
// import VCalendar from 'v-calendar'
import VueFormulate from '@braid/vue-formulate'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

// Vue.use(Vuelidate)
// Vue.use(VCalendar)
Vue.use(VueFormulate)

Vue.mixin({
  methods: {
    makeOptions(array) {
      return Object.assign({}, ...array.map(key => ({[key]: key})))
    },
    date(date) {
      const newDate = date.split('-')
      return newDate.reverse().join('/')
    },
    jsDate(date) {
      const newDate = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()),
            formatted = newDate.split('/');
            
      return `${formatted[1]}/${formatted[0]}/${formatted[2]}`
    }
    // setOverlay() {
    //   const overlay = document.querySelector('#overlay')
    //   overlay.style.opacity = 1
    //   overlay.style.visibility = 'visible'

    //   document.querySelector('body').style.overflow = 'hidden'
    // },
    // removeOverlay() {
    //   const overlay = document.querySelector('#overlay')
    //   overlay.style.opacity = 0
    //   overlay.style.visibility = 'hidden'
      
    //   document.querySelector('body').style.overflow = 'auto'
    // }
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

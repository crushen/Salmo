import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import ProfilePage from '../views/Profile'
import Questionnaire from '../views/Questionnaire'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { onlyGuestUser: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { onlyGuestUser: true }
  },
  { 
    path: '/user', 
    name: 'ProfilePage', 
    component: ProfilePage,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/user/questionnaire', 
    name: 'Questionnaire', 
    component: Questionnaire,
    meta: { onlyAuthUser: true } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;
  if(to.meta.onlyAuthUser) {
    if(authenticatedUser) {
      next();
    } else {
      next({name: 'login'})
    }
  } else if(to.meta.onlyGuestUser) {
    if(authenticatedUser) {
      next({name: 'home'});
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router

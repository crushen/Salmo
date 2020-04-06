import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import Profile from '@/views/profile/Profile';
import UserInfo from '@/views/profile/UserInfo';
import UpdateProfile from '@/views/profile/UpdateProfile';
import Questionnaire from '@/views/Questionnaire';
import VisaInfo from '@/views/visa/VisaInfo';
import VisaPage from '@/views/visa/VisaPage';

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

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
    path: '/profile', 
    name: 'profile',
    component: Profile,
    meta: { onlyAuthUser: true },
    children: [
      { path: ':username', name: 'user-info', component: UserInfo },
      { path: ':username/update-profile', name: 'update-profile', component: UpdateProfile }
    ]
  },
  { 
    path: '/questionnaire', 
    name: 'questionnaire', 
    component: Questionnaire,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info', 
    name: 'visa-info', 
    component: VisaInfo,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info/:slug', 
    name: 'visa-page', 
    component: VisaPage,
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

export default router;

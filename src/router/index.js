import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import Profile from '@/views/profile/Profile';
import UpdateProfile from '@/views/profile/UpdateProfile';
import Questionnaire from '@/views/Questionnaire';
import VisaInfo from '@/views/visa/VisaInfo';
import NonEU from '@/views/visa/NonEU';
import Study from '@/views/visa/Study';
import Work from '@/views/visa/Work';
import Business from '@/views/visa/Business';
import Family from '@/views/visa/Family';
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
    path: '/profile/:username', 
    name: 'profile',
    component: Profile,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/profile/:username/update', 
    name: 'update-profile',
    component: UpdateProfile,
    meta: { onlyAuthUser: true }
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
    path: '/visa-info/non-eu', 
    name: 'non-eu', 
    component: NonEU,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info/non-eu/study', 
    name: 'non-eu-study', 
    component: Study,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info/non-eu/work', 
    name: 'non-eu-work', 
    component: Work,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info/non-eu/business', 
    name: 'non-eu-business', 
    component: Business,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/visa-info/non-eu/family', 
    name: 'non-eu-family', 
    component: Family,
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

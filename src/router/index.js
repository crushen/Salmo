import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  // Home, Sign up and Sign in pages
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/signIn/SignIn'),
    meta: { onlyGuestUser: true }
  },
  {
    path: '/login/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/signIn/ForgotPassword'),
    meta: { onlyGuestUser: true }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/signUp/SignUp'),
    meta: { onlyGuestUser: true }
  },
  {
    path: '/sign-up/terms-and-conditions',
    name: 'sign-up-terms',
    component: () => import('@/views/signUp/T&C'),
    meta: { onlyAuthUser: true }
  },
  {
    path: '/sign-up/verify-email',
    name: 'verify-email',
    component: () => import('@/views/signUp/VerifyEmail'),
    meta: { onlyAuthUser: true }
  },
  // Profile pages
  { 
    path: '/profile/:username', 
    name: 'profile',
    component: () => import('@/views/profile/Profile'),
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/settings', 
    name: 'settings',
    component: () => import('@/views/profile/Settings'),
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/settings/delete-account', 
    name: 'delete-account',
    component: () => import('@/views/profile/DeleteAccount'),
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/update', 
    name: 'update-profile',
    component: () => import('@/views/profile/UpdateProfile'),
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/visa-planner', 
    name: 'visa-planner',
    component: () => import('@/views/profile/VisaPlanner'),
    meta: { onlyVerifiedUser: true }
  },
  // Questionnaire pages
  { 
    path: '/profile/:username/questionnaire', 
    name: 'questionnaire', 
    component: () => import('@/views/Questionnaire'),
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/questionnaire/results', 
    name: 'results', 
    component: () => import('@/views/Results'),
    meta: { onlyVerifiedUser: true }
  },
  // Visa pages
  { 
    path: '/visa-info', 
    name: 'visa-info', 
    component: () => import('@/views/visa/VisaInfo')
  },
  { 
    path: '/visa-info/non-eu', 
    name: 'non-eu', 
    component: () => import('@/views/visa/NonEU')
  },
  { 
    path: '/visa-info/eu', 
    name: 'visa-info-eu', 
    component: () => import('@/views/visa/EU')
  },
  { 
    path: '/visa-info/non-eu/:category', 
    name: 'non-eu-category', 
    component: () => import('@/views/visa/CategoryPage')
  },
  { 
    path: '/visa-info/eu/settled', 
    name: 'eu-settled', 
    component: () => import('@/views/visa/Settled')
  },
  { 
    path: '/visa-info/eu/pre-settled', 
    name: 'eu-pre-settled', 
    component: () => import('@/views/visa/PreSettled')
  },
  { 
    path: '/visa-info/:slug', 
    name: 'visa-page', 
    component: () => import('@/views/visa/VisaPage'),
    children: [
      {
        path: ':section',
        name: 'visa-section',
        component: () => import('@/views/visa/VisaSection')
      }
    ]
  },
  // About and Help centre pages
  { 
    path: '/about', 
    name: 'about', 
    component: () => import('@/views/About')
  },
  { 
    path: '/about/help-centre', 
    name: 'help-centre', 
    component: () => import('@/views/HelpCentre')
  },
  { 
    path: '/about/help-centre/:slug', 
    name: 'help-centre-page', 
    component: () => import('@/views/HelpCentrePage')
  },
  { 
    path: '/about/privacy', 
    name: 'privacy', 
    component: () => import('@/views/Privacy')
  },
  { 
    path: '/about/terms-and-conditions', 
    name: 'terms', 
    component: () => import('@/views/Terms')
  },
  { path: '/page-not-found',
    name: 'not-found',
    component: () => import('@/views/NotFound')
  },  
  { 
    path: '*', 
    redirect: '/page-not-found' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {resolve({ x: 0, y: 0 })}, 400)
    })
  }
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser
  let verifiedUser

  if(authenticatedUser) {
    verifiedUser = firebase.auth().currentUser.emailVerified
  }

  // pages for signed up but not verified email address
  if(to.meta.onlyAuthUser) {
    if(authenticatedUser && verifiedUser) {
      next({ name: 'profile', params: { username: authenticatedUser.profile.username } })
    } else if(authenticatedUser && !verifiedUser) {
      next();
    } else {
      next({ name: 'sign-up' })
    }
    // pages for signed up and verified email address
  } else if(to.meta.onlyVerifiedUser) {
    if(authenticatedUser && verifiedUser) {
      next();
    } else if(authenticatedUser && !verifiedUser) {
      next({ name: 'sign-up-terms' })
    } else {
      next({ name: 'home' })
    }
    // pages only for not signed up
  } else if(to.meta.onlyGuestUser) {
    if(authenticatedUser && verifiedUser) {
      next({ name: 'profile', params: { username: authenticatedUser.profile.username } })
    } else if(authenticatedUser && !verifiedUser) {
      next({ name: 'sign-up-terms' })
    } else {
      next()
    }
    // all other pages
  } else {
    next()
  }
})

export default router

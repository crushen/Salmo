import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import ForgotPassword from '@/views/ForgotPassword';
import Profile from '@/views/profile/Profile';
import UpdateProfile from '@/views/profile/UpdateProfile';
import Settings from '@/views/profile/Settings';
import DeleteAccount from '@/views/profile/DeleteAccount';
import VisaPlanner from '@/views/profile/VisaPlanner';
import Questionnaire from '@/views/Questionnaire';
import Results from '@/views/Results';
import VisaInfo from '@/views/visa/VisaInfo';
import NonEU from '@/views/visa/NonEU';
import CategoryPage from '@/views/visa/CategoryPage';
import VisaPage from '@/views/visa/VisaPage';
import VisaSection from '@/views/visa/VisaSection';
import VisaInfoEU from '@/views/visa/EU';
import Settled from '@/views/visa/Settled';
import PreSettled from '@/views/visa/PreSettled';
import About from '@/views/About';
import HelpCentre from '@/views/HelpCentre';
import HelpCentrePage from '@/views/HelpCentrePage';
import NotFound from '@/views/NotFound';
import Privacy from '@/views/Privacy';
import Terms from '@/views/Terms';

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
    path: '/login/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: { onlyGuestUser: true }
  },
  { 
    path: '/profile/:username', 
    name: 'profile',
    component: Profile,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/profile/:username/settings', 
    name: 'settings',
    component: Settings,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/profile/:username/settings/delete-account', 
    name: 'delete-account',
    component: DeleteAccount,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/profile/:username/update', 
    name: 'update-profile',
    component: UpdateProfile,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/visa-planner', 
    name: 'visa-planner',
    component: VisaPlanner,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/questionnaire', 
    name: 'questionnaire', 
    component: Questionnaire,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/questionnaire/results', 
    name: 'results', 
    component: Results,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/visa-info', 
    name: 'visa-info', 
    component: VisaInfo
  },
  { 
    path: '/visa-info/non-eu', 
    name: 'non-eu', 
    component: NonEU
  },
  { 
    path: '/visa-info/eu', 
    name: 'visa-info-eu', 
    component: VisaInfoEU
  },
  { 
    path: '/visa-info/non-eu/:category', 
    name: 'non-eu-category', 
    component: CategoryPage
  },
  { 
    path: '/visa-info/eu/settled', 
    name: 'eu-settled', 
    component: Settled
  },
  { 
    path: '/visa-info/eu/pre-settled', 
    name: 'eu-pre-settled', 
    component: PreSettled
  },
  { 
    path: '/visa-info/:slug', 
    name: 'visa-page', 
    component: VisaPage,
    children: [
      {
        path: ':section',
        name: 'visa-section',
        component: VisaSection
      }
    ]
  },
  { 
    path: '/about', 
    name: 'about', 
    component: About
  },
  { 
    path: '/about/help-centre', 
    name: 'help-centre', 
    component: HelpCentre
  },
  { 
    path: '/about/help-centre/:slug', 
    name: 'help-centre-page', 
    component: HelpCentrePage
  },
  { 
    path: '/about/privacy', 
    name: 'privacy', 
    component: Privacy
  },
  { 
    path: '/about/terms-and-conditions', 
    name: 'terms', 
    component: Terms
  },
  { path: '/404',
    name: 'not-found',
    component: NotFound 
  },  
  { 
    path: '*', 
    redirect: '/404' 
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from) {
    // if(to.name === 'home' && from.name === 'login') {
    //   return { x: 0, y: document.body.scrollHeight }
    // } else {
    //   return { x: 0, y: 0 }
    // }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;
  let verifiedUser;
  if(authenticatedUser) {
    verifiedUser = firebase.auth().currentUser.emailVerified;
  }
  if(to.meta.onlyAuthUser) {
    if(authenticatedUser) {
      next();
    } else {
      next({name: 'login'});
    }
  } else if(to.meta.onlyVerifiedUser) {
    if(authenticatedUser && verifiedUser) {
      next();
    } else {
      next({name: 'profile', params: {username: authenticatedUser.profile.username}});
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

import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import SignIn from '@/views/SignIn';
import ForgotPassword from '@/views/ForgotPassword';
import SignUp from '@/views/signUp/SignUp';
import TandC from '@/views/signUp/T&C';
import VerifyEmail from '@/views/signUp/VerifyEmail';

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
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: { onlyGuestUser: true }
  },
  {
    path: '/login/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: { onlyGuestUser: true }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: { onlyGuestUser: true }
  },
  {
    path: '/sign-up/terms-and-conditions',
    name: 'sign-up-terms',
    component: TandC,
    meta: { onlyAuthUser: true }
  },
  {
    path: '/sign-up/verify-email',
    name: 'verify-email',
    component: VerifyEmail,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/profile/:username', 
    name: 'profile',
    component: Profile,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/settings', 
    name: 'settings',
    component: Settings,
    meta: { onlyVerifiedUser: true }
  },
  { 
    path: '/profile/:username/settings/delete-account', 
    name: 'delete-account',
    component: DeleteAccount,
    meta: { onlyVerifiedUser: true }
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 400)
    })
  }
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;

  let verifiedUser;
  if(authenticatedUser) {
    verifiedUser = firebase.auth().currentUser.emailVerified;
  }

  if(to.meta.onlyAuthUser) { // pages for signed up but not verified email address
    if(authenticatedUser && verifiedUser) {
      next({ name: 'profile', params: { username: authenticatedUser.profile.username } });
    } else if(authenticatedUser && !verifiedUser) {
      next();
    } else {
      next({ name: 'sign-up' })
    }
  } else if(to.meta.onlyVerifiedUser) { // pages for signed up and verified email address
    if(authenticatedUser && verifiedUser) {
      next();
    } else if(authenticatedUser && !verifiedUser) {
      next({ name: 'sign-up-terms' });
    } else {
      next({ name: 'home' })
    }
  } else if(to.meta.onlyGuestUser) { // pages only for not signed up
    if(authenticatedUser && verifiedUser) {
      next({ name: 'profile', params: { username: authenticatedUser.profile.username } });
    } else if(authenticatedUser && !verifiedUser) {
      next({ name: 'sign-up-terms' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;

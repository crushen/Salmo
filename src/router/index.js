import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
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
import VisaInfoEU from '@/views/visa/EU';
import EuOptions from '@/views/visa/EuOptions';
import About from '@/views/About';
import NotFound from '@/views/NotFound';

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
    path: '/profile/:username/update', 
    name: 'update-profile',
    component: UpdateProfile,
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
    path: '/profile/:username/visa-planner', 
    name: 'visa-planner',
    component: VisaPlanner,
    meta: { onlyAuthUser: true }
  },
  { 
    path: '/questionnaire', 
    name: 'questionnaire', 
    component: Questionnaire,
    meta: { onlyAuthUser: true } 
  },
  { 
    path: '/questionnaire/results', 
    name: 'results', 
    component: Results,
    meta: { onlyAuthUser: true } 
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
    path: '/visa-info/eu/options', 
    name: 'eu-options', 
    component: EuOptions
  },
  { 
    path: '/visa-info/:slug', 
    name: 'visa-page', 
    component: VisaPage
  },
  { 
    path: '/about', 
    name: 'about', 
    component: About
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
    return { x: 0, y: 0 }
  }
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

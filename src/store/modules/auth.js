import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    }
  },
  actions: {
    logIn(context, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => Promise.reject(error.message))
    },
    signUp(context, {email, password}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          return user
        }).catch(error => {
          const message = error.message;
          return Promise.reject(message);
        })
    },
    createUserProfile(context, {uid, userProfile}) {
      return db
        .collection('users')
        .doc(uid)
        .set(userProfile)
    },
    updateProfile({commit}, profile) {
      return db
        .collection('users')
        .doc(profile.user)
        .update(profile)
        .then(_ => {
          commit('setUserProfile', profile)
          return true
        })
    }
  },
  mutations: {
    setUserProfile(state, profile) {
      // state.user.profile = profile
      Vue.set(state.user, 'profile', profile)
    }
  }
}
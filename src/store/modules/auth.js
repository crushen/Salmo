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
    logOut({commit}) {
      return firebase.auth().signOut()
        .then(() => commit('setAuthUser', null))
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
    storeAuthUser({commit}, user) {
      return db
        .collection('profiles')
        .doc(user.uid)
        .get()
        .then(snapshot => {
          const profile = snapshot.data()
          user.profile = profile
          commit('setAuthUser', user)
          return profile
        })
    },
    updateProfile({commit}, profile) {
      return db
        .collection('users')
        .doc(profile.user)
        .update(profile)
        .then(() => {
          commit('setUserProfile', profile)
          return true
        })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    setUserProfile(state, profile) {
      // state.user.profile = profile
      Vue.set(state.user, 'profile', profile)
    }
  }
}
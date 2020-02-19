// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import { db } from '@/db'

const questions = [
  // CHILD QUESTIONS
  {
    isChild: true,
    question: 'Will you be over 18 at the time of application?',
    answers: ['Yes', 'No']
  },
  {
    isChild: true,
    question: 'Why do you want to live in the UK?',
    answers: [
      {
        text: 'Study',
        value: 'T4 Child Student Visa'
      },
      {
        text: 'Family',
        value: 'Family'
      }
    ]
  },
  {
    isChild: true,
    isFamily: true,
    question: 'Do your parents / guardian have IDL or PR?',
    answers: [
      {
        text: 'Yes',
        value: 'Dependent Visa'
      },
      {
        text: 'No',
        value: 'Family Visa'
      }
    ]
  },
  // ADULT QUESTIONS
  {
    isAdult: true,
    question: 'Why do you want to live in the UK?',
    answers: ['Study', 'Work', 'Business', 'Family']
  },
  {
    isAdult: true,
    isWork: true,
    question: 'How long do you plan to stay in the UK?',
    answers: ['Yes', 'No']
  },
]

export default {
  namespaced: true,
  state: {
    items: [],
    result: {
      user: '',
      recommendedVisa: ''
    }
  },
  getters: {

  },
  actions: {
    getQuestions({commit}) {
      commit('setQuestions', questions);
    },
    getResults(context, result) {
      // First set state results
      context.commit('setResults', result);
      // Then use filtered results for questionnaireResults collection, and add reference to the user
      // (There is a firebase function set up to add questionnaireResults ID to user profile)
      context.state.result.user = db.collection('profiles').doc(context.rootState.auth.user.uid);
      return db.collection('questionnaireResults')
        .add(context.state.result)
        // Add filtered questionnaireResults and ID to local user profile
        .then(docRef => {
          context.state.result.id = docRef.id;
          context.commit('auth/addResultsToUser', context.state.result, {root: true})
          return true
        })
    }
  },
  mutations: {
    setQuestions(state, questions) {
      state.items = questions;
    },
    setResults(state, result) {
      state.result.recommendedVisa = result.recommendedVisa;
    }
  }
}

// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import { db } from '@/db'

const questions = [
  {
    question: 'What kind of bebe do you relate to?',
    answers: [
      {
        text: 'Cat', 
        value: 'Cat'
      }, 
      { 
        text: 'Dog', 
        value: 'Dog'
      }
    ]
  },
  {
    isCat: true,
    question: 'What colour is de most bootiful?',
    answers: [
        {
        text: 'Calico', 
        value: 'Zora' 
      }, 
      { 
        text: 'Ginger', 
        value: 'Rito'
      }
    ]
  },
  {
    isCat: true,
    question: 'Are you a fatty?',
    answers: [
      {
        text: 'No way, I have bird bones', 
        value: 'Rito' 
      }, 
      { 
        text: 'I am a little chunk', 
        value: 'Zora'
      }
    ]
  },
  {
    isCat: true,
    question: 'What is favourite snack?',
    answers: [
      {
        text: 'Burrito', 
        value: 'Rito' 
      }, 
      { 
        text: 'Pakora', 
        value: 'Zora'
      }
    ]
  },
  {
    isDog: true,
    question: 'What colour is de most bootiful?',
    answers: [
      {
        text: 'Ginger', 
        value: 'Squirrel' 
      }, 
      { 
        text: 'Black', 
        value: 'Baldrick'
      }, 
      { 
        text: 'Black with grey highlights', 
        value: 'Minnie'
      }
    ]
  },
  {
    isDog: true,
    question: 'What is the best way to eat din dins?',
    answers: [
      {
        text: 'Wait for hoomans to give me chiquen', 
        value: 'Minnie' 
      }, 
      { 
        text: 'Swallow without even chewing', 
        value: 'Baldrick'
      }, 
      { 
        text: 'Fight a bitch for their food', 
        value: 'Squirrel'
      }
    ]
  },
  {
    isDog: true,
    question: 'What to do if you see a cat?',
    answers: [
      {
        text: 'Run and hide', 
        value: 'Baldrick' 
      }, 
      { 
        text: 'Yap like never before', 
        value: 'Minnie'
      }, 
      { 
        text: 'Kill', 
        value: 'Squirrel'
      }
    ]
  }
]

export default {
  namespaced: true,
  state: {
    items: [],
    results: {
      zora: 0,
      rito: 0,
      minnie: 0,
      squirrel: 0,
      baldrick: 0
    }
  },
  getters: {

  },
  actions: {
    getQuestions({commit}) {
      commit('setQuestions', questions);
    }
  },
  mutations: {
    setQuestions(state, questions) {
      state.items = questions;
    },
    setResults(state, answers) {
      state.results.zora = answers.zora;
      state.results.rito = answers.rito;
      state.results.minnie = answers.minnie;
      state.results.squirrel = answers.squirrel;
      state.results.baldrick = answers.baldrick;
    }
  }
}

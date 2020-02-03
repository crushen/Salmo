// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
 import { db } from '@/db'

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
    results: [
      {
        name: 'Zora',
        score: 0
      },        
      {
        name: 'Rito',
        score: 0
      },        
      {
        name: 'Minnie',
        score: 0
      },        
      {
        name: 'Squirrel',
        score: 0
      },        
      {
        name: 'Baldrick',
        score: 0
      }
    ]
  },
  getters: {

  },
  actions: {
    getQuestions({commit}) {
      commit('setQuestions', questions);
    },
    setUserProfileResults(context, {user, results}) {
      return db
      .collection('profiles')
      .doc(user.uid)
      .set(results)
      // TODO: This works, but rewrites name data and goes a bit fucky.. needs work
    }
  },
  mutations: {
    setQuestions(state, questions) {
      state.items = questions;
    },
    setResults(state, answers) {
      // TODO: Add results to user profile in Firebase
      state.results.forEach(result => {
        answers.forEach(answer => {
          if(result.name === answer.name) {
            result.score = answer.score;
          }
        });
      });
    }
  }
}

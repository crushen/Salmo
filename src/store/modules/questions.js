// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import { db } from '@/db'

const questions = [
  // CHILD QUESTIONS
  {
    isChild: true,
    question: 'Will you be over 18 at the time of application?',
    answers: [
      {
        text: 'Yes',
        value: 'Adult Application'
      },
      {
        text: 'No',
        value: 'Child Application'
      }
    ]
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
    answers: [
      {
        text: 'Work',
        value: 'Work'
      },
      {
        text: 'Business',
        value: 'Business'
      },      
      {
        text: 'Family',
        value: 'Family'
      },
      {
        text: 'Study',
        value: 'Study'
      },
    ]
  },
  // WORK
  {
    isAdult: true,
    isWork: true,
    question: 'How long do you plan to stay in the UK?',
    answers: [
      {
        text: '2 years and over',
        value: '2+'
      },
      {
        text: 'Under 2 years',
        value: '2-'
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    under2: true,
    question: 'Which one of these best describes your work?',
    answers: [
      {
        text: 'Charity',
        value: 'Charity Worker Visa'
      },
      {
        text: 'GOV Exchange',
        value: 'GOV Authorised Exchange Visa'
      },
      {
        text: 'Sport / Creative',
        value: 'Creative and Sporting Visa'
      },
      {
        text: 'Religious',
        value: 'Religious Worker Visa'
      },
      {
        text: 'Seasonal',
        value: 'Seasonal Worker Visa'
      },
      {
        text: 'Not Sure',
        value: [
          'Tier 2 General Work',
          'Charity Worker Visa', 
          'GOV Authorised Exchange Visa', 
          'Creative and Sporting Visa',
          'Religious Worker Visa',
          'Seasonal Worker Visa'
        ] // need to figure out what to do with array answers
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    over2: true,
    question: 'Are you a sportsperson / minister of religion?',
    answers: [
      {
        text: 'Sportsperson',
        value: 'T2 Sportsperson Visa'
      },
      {
        text: 'Minister of Religion',
        value: 'T2 Minister of Religion Visa'
      },
      {
        text: 'No',
        value: 'Non S or R'
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    over2: true,
    nonSR: true,
    question: 'Are you being transferred by your current employer to UK?',
    answers: [
      {
        text: 'Yes',
        value: 'isTransferred'
      },
      {
        text: 'No',
        value: 'T2 General Work Visa'
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    over2: true,
    nonSR: true,
    isTransferred: true,
    question: 'Are you a recent graduate?',
    answers: [
      {
        text: 'Yes',
        value: 'Intra company Graduate / Trainee Visa'
      },
      {
        text: 'No',
        value: 'Intra company Visa'
      }
    ]
  }
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

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
        value: 'isFamily'
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
        value: 'isWork'
      },
      {
        text: 'Business',
        value: 'isBusiness'
      },      
      {
        text: 'Family',
        value: 'isFamily'
      },
      {
        text: 'Study',
        value: 'isStudy'
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
        text: 'Under 2 years',
        value: 'underTwoYears'
      },
      {
        text: '2 years and over',
        value: 'overTwoYears'
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    underTwoYears: true,
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
    overTwoYears: true,
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
        value: 'nonSR'
      }
    ]
  },
  {
    isAdult: true,
    isWork: true,
    overTwoYears: true,
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
    overTwoYears: true,
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
  },
  // BUSINESS
  {
    isAdult: true,
    isBusiness: true,
    question: 'Which one of these best describes your future business plans?',
    answers: [
      {
        text: 'Start a Business',
        value: 'Start Up Visa' // Default, but this needs to change depending on current visa
      },
      {
        text: 'Invest in Business',
        value: 'isInvestor'
      },
      {
        text: 'Endorsed as exceptional talent/ top of field',
        value: 'Exceptional Talent Visa'
      }
    ]
  },
  {
    isAdult: true,
    isBusiness: true,
    isInvestor: true,
    question: 'How much money can you invest?',
    answers: [
      {
        text: '2 million +',
        value: 'Investor Visa - 5 years for PR'
      },
      {
        text: '5 million +',
        value: 'Investor Visa - 3 years for PR'
      },
      {
        text: '10 million +',
        value: 'Investor Visa - 2 years for PR'
      }
    ]
  },
  // FAMILY
  {
    isAdult: true,
    isFamily: true,
    question: 'How long do you wish to live in the UK for?',
    answers: [
      {
        text: 'Up to 6 months',
        value: 'upToSixMonths' 
      },
      {
        text: 'Over 6 months',
        value: 'overSixMonths'
      }
    ]
  },
  {
    isAdult: true,
    isFamily: true,
    upToSixMonths: true,
    question: 'Which of the following best describes your situation?',
    answers: [
      {
        text: 'Getting Married but not living in the UK',
        value: 'Marriage Visa' 
      },
      {
        text: 'Coming to visit partner / family',
        value: 'Standard visitor Visa'
      },
      {
        text: 'Visiting your child who is studying',
        value: 'Parent of T4 Visa'
      }
    ]
  },
  {
    isAdult: true,
    isFamily: true,
    overSixMonths: true,
    question: 'Do you have a partner/family member that is British or ILR / PR ?',
    answers: [
      {
        text: 'Yes',
        value: 'Marriage Visa' 
      },
      {
        text: 'No',
        value: "You can't have a family visa." // Need to figure this out
      },
      {
        text: "It's complicated",
        value: 'As your situation is complex, does any of the following apply to you?' // Need to figure this out
      }
    ]
  },
  // STUDY
  {
    isAdult: true,
    isStudy: true,
    question: 'How long is your course?',
    answers: [
      {
        text: 'Up to 6 months',
        value: 'T4 Short Term Visa' 
      },
      {
        text: 'Over 6 months',
        value: 'T4 General Student Visa'
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

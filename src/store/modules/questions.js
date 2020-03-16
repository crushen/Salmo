// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import { db } from '@/db'
var _ = require('lodash');

const questions0 = [
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
        value: 'Tier 4 Child Student Visa'
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
        value: 'Tier 5 Charity Worker Visa'
      },
      {
        text: 'GOV Exchange',
        value: 'Tier 5 GOV Authorised Exchange Visa'
      },
      {
        text: 'Sport / Creative',
        value: 'Tier 5 Creative and Sporting Visa'
      },
      {
        text: 'Religious',
        value: 'Tier 5 Religious Worker Visa'
      },
      {
        text: 'Seasonal',
        value: 'Tier 5 Seasonal Worker Visa'
      },
      {
        text: 'Not Sure',
        value: [
          'Tier 2 General Work Visa',
          'Tier 5 Charity Worker Visa', 
          'Tier 5 GOV Authorised Exchange Visa', 
          'Tier 5 Creative and Sporting Visa',
          'Tier 5 Religious Worker Visa',
          'Tier 5 Seasonal Worker Visa'
        ] 
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
        value: 'Tier 2 Sportsperson Visa'
      },
      {
        text: 'Minister of Religion',
        value: 'Tier 2 Minister of Religion Visa'
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
        value: 'Tier 2 General Work Visa'
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
        value: 'Tier 2 Intra-company Transfer Graduate Trainee Visa'
      },
      {
        text: 'No',
        value: 'Tier 2 Intra-company Transfer Long-term Staff Visa'
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
        text: 'Start a Business', // Startup is complex - needs work
        value: 'isStartup'
      },
      {
        text: 'Invest in Business',
        value: 'isInvestor'
      },
      {
        text: 'Endorsed as exceptional talent/ top of field',
        value: 'Tier 1 Exceptional Talent Visa'
      }
    ]
  },
  {
    isAdult: true,
    isBusiness: true,
    isStartup: true,
    question: 'Did you switch from Graduate Entrepreneur Visa in the second year?',
    answers: [
      {
        text: 'Yes',
        value: 'Innovator Visa - Can switch to Entrepreneur Visa for limited time'
      },
      {
        text: 'No',
        value: "Innovator Visa - Can't switch to Entrepreneur Visa"
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
        value: 'Tier 1 Investor Visa - 5 years for PR'
      },
      {
        text: '5 million +',
        value: 'Tier 1 Investor Visa - 3 years for PR'
      },
      {
        text: '10 million +',
        value: 'Tier 1 Investor Visa - 2 years for PR'
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
        value: 'Standard Visitor Visa'
      },
      {
        text: 'Visiting your child who is studying',
        value: 'Parent of Tier 4 Child Visa'
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
        value: 'familyIsILRorPR' 
      },
      {
        text: 'No',
        value: "None - You can't apply for a Family Visa"
      },
      {
        text: "It's complicated",
        value: 'Family Visa - Apply on the basis of your private life' // This will also need to list details and ask if they apply
      }
    ]
  },
  {
    isAdult: true,
    isFamily: true,
    overSixMonths: true,
    familyIsILRorPR: true,
    question: 'Which of the following best describes your situation?',
    answers: [
      {
        text: 'Coming as an adult to be cared for by a relative.',
        value: 'Family Visa - Coming as an adult to be cared for by a relative route' 
      },
      {
        text: 'Coming as a parent to join your child.',
        value: 'Family Visa - Coming as a parent to join your child route'
      },
      {
        text: "Coming to join your partner/ spouse.",
        value: 'Family Visa - Coming to join your partner/spouse route'
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
        value: 'Tier 4 Short Term Study Visa' 
      },
      {
        text: 'Over 6 months',
        value: 'Tier 4 General Student Visa'
      }
    ]
  }
]

const questions = [
  // GENERAL STUDENT
  {
    visa: 'Tier 4 General Student Visa',
    questions: [
      {
        question: 'Which best describes why you would like to remain in the UK?',
        number: 0,
        answers: [
          {
            text: 'Here for family. This applies to you if you wish to stay with a partner or family after your studies.',
            value: 'Family Visa (needs expanding)'
          },
          {
            text: 'Here for business. This applies to you if you will be starting a business or investing after your studies.',
            value: 1
          },
          {
            text: 'Here for work. This applies to you if you will be employed by someone else after your studies.',
            value: 2
          }
        ]
      },
      {
        question: 'Would you like to invest in a UK based business or start your own?',
        number: 1,
        answers: [
          {
            text: 'Invest',
            value: 'Tier 1 Investor Visa'
          },
          {
            text: 'Start my own',
            value: 'Startup Visa'
          }
        ]
      },
      {
        question: 'Does your work involve Sports or Religion',
        number: 2,
        answers: [
          {
            text: 'Sports',
            value: 'Tier 2 Sportsperson Visa'
          },
          {
            text: 'Religion',
            value: 'Tier 2 Minister of Religion Visa'
          },
          {
            text: 'Neither',
            value: 3
          }
        ]
      },
      {
        question: 'Is your job a part of an approved government authorised exchange scheme?',
        number: 3,
        answers: [
          {
            text: 'Yes',
            value: 'T5 Temporary Worker - Government Authorised Exchange Visa'
          },
          {
            text: 'No',
            value: 'Tier 2 General Work Visa'
          },
          {
            text: 'Not sure',
            value: 'Take customer to page describing the scheme'
          }
        ]
      }
    ]
  },
  // CHILD STUDENT
  {
    visa: 'Tier 4 Child Student Visa',
    questions: [
      {
        question: 'Which best describes why you would like to remain in the UK?',
        number: 0,
        answers: [
          {
            text: 'Here for family. This applies to you if you wish to stay with a partner or family after your studies.',
            value: 'Family Visa (needs expanding)'
          },
          {
            text: 'Here for study. This applies to you if you will be going from GCSE to higher education or university.',
            value: 'Tier 4 General Student Visa'
          },
          {
            text: 'Here for work. This applies to you if you will be employed by someone else after your studies.',
            value: 1
          }
        ]
      },
      {
        question: 'Does your work involve Sports or Religion',
        number: 1,
        answers: [
          {
            text: 'Sports',
            value: 'Tier 2 Sportsperson Visa'
          },
          {
            text: 'Religion',
            value: 'Tier 2 Minister of Religion Visa'
          },
          {
            text: 'Neither',
            value: 2
          }
        ]
      },
      {
        question: 'Is your job a part of an approved government authorised exchange scheme?',
        number: 2,
        answers: [
          {
            text: 'Yes',
            value: 'T5 Temporary Worker - Government Authorised Exchange Visa'
          },
          {
            text: 'No',
            value: 'Tier 2 General Work Visa'
          },
          {
            text: 'Not sure',
            value: 'Take customer to page describing the scheme'
          }
        ]
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
      recommendedVisa: '',
      messages: {},
      youthMobility: false
    }
  },
  actions: {
    getQuestions(context) {
      const userCurrentVisa = context.rootState.auth.user.profile.currentVisa;
      context.commit('setQuestions', userCurrentVisa);
    },
    getResults(context, result) {
      context.commit('setResults', result);
    },
    sendDbResults(context, {messages, youthMobility}) {
      context.commit('setMessages', messages);
      context.commit('setYouthMobility', youthMobility);
      context.state.result.user = db.collection('profiles').doc(context.rootState.auth.user.uid);
      // If messages is empty object, don't send it to database
      const result = context.state.result;
      if(_.isEmpty(result.messages)) {
        delete result.messages;
      }
      // Add results to database
      return db.collection('questionnaireResults')
        .add(result)
        // Add results to local user profile
        .then(docRef => {
          result.id = docRef.id;
          context.commit('auth/addResultsToUser', result, {root: true})
          return true
        })
    },
  },
  mutations: {
    setQuestions(state, userCurrentVisa) {
      questions.forEach(set => {
        if(set.visa === userCurrentVisa) {
          state.items = set.questions;
        }
      })
    },
    setResults(state, result) {
      state.result.recommendedVisa = result.recommendedVisa;
      if(Array.isArray(result)) {
        state.result.recommendedVisa = [];
        state.result.recommendedVisa = result.recommendedVisa;
      }
    },
    setMessages(state, messages) {
      state.result.messages = {};
      for(const prop in messages) {
        if(messages[prop] !== null)
        state.result.messages[prop] = messages[prop];
      }
    },
    setYouthMobility(state, youthMobility) {
      state.result.youthMobility = youthMobility;
    }
  }
}

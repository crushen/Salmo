import { db } from '@/db'
var _ = require('lodash');
import firebase from 'firebase/app';
import 'firebase/firestore';

// const questions0 = [
//   // CHILD QUESTIONS
//   {
//     isChild: true,
//     question: 'Will you be over 18 at the time of application?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'Adult Application'
//       },
//       {
//         text: 'No',
//         value: 'Child Application'
//       }
//     ]
//   },
//   {
//     isChild: true,
//     question: 'Why do you want to live in the UK?',
//     answers: [
//       {
//         text: 'Study',
//         value: 'Tier 4 Child Student Visa'
//       },
//       {
//         text: 'Family',
//         value: 'isFamily'
//       }
//     ]
//   },
//   {
//     isChild: true,
//     isFamily: true,
//     question: 'Do your parents / guardian have IDL or PR?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'Dependent Visa'
//       },
//       {
//         text: 'No',
//         value: 'Family Visa'
//       }
//     ]
//   },
//   // ADULT QUESTIONS
//   {
//     isAdult: true,
//     question: 'Why do you want to live in the UK?',
//     answers: [
//       {
//         text: 'Work',
//         value: 'isWork'
//       },
//       {
//         text: 'Business',
//         value: 'isBusiness'
//       },      
//       {
//         text: 'Family',
//         value: 'isFamily'
//       },
//       {
//         text: 'Study',
//         value: 'isStudy'
//       },
//     ]
//   },
//   // WORK
//   {
//     isAdult: true,
//     isWork: true,
//     question: 'How long do you plan to stay in the UK?',
//     answers: [
//       {
//         text: 'Under 2 years',
//         value: 'underTwoYears'
//       },
//       {
//         text: '2 years and over',
//         value: 'overTwoYears'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isWork: true,
//     underTwoYears: true,
//     question: 'Which one of these best describes your work?',
//     answers: [
//       {
//         text: 'Charity',
//         value: 'Tier 5 Charity Worker Visa'
//       },
//       {
//         text: 'GOV Exchange',
//         value: 'Tier 5 GOV Authorised Exchange Visa'
//       },
//       {
//         text: 'Sport / Creative',
//         value: 'Tier 5 Creative and Sporting Visa'
//       },
//       {
//         text: 'Religious',
//         value: 'Tier 5 Religious Worker Visa'
//       },
//       {
//         text: 'Seasonal',
//         value: 'Tier 5 Seasonal Worker Visa'
//       },
//       {
//         text: 'Not Sure',
//         value: [
//           'Tier 2 General Work Visa',
//           'Tier 5 Charity Worker Visa', 
//           'Tier 5 GOV Authorised Exchange Visa', 
//           'Tier 5 Creative and Sporting Visa',
//           'Tier 5 Religious Worker Visa',
//           'Tier 5 Seasonal Worker Visa'
//         ] 
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isWork: true,
//     overTwoYears: true,
//     question: 'Are you a sportsperson / minister of religion?',
//     answers: [
//       {
//         text: 'Sportsperson',
//         value: 'Tier 2 Sportsperson Visa'
//       },
//       {
//         text: 'Minister of Religion',
//         value: 'Tier 2 Minister of Religion Visa'
//       },
//       {
//         text: 'No',
//         value: 'nonSR'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isWork: true,
//     overTwoYears: true,
//     nonSR: true,
//     question: 'Are you being transferred by your current employer to UK?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'isTransferred'
//       },
//       {
//         text: 'No',
//         value: 'Tier 2 General Work Visa'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isWork: true,
//     overTwoYears: true,
//     nonSR: true,
//     isTransferred: true,
//     question: 'Are you a recent graduate?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'Tier 2 Intra-company Transfer Graduate Trainee Visa'
//       },
//       {
//         text: 'No',
//         value: 'Tier 2 Intra-company Transfer Long-term Staff Visa'
//       }
//     ]
//   },
//   // BUSINESS
//   {
//     isAdult: true,
//     isBusiness: true,
//     question: 'Which one of these best describes your future business plans?',
//     answers: [
//       {
//         text: 'Start a Business', // Startup is complex - needs work
//         value: 'isStartup'
//       },
//       {
//         text: 'Invest in Business',
//         value: 'isInvestor'
//       },
//       {
//         text: 'Endorsed as exceptional talent/ top of field',
//         value: 'Tier 1 Exceptional Talent Visa'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isBusiness: true,
//     isStartup: true,
//     question: 'Did you switch from Graduate Entrepreneur Visa in the second year?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'Innovator Visa - Can switch to Entrepreneur Visa for limited time'
//       },
//       {
//         text: 'No',
//         value: "Innovator Visa - Can't switch to Entrepreneur Visa"
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isBusiness: true,
//     isInvestor: true,
//     question: 'How much money can you invest?',
//     answers: [
//       {
//         text: '2 million +',
//         value: 'Tier 1 Investor Visa - 5 years for PR'
//       },
//       {
//         text: '5 million +',
//         value: 'Tier 1 Investor Visa - 3 years for PR'
//       },
//       {
//         text: '10 million +',
//         value: 'Tier 1 Investor Visa - 2 years for PR'
//       }
//     ]
//   },
//   // FAMILY
//   {
//     isAdult: true,
//     isFamily: true,
//     question: 'How long do you wish to live in the UK for?',
//     answers: [
//       {
//         text: 'Up to 6 months',
//         value: 'upToSixMonths' 
//       },
//       {
//         text: 'Over 6 months',
//         value: 'overSixMonths'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isFamily: true,
//     upToSixMonths: true,
//     question: 'Which of the following best describes your situation?',
//     answers: [
//       {
//         text: 'Getting Married but not living in the UK',
//         value: 'Marriage Visa' 
//       },
//       {
//         text: 'Coming to visit partner / family',
//         value: 'Standard Visitor Visa'
//       },
//       {
//         text: 'Visiting your child who is studying',
//         value: 'Parent of Tier 4 Child Visa'
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isFamily: true,
//     overSixMonths: true,
//     question: 'Do you have a partner/family member that is British or ILR / PR ?',
//     answers: [
//       {
//         text: 'Yes',
//         value: 'familyIsILRorPR' 
//       },
//       {
//         text: 'No',
//         value: "None - You can't apply for a Family Visa"
//       },
//       {
//         text: "It's complicated",
//         value: 'Family Visa - Apply on the basis of your private life' // This will also need to list details and ask if they apply
//       }
//     ]
//   },
//   {
//     isAdult: true,
//     isFamily: true,
//     overSixMonths: true,
//     familyIsILRorPR: true,
//     question: 'Which of the following best describes your situation?',
//     answers: [
//       {
//         text: 'Coming as an adult to be cared for by a relative.',
//         value: 'Family Visa - Coming as an adult to be cared for by a relative route' 
//       },
//       {
//         text: 'Coming as a parent to join your child.',
//         value: 'Family Visa - Coming as a parent to join your child route'
//       },
//       {
//         text: "Coming to join your partner/ spouse.",
//         value: 'Family Visa - Coming to join your partner/spouse route'
//       }
//     ]
//   },
//   // STUDY
//   {
//     isAdult: true,
//     isStudy: true,
//     question: 'How long is your course?',
//     answers: [
//       {
//         text: 'Up to 6 months',
//         value: 'Tier 4 Short Term Study Visa' 
//       },
//       {
//         text: 'Over 6 months',
//         value: 'Tier 4 General Student Visa'
//       }
//     ]
//   }
// ]

const questions = [
  // GENERAL STUDENT
  {
    visa: 'Tier 4 General Student',
    questions: [
      {
        question: 'Which best describes why you would like to remain in the UK?',
        number: 0,
        answers: [
          {
            text: 'Study',
            value: 'Tier 4 General Student'
          },
          {
            text: 'Work',
            value: 2
          },
          {
            text: 'Business',
            value: 1
          },
          {
            text: 'Family',
            value: 'Family (needs expanding)'
          }
        ]
      },
      {
        question: 'Would you like to invest in a UK based business or start your own?',
        number: 1,
        answers: [
          {
            text: 'Invest',
            value: 'Tier 1 Investor'
          },
          {
            text: 'Start my own',
            value: 'Startup'
          }
        ]
      },
      {
        question: 'Does your work involve Sports or Religion',
        number: 2,
        answers: [
          {
            text: 'Sports',
            value: 'Tier 2 Sportsperson'
          },
          {
            text: 'Religion',
            value: 'Tier 2 Minister of Religion'
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
            value: 'Tier 5 Government Authorised Exchange'
          },
          {
            text: 'No',
            value: 'Tier 2 General Work'
          }
          // {
          //   text: 'Not sure',
          //   value: 'Take customer to page describing the scheme'
          // }
        ]
      }
    ]
  },
  // CHILD STUDENT
  {
    visa: 'Tier 4 Child Student',
    questions: [
      {
        question: 'Which best describes why you would like to remain in the UK?',
        number: 0,
        answers: [
          {
            text: 'Family',
            value: 'Family (needs expanding)'
          },
          {
            text: 'Study',
            value: 'Tier 4 General Student'
          },
          {
            text: 'Work',
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
            value: 'Tier 2 Sportsperson'
          },
          {
            text: 'Religion',
            value: 'Tier 2 Minister of Religion'
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
            value: 'Tier 5 Government Authorised Exchange'
          },
          {
            text: 'No',
            value: 'Tier 2 General Work'
          }
          // {
          //   text: 'Not sure',
          //   value: 'Take customer to page describing the scheme'
          // }
        ]
      }
    ]
  }
  // NON-SPECIFIC QUESTIONS
  // {
  //   visa: [
  //     'None', 
  //     'Tier 4 Short Term Study Visa',
  //     'Tier 5 GOV Authorised Exchange Visa',
  //     'Tier 5 Creative and Sporting Visa',
  //     'Tier 5 Charity Worker Visa',
  //     'Tier 5 Seasonal Worker Visa',
  //     'Tier 5 Religious Worker Visa',
  //     'Tier 5 International Agreement Visa',
  //     'Tier 5 Youth Mobility Scheme',
  //     'Standard Visitor Visa'
  //   ],
  //   questions: [
  //     {
  //       question: 'Will you be over 18 at the time of application?',
  //       number: 0,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 3
  //         },
  //         {
  //           text: 'No',
  //           value: 1
  //         }
  //       ]
  //     },
  //     // CHILD
  //     {
  //       question: 'Why do you want to live in the UK?',
  //       number: 1,
  //       answers: [
  //         {
  //           text: 'Study',
  //           value: 'Tier 4 Child Student Visa'
  //         },
  //         {
  //           text: 'Family',
  //           value: 2
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Do either of your parents have IDL or PR?',
  //       number: 2,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 'Apply as your parents dependant - Dependant Visa'
  //         },
  //         {
  //           text: 'No',
  //           value: 'Family Visa'
  //         }
  //       ]
  //     },
  //     // ADULT
  //     {
  //       question: 'Why do you want to live in the UK?',
  //       number: 3,
  //       answers: [
  //         {
  //           text: 'Work',
  //           value: 4
  //         },
  //         {
  //           text: 'Business',
  //           value: 9
  //         },
  //         {
  //           text: 'Family',
  //           value: 11
  //         },
  //         {
  //           text: 'Study',
  //           value: 15
  //         }
  //       ]
  //     },
  //     // WORK
  //     {
  //       question: 'Does your job relate to sport or religion?',
  //       number: 4,
  //       answers: [
  //         {
  //           text: 'Sports',
  //           value: ['Tier 2 Sportsperson Visa', 'Tier 5 Creative and Sporting Visa']
  //         },
  //         {
  //           text: 'Religion',
  //           value: ['Tier 2 Minister of Religion Visa', 'Tier 5 Religious Worker Visa']
  //         },
  //         {
  //           text: 'No',
  //           value: 5
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Is your job part of an approved government authorised exchange scheme?',
  //       number: 5,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 'Tier 5 Government Authorised Exchange Visa'
  //         },
  //         {
  //           text: 'No',
  //           value: 6
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Has your international employer offered you in a position in the UK branch of your workplace?',
  //       number: 6,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 7
  //         },
  //         {
  //           text: 'No',
  //           value: 8
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Are you a recent graduate?',
  //       number: 7,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 'Tier 2 Intra-company Transfer Graduate Trainee Visa'
  //         },
  //         {
  //           text: 'No',
  //           value: 'Tier 2 Intra-company Transfer Long-term Staff Visa'
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Which one of these best describes your work?',
  //       number: 8,
  //       answers: [
  //         {
  //           text: 'Charity',
  //           value: 'Tier 5 Charity Worker Visa'
  //         },
  //         {
  //           text: 'Sporty / Creative',
  //           value: 'Tier 5 Creative and Sporting Visa'
  //         },
  //         {
  //           text: 'Seasonal',
  //           value: 'Tier 5 Seasonal Worker Visa'
  //         },
  //         {
  //           text: 'Other',
  //           value: ['Tier 2 General Work Visa']
  //         }
  //       ]
  //     },
  //     // BUSINESS
  //     {
  //       question: 'Which one of these best describes your future business plans?',
  //       number: 9,
  //       answers: [
  //         {
  //           text: 'Start a business',
  //           value: ['Startup Visa', 'Innovator Visa']
  //         },
  //         {
  //           text: 'Invest in a business',
  //           value: 10
  //         },
  //         {
  //           text: 'Endorsed as an exceptional talent / top of your field?',
  //           value: 'Global Talent Visa'
  //         }
  //       ]
  //     },
  //     {
  //       question: 'How much money can you invest?',
  //       number: 10,
  //       answers: [
  //         {
  //           text: '2 million +',
  //           value: 'Tier 1 Investor Visa - 5 years for PR'
  //         },
  //         {
  //           text: '5 million +',
  //           value: 'Tier 1 Investor Visa - 3 years for PR'
  //         },
  //         {
  //           text: '10 million +',
  //           value: 'Tier 1 Investor Visa - 2 years for PR'
  //         }
  //       ]
  //     },
  //     // FAMILY
  //     {
  //       question: 'Which of the following best describes your situation?',
  //       number: 11,
  //       answers: [
  //         {
  //           text: 'Getting married but not living in the UK',
  //           value: 'Marriage Visa'
  //         },
  //         {
  //           text: 'Visiting family in the UK',
  //           value: 12
  //         },
  //         {
  //           text: 'Going to live with family in the UK',
  //           value: 13
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Which of the following best describes your situation?',
  //       number: 12,
  //       answers: [
  //         {
  //           text: 'Coming to visit partner/family',
  //           value: 'Standard Visitor Visa'
  //         },
  //         {
  //           text: 'Visiting your child who is studying in the UK',
  //           value: 'Parent of Tier 4 Child Visa'
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Do you have a partner/family member that is British or ILR/PR',
  //       number: 13,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: 14
  //         },
  //         {
  //           text: 'No',
  //           value: "You can't apply for a Family Visa"
  //         },
  //         {
  //           text: "It's complicated",
  //           value: 'Family Visa - Apply on the basis of your private life'
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Which of the following best describes your situation?',
  //       number: 14,
  //       answers: [
  //         {
  //           text: 'Coming as an adults to be cared for by a relative',
  //           value: 'Family Visa - Coming as an adult to be cared for by a relative route'
  //         },
  //         {
  //           text: 'Coming as a parent to join your child',
  //           value: 'Family Visa - Coming as a parent to join your child route'
  //         },
  //         {
  //           text: 'Coming to join your partner/spouse',
  //           value: 'Family Visa - Coming to join your partner/spouse route'
  //         }
  //       ]
  //     },
  //     // STUDY
  //     {
  //       question: 'How long is your course?',
  //       number: 15,
  //       answers: [
  //         {
  //           text: '6 months or less',
  //           value: 'Tier 4 Short Term Study Visa'
  //         },
  //         {
  //           text: 'More than 6 months',
  //           value: 16
  //         }
  //       ]
  //     },
  //     {
  //       question: 'Are you studying an English Language course?',
  //       number: 16,
  //       answers: [
  //         {
  //           text: 'Yes',
  //           value: ['Tier 4 Short Term Study Visa', 'Tier 4 General Student Visa']
  //         },
  //         {
  //           text: 'No',
  //           value: 'Tier 4 General Student Visa'
  //         }
  //       ]
  //     }
  //   ]
  // }
]

export default {
  namespaced: true,
  state: {
    items: [],
    result: {
      user: '',
      recommendedVisa: []
    }
  },
  actions: {
    getQuestions(context) {
      const userCurrentVisa = context.rootState.auth.user.profile.currentVisa.name;
      context.commit('setQuestions', userCurrentVisa);
    },
    getResults(context, results) {
      context.commit('setResults', results);
    },
    // Add results to questionnaireResults collection in db
    sendDbResults(context) {
      context.state.result.user = db.collection('profiles').doc(context.rootState.auth.user.uid);
      const result = context.state.result;
      return db.collection('questionnaireResults')
        .add(result)
        // Add results to local user profile, add results to and fave visa to user profile in db
        .then(docRef => {
          result.id = docRef.id;
          context.dispatch('addResultsToUserDb', result)
          context.commit('auth/addResultsToUser', result, {root: true})
          return true
        })
    },
    addResultsToUserDb(context, result) {
      const documentChecklist = context.rootState.visas.documentChecklist;
      const favoriteVisa = documentChecklist.filter(item => item.name === result.recommendedVisa[0]);
      return db.collection('profiles')
        .doc(result.user.id)
        .update({
          questionnaireResults: firebase.firestore.FieldValue.arrayUnion(result),
          favoriteVisa: favoriteVisa[0]
        })
    }
  },
  mutations: {
    setQuestions(state, userCurrentVisa) {
      questions.forEach(set => {
        if(set.visa === userCurrentVisa) {
          state.items = set.questions;
        } else if(Array.isArray(set.visa)) {
          set.visa.forEach((visa) => {
            if(visa === userCurrentVisa) {
              state.items = set.questions;
            }
          })
        }
      })
    },
    setResults(state, results) {
      state.result.recommendedVisa = results.recommendedVisa;
    }
  }
}

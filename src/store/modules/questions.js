// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
 import { db } from '@/db'

const questions = [
  {
    // 'Core Question' - Will define whether you're asked questions about cats or dogs
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
    // These are questions that are relevant for both cats and dogs and will show for either
    isCat: true,
    isDog: true,
    question: 'What are your toe beans like?',
    answers: [
      {
        text: 'Pink and soft',
        value: ['Zora', 'Rito']
      },
      {
        text: 'Black and rough',
        value: ['Minnie', 'Baldrick', 'Squirrel']
      }
    ]
  },  
  {
    isCat: true,
    isDog: true,
    question: 'What do you do at 3am?',
    answers: [
      {
        text: 'Run around like crazy',
        value: ['Zora', 'Rito']
      },
      {
        text: 'Sleep nice and snug',
        value: ['Minnie', 'Baldrick', 'Squirrel']
      }
    ]
  },
  {
    // Only these will show when answered Cat
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
    // Only these will show when answered Dog
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
    ],
    filteredResults: {
      user: '',
      topResult: '',
      secondResult: '',
      thirdResult: ''
    }
  },
  getters: {

  },
  actions: {
    getQuestions({commit}) {
      commit('setQuestions', questions);
    },
    getResults(context, results) {
      // First set state results
      context.commit('setResults', results);
      // Then use filtered results for questionnaireResults collection, and add reference to the user
      // (There is a firebase function set up to add questionnaireResults ID to user profile)
      context.state.filteredResults.user = db.collection('profiles').doc(context.rootState.auth.user.uid);
      return db.collection('questionnaireResults')
        .add(context.state.filteredResults)
        // Add filtered questionnaireResults and ID to local user profile
        .then(docRef => {
          context.state.filteredResults.id = docRef.id;
          context.commit('auth/addResultsToUser', context.state.filteredResults, {root: true})
          return true
        })
    }
  },
  mutations: {
    setQuestions(state, questions) {
      state.items = questions;
    },
    setResults(state, answers) {
      // Set state results from questionnaire answers
      state.results.forEach(result => {
        answers.forEach(answer => {
          if(result.name === answer.name) {
            result.score = answer.score;
          }
        });
      });
      // Sort results for highest scores
      const sortedResults = state.results.sort((a, b) => b.score - a.score);
      // Assign top 3 results in filteredResults
      state.filteredResults.topResult = sortedResults[0].name;
      state.filteredResults.secondResult = sortedResults[1].name;
      state.filteredResults.thirdResult = sortedResults[2].name;
    }
  }
}

import { db } from '@/db'
var _ = require('lodash');
import firebase from 'firebase/app';
import 'firebase/firestore';

import { questions } from '@/assets/js/questions'

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
      const userCurrentVisa = context.rootState.auth.user.profile.currentVisa.name
      context.commit('setQuestions', userCurrentVisa)
    },
    getResults(context, results) {
      context.commit('setResults', results)
    },
    // Add results to questionnaireResults collection in db
    sendDbResults(context) {
      context.state.result.user = db.collection('profiles').doc(context.rootState.auth.user.uid)
      const result = context.state.result

      return db.collection('questionnaireResults')
      .add(result)
      // Add results to local user profile, add results to and fave visa to user profile in db
      .then(docRef => {
        result.id = docRef.id

        context.dispatch('addResultsToUserDb', result)
        context.commit('auth/addResultsToUser', result, {root: true})

        return true
      })
    },
    addResultsToUserDb(context, result) {
      const documentChecklist = context.rootState.visas.documentChecklist
            //favoriteVisa = documentChecklist.filter(item => item.name === result.recommendedVisa[0]);

      return db.collection('profiles')
      .doc(result.user.id)
      .update({
        questionnaireResults: firebase.firestore.FieldValue.arrayUnion(result)
        //favoriteVisa: favoriteVisa[0]
      })
    }
  },
  mutations: {
    setQuestions(state, userCurrentVisa) {
      questions.forEach(set => {
        if(set.visa === userCurrentVisa) {
          state.items = set.questions
        } else if(Array.isArray(set.visa)) {
          set.visa.forEach((visa) => {
            if(visa === userCurrentVisa) {
              state.items = set.questions
            }
          })
        }
      })
    },
    setResults(state, results) {
      state.result.recommendedVisa = results.recommendedVisa
    }
  }
}

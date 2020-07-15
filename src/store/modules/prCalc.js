import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/db'

export default {
  namespaced: true,
  actions: {
    addHoliday(context, holiday) {
      return db.collection('profiles')
        .doc(context.rootState.auth.user.uid)
        .update({
          holiday: firebase.firestore.FieldValue.arrayUnion(holiday)
        })
        .then(() => {
          context.commit('auth/saveHoliday', holiday, {root: true});
        })
    },
    editHoliday(context, holiday) {
      return db.collection('profiles')
        .doc(context.rootState.auth.user.uid)
        .update({
          holiday: holiday
        })
        .then(() => {
          context.commit('auth/updateHoliday', holiday, {root: true});
        })
    }
  }
}

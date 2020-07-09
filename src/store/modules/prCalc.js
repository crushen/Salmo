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
    }
  }
}

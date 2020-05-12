// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// This function will be called when a document is added to questionnaireResults collection
exports.addResultsToProfile = functions.firestore
  .document('questionnaireResults/{resultsId}')
  .onCreate((change, context) => {
    const addedResults = change.data(); // change.data() = access data from the questionnaireResults
    const result = {...addedResults};
    const checklist = docChecklist.filter(item => item.name === result.recommendedVisa[0]);
    result.id = context.params.resultsId;
    db.collection('profiles')
      .doc(addedResults.user.id)
      .update({
        questionnaireResults: admin.firestore.FieldValue.arrayUnion(result),
        favoriteVisa: {
          name: result.recommendedVisa[0]
        }
      })
  })

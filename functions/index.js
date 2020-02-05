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
    const resultsId = context.params.resultsId; // this is the same as what's inside {} on onCreate function
    const addedResults = change.data(); // here you can access data from the questionnaireResults

    db.collection('profiles')
      .doc(addedResults.user.id)
      .update({
        questionnaireResults: admin.firestore.FieldValue.arrayUnion({
          id: resultsId,
          topResult: addedResults.topResult,
          secondResult: addedResults.secondResult,
          thirdResult: addedResults.thirdResult,
        })
      })
  })

const documentChecklist = [
  {
    name: 'Tier 1 Investor',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Startup',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  }
]

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
    result.id = context.params.resultsId;
    // Get document checklist and name for favorite visa
    const favoriteVisa = documentChecklist.filter(item => item.name === result.recommendedVisa[0]);
    db.collection('profiles')
      .doc(addedResults.user.id)
      .update({
        questionnaireResults: admin.firestore.FieldValue.arrayUnion(result),
        favoriteVisa: favoriteVisa[0]
      })
  })

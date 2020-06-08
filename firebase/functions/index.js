const functions = require('firebase-functions');
const contentful = require('contentful')
const admin = require('firebase-admin')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.contentfulFetch = functions.https.onCall((data, context) => {
  // Make sure user is logged in.
  if (context.auth.uid) {
    // Then fetch gated content from Contentful.
    const client = contentful.createClient({
      space: functions.config().contentful.space,
      accessToken: functions.config().contentful.access_token
    })

    return client.getEntry(data.content_id)
      .then(function (entry) {
        return entry
      })
  }

  return false;
});

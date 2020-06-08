import firebase from 'firebase'

export default function firebase_client() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: process.env.GATSBY_FIREBASE_API_KEY,
      authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.GATSBY_FIREBASE_PROJECT_ID
    });
  }

  // Uncomment for local debugging, using the functions emulator.
  //firebase.functions().useFunctionsEmulator("http://localhost:5001");

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

  return firebase
}
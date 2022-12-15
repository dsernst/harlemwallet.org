import Firebase from 'firebase-admin'

const {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_DATABASE_URL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} = process.env

// Init firebase (only once)
export const firebase = !Firebase.apps.length
  ? Firebase.initializeApp({
      credential: Firebase.credential.cert({
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY,
        projectId: FIREBASE_PROJECT_ID,
      }),
      databaseURL:
        FIREBASE_DATABASE_URL || 'https://harlemwallet.firebaseio.com',
    })
  : Firebase.app()

import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
  {
    apiKey: "Your Api Key",
    authDomain: "Your FireBase Console Domain",
    databaseURL: "Your Firebase Database URL",
    projectId: "Your Project Name and ID",
    storageBucket: "Storage Bucket",
    messagingSenderId: "Messaging",
    appId: "APP ID",
    measurementId: "Measurement ID"
  }
)

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();
export { db, auth, storage }
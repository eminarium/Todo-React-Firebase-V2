import firebase from 'firebase'
import FIREBASE_API_KEY from './env_variables'

var firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "todo-v20.firebaseapp.com",
    projectId: "todo-v20",
    storageBucket: "todo-v20.appspot.com",
    messagingSenderId: "570703113597",
    appId: "1:570703113597:web:0463369ee7b721dd817014",
    measurementId: "G-S3FP6F8J2K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
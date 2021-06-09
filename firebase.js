import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyATCetWPRRiowxwVw_DsiOmBMDYg7nQxAg",
    authDomain: "buyandsell-pub.firebaseapp.com",
    projectId: "buyandsell-pub",
    storageBucket: "buyandsell-pub.appspot.com",
    messagingSenderId: "1032331770633",
    appId: "1:1032331770633:web:febddadd44c9856a21f1d8"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }
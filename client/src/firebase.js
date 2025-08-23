// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoeNFAIfQkUuqoLIs9LsBSX4-2Tn-Sjrc",
  authDomain: "asca-webtoon-7f6b3.firebaseapp.com",
  projectId: "asca-webtoon-7f6b3",
  storageBucket: "asca-webtoon-7f6b3.firebasestorage.app",
  messagingSenderId: "745549038292",
  appId: "1:745549038292:web:2b3efa39af5c20172e7141",
  measurementId: "G-9RV0QK1B4R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

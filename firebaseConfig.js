// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzKb2S02Jj-f1AIgvePEkbbAov_lEO9FQ",
  authDomain: "hippocampus-410202.firebaseapp.com",
  projectId: "hippocampus-410202",
  storageBucket: "hippocampus-410202.appspot.com",
  messagingSenderId: "1092421045056",
  appId: "1:1092421045056:web:f71525db2caa4f54ac08a5",
  measurementId: "G-PGWZRB6HXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
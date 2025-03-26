// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFv7YLXgWSpR2_QNcuNfNF3b3CAvuyTKk",
  authDomain: "cinemo-3bf9d.firebaseapp.com",
  projectId: "cinemo-3bf9d",
  storageBucket: "cinemo-3bf9d.firebasestorage.app",
  messagingSenderId: "135308853278",
  appId: "1:135308853278:web:ebdbff7da7c859af38ae0f",
  measurementId: "G-CYHYRS5JF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
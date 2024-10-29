// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth/web-extension";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoOAh4c2r69txEd92w4uQq8vkmeJJBw1g",
  authDomain: "react-authentication-app-4de23.firebaseapp.com",
  projectId: "react-authentication-app-4de23",
  storageBucket: "react-authentication-app-4de23.appspot.com",
  messagingSenderId: "332295975268",
  appId: "1:332295975268:web:c169444a4b46436826ca71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

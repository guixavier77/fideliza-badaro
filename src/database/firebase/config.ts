// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ4oEnDbgh6Zzzfi5eiKyTRdTX9LoQLcA",
  authDomain: "fidelizabadaro.firebaseapp.com",
  projectId: "fidelizabadaro",
  storageBucket: "fidelizabadaro.appspot.com",
  messagingSenderId: "239536562007",
  appId: "1:239536562007:web:1b30f5eab60a0d40dfa812"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {app,auth}
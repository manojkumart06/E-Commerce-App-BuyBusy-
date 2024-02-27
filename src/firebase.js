// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlCSIInupVBqTqLk78EkRJJErmLiRq4mM",
  authDomain: "buybusy-20459.firebaseapp.com",
  projectId: "buybusy-20459",
  storageBucket: "buybusy-20459.appspot.com",
  messagingSenderId: "655320117237",
  appId: "1:655320117237:web:020b99800598308a08fabc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const db = getFirestore();
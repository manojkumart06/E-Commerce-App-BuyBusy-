// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN-GCzqSOLHm0c0uIHzv1wFlmLfE7CIBU",
  authDomain: "busybuy-00.firebaseapp.com",
  projectId: "busybuy-00",
  storageBucket: "busybuy-00.appspot.com",
  messagingSenderId: "1048248153515",
  appId: "1:1048248153515:web:c4d688ef23e2d39e3d4eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const db = getFirestore();
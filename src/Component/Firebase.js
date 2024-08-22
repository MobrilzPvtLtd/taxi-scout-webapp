// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL0hd3a2l1k1uLSAxQNN511PWkguNxzE4",
    authDomain: "taxiscout24-2.firebaseapp.com",
    databaseURL: "https://taxiscout24-2-default-rtdb.firebaseio.com",
    projectId: "taxiscout24-2",
    storageBucket: "taxiscout24-2.appspot.com",
    messagingSenderId: "608657907803",
    appId: "1:608657907803:web:42173f93f1f4616f159f7e",
    measurementId: "G-39BVH7EKRF"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database or Firestore
const database = getDatabase(app); // Realtime Database
const firestore = getFirestore(app); // Firestore

export { database, firestore };

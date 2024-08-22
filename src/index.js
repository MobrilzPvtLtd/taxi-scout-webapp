import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // import firebase from "firebase";
// const firebaseConfig = {
//   apiKey: "AIzaSyAL0hd3a2l1k1uLSAxQNN511PWkguNxzE4",
//   authDomain: "taxiscout24-2.firebaseapp.com",
//   databaseURL: "https://taxiscout24-2-default-rtdb.firebaseio.com",
//   projectId: "taxiscout24-2",
//   storageBucket: "taxiscout24-2.appspot.com",
//   messagingSenderId: "608657907803",
//   appId: "1:608657907803:web:42173f93f1f4616f159f7e",
//   measurementId: "G-39BVH7EKRF"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


  
// console.log("firebase app" , analytics)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

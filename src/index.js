import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBkkm67QjmV5HoB2HMiwtyL4Xd1lHGEtt0",
  authDomain: "taxiscout24-87f68.firebaseapp.com",
  databaseURL: "https://taxiscout24-87f68-default-rtdb.firebaseio.com",
  projectId: "taxiscout24-87f68",
  storageBucket: "taxiscout24-87f68.appspot.com",
  messagingSenderId: "199864261097",
  appId: "1:199864261097:web:5c78d5f771255f92e89378",
  measurementId: "G-5PRGCFGS4K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


  
console.log("firebase app" , analytics)

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

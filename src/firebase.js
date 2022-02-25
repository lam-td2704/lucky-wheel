// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJGB4C6ImGkuzfDxKHB1gBnwFh-8xFcBc",
  authDomain: "crwn-clothing-81621.firebaseapp.com",
  projectId: "crwn-clothing-81621",
  storageBucket: "crwn-clothing-81621.appspot.com",
  messagingSenderId: "872196447615",
  appId: "1:872196447615:web:5fa3b3a8eebdc8a26cce4a",
  measurementId: "G-X36T5TD9K1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

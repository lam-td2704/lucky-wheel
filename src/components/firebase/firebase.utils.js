import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAJGB4C6ImGkuzfDxKHB1gBnwFh-8xFcBc",
  authDomain: "crwn-clothing-81621.firebaseapp.com",
  projectId: "crwn-clothing-81621",
  storageBucket: "crwn-clothing-81621.appspot.com",
  messagingSenderId: "872196447615",
  appId: "1:872196447615:web:5fa3b3a8eebdc8a26cce4a",
  measurementId: "G-X36T5TD9K1",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

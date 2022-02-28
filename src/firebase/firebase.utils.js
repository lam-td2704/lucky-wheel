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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

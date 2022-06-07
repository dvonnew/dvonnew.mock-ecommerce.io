import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBCsH8ViFKXgipMhmRSblfsxNb_sr6QPT8",
  authDomain: "mock-ecommerce-3f451.firebaseapp.com",
  projectId: "mock-ecommerce-3f451",
  storageBucket: "mock-ecommerce-3f451.appspot.com",
  messagingSenderId: "465926827357",
  appId: "1:465926827357:web:2e08cf282f50964788ccb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function signIn() {
    let provider = new GoogleAuthProvider()
    try {
        await signInWithPopup(getAuth(), provider)
    } catch (err) {
        console.error(err)
    }
}

function signOutUser() {
    signOut(getAuth())
}

function initFirebaseAuth() {
    onAuthStateChanged(getAuth())
}

function isUserSignedIn() {
    return !!getAuth().currentUser;
}

export { db, signIn, signOutUser, isUserSignedIn }
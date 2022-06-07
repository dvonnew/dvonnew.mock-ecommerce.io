import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
 } from "firebase/firestore"
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
const auth = getAuth(app)
const db = getFirestore(app)


// User Sig-in and Sign-out
async function signIn() {
    let provider = new GoogleAuthProvider()
    try {
        const res = await signInWithPopup(getAuth(), provider)
        const user = res.user
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                picture: user.photoURL
            })
        }
    } catch (err) {
        console.error(err)
    }
}

function signOutUser() {
    signOut(getAuth())
}

function isUserSignedIn() {
    return !!getAuth().currentUser;
}

// Fetching User Related Data


// Cart Storage

export { db, auth, signIn, signOutUser, isUserSignedIn }
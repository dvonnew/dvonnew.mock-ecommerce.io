import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCsH8ViFKXgipMhmRSblfsxNb_sr6QPT8",
    authDomain: "mock-ecommerce-3f451.firebaseapp.com",
    projectId: "mock-ecommerce-3f451",
    storageBucket: "mock-ecommerce-3f451.appspot.com",
    messagingSenderId: "465926827357",
    appId: "1:465926827357:web:2e08cf282f50964788ccb4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }
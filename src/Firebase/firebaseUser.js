import { db, auth } from './firebase-config'
import { 
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth'


// User Sig-in and Sign-out
async function signIn() {
    let provider = new GoogleAuthProvider()
    try {
        const res = await signInWithPopup(auth, provider)
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
    signOut(auth)
}

function isUserSignedIn() {
    return !!auth.currentUser;
}

export { signIn, signOutUser, isUserSignedIn }


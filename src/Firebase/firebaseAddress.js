import { db, auth } from './firebase-config'
import { isUserSignedIn } from './firebaseUser'
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    setDoc,
    Timestamp,
    deleteDoc
} from "firebase/firestore"

let time = Timestamp.now()

async function saveUserAddress(userID, address) {
    try{
        const q = query(collection(db, "addresses"), where("userID", "==", userID), where("id", "==", address.id))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "addresses"), {
                ...address,
                userID: userID,
                time: time
            })
        } else{
            await updateDoc(doc(db, "addresses", docs.docs[0].id), {
                ...address,
                time: time
            })
        }
    } catch (err) {
        console.error(err)
    }
}

async function getUserAddress(userID) {
    try {
        let address = {}
        if (!isUserSignedIn()) {
            return address
        } else {
            const q = query(collection(db, "addresses"), where("userID", "==", userID))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                address.street = ""
                address.apt = ""
                address.city = ""
                address.state = ""
                address.zipcode = "" 
                return address
            } else {
                docs.docs.forEach(info => {
                    address.street = info.data().street
                    address.apt = info.data().apt
                    address.city = info.data().city
                    address.state = info.data().state
                    address.zipcode = info.data().zipcode
                    address.id = info.data().id
                })
                return address
            }
        }
    } catch (err) {
        console.log(err)
    }
}

export { saveUserAddress, getUserAddress}
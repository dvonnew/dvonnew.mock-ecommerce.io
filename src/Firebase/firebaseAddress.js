import { db } from './firebase-config'
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
        let address = []
        if (!isUserSignedIn()) {
            return address
        } else {
            const q = query(collection(db, "addresses"), where("userID", "==", userID))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                return
            } else {
                docs.docs.forEach(info => {
                    const location = {
                        name:info.data().name,
                        street:info.data().street,
                        apt: info.data().apt,
                        city :info.data().city,
                        state :info.data().state,
                        zipcode :info.data().zipcode,
                        id: info.data().id
                    }
                    address.push(location)
                })
                return address
            }
        }
    } catch (err) {
        console.log(err)
    }
}

async function deleteAddressFS(userID, addressID) {
    try{
        const q = query(collection(db, "addresses"), where("userID", "==", userID), where("id", "==", addressID))
        const docs = await getDocs(q)
        await deleteDoc(doc(db, "addresses", docs.docs[0].id))
    } catch (err) {
        console.log(err)
    }
}

export { saveUserAddress, getUserAddress, deleteAddressFS}
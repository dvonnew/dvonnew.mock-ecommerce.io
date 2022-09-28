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
    Timestamp,
    deleteDoc
} from "firebase/firestore"

let time = Timestamp.now()

async function saveUserAddress(userID, address) {
    try{
        if (address.primary === true) {
            checkPrimaryStatus(userID)
        }
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

async function checkPrimaryStatus(userID){
    try {
        const q = query(collection(db, "addresses"), where("userID", "==", userID), where("primary", "==", true))
        const docs = await getDocs(q)
        if (docs.docs.length === 0){
            return
        } else {
            await updateDoc(doc(db, "addresses", docs.docs[0].id), {
                primary: false
            })
        }
    } catch (err) {
        console.error(err)
    }
}

async function getPrimaryAddress(userID) {
    try {
        let primaryAddress = []
        if (!isUserSignedIn()) {
            return primaryAddress
        } else {
            const q = query(collection(db, "addresses"), where("userID", "==", userID), where("primary", "==", true))
            const docs = await getDocs(q)
            if (docs.docs.length === 0){
                return
            } else {
                const info = {
                    name: docs.docs[0].data().name,
                    street: docs.docs[0].data().street,
                    apt: docs.docs[0].data().apt,
                    city: docs.docs[0].data().city,
                    state: docs.docs[0].data().state,
                    zipcode: docs.docs[0].data().zipcode,
                    id: docs.docs[0].data().id,
                    primary: docs.docs[0].data().primary,
                }
                primaryAddress.push(info)
                return primaryAddress
            }
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
                        name: info.data().name,
                        street: info.data().street,
                        apt: info.data().apt,
                        city: info.data().city,
                        state: info.data().state,
                        zipcode: info.data().zipcode,
                        id: info.data().id,
                        primary: info.data().primary
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

export { saveUserAddress, getUserAddress, deleteAddressFS, getPrimaryAddress}
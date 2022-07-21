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

async function saveUserPaymentInfo(userID, paymentInfo) {
    try {
        const q = query(collection(db, "paymentInformation"), where("userID", "==", userID), where("id", "==", paymentInfo.id))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "paymentInformation"), {
                ...paymentInfo,
                userID: userID,
                time: time
            }) 
        } else{
            await updateDoc(doc(db, "paymentInformation", docs.docs[0].id), {
                ...paymentInfo,
                time: time
            })
        }
    } catch (err) {
        console.error(err)
    }
}

async function getUserPaymentInfo(userID) {
    try {
        let paymentInfo = []
        if (!isUserSignedIn()){
            return paymentInfo
        } else {
            const q = query(collection(db, "paymentInformation"), where("userID", "==", userID))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                return
            } else {
                docs.docs.forEach(info => {
                    const card = {
                        name: info.data().name,
                        number: info.data().number,
                        month: info.data().month,
                        year: info.data().year,
                        cvv: info.data().year,
                        zipcode: info.data().zipcode,
                        cardType: info.data().cardType,
                        id: info.data().id
                    }
                    paymentInfo.push(card)
                })
                return paymentInfo
            }
        }
    } catch (err) {
        console.error(err)
    }
}

async function deletePaymentInfoFS(userID, paymentID) {
    try {
        const q = query(collection(db, "paymentInformation"), where("userID", "==", userID), where("id", "==", paymentID))
        const docs = await getDocs(q)
        await deleteDoc(doc(db, "paymentInformation", docs.docs[0].id))
    } catch (err) {
        console.error(err)
    }
}

export { saveUserPaymentInfo, getUserPaymentInfo, deletePaymentInfoFS }
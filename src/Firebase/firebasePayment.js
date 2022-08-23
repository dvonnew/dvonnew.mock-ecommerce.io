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
        if(paymentInfo.primary === true) {
            checkPrimaryStatus(userID)
        }
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

async function checkPrimaryStatus(userID){
    try {
        const q = query(collection(db, "paymentInformation"), where("userID", "==", userID), where("primary", "==", true))
        const docs = await getDocs(q)
        if (docs.docs.length === 0){
            return
        } else {
            await updateDoc(doc(db, "paymentInformation", docs.docs[0].id), {
                primary: false
            })
        }
    } catch (err) {
        console.error(err)
    }
}

async function getPrimaryPayment(userID) {
    try {
        let primaryPayment = []
        if (!isUserSignedIn()) {
            return primaryPayment
        } else {
            const q = query(collection(db, "paymentInformation"), where("userID", "==", userID), where("primary", "==", true))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                return
            } else {
                const card = {
                    name: docs.docs[0].data().name,
                    number: docs.docs[0].data().number,
                    month: docs.docs[0].data().month,
                    year: docs.docs[0].data().year,
                    cvv: docs.docs[0].data().cvv,
                    zipcode: docs.docs[0].data().zipcode,
                    cardType: docs.docs[0].data().cardType,
                    id: docs.docs[0].data().id,
                    primary: docs.docs[0].data().primary
                }
                primaryPayment.push(card)
                return primaryPayment
            }
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
                        id: info.data().id,
                        primary: info.data().primary
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

export { saveUserPaymentInfo, getUserPaymentInfo, deletePaymentInfoFS, getPrimaryPayment }
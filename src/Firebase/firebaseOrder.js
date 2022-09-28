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

} from "firebase/firestore"

let time = Timestamp.now()

async function saveUserOrder(userID, orderInfo) {
    try {
        const q = query(collection(db, "orders"), where("userID", "==", userID), where("id", "==", orderInfo.id))
        const docs = await getDocs(q)
        if (docs.docs.length === 0 && userID !== null) {
            await addDoc(collection(db, "orders"), {
                ...orderInfo,
                userID: userID,
                time: time
            })
        } else {
            await updateDoc(doc(db, "orders", docs.doc[0].id), {
                ...orderInfo,
                time: time
            })
        }
        
    } catch (err) {
        console.error(err)
    }
}

async function getOrders(userID) {
    try {
        let orders = []
        if (!isUserSignedIn()) {
            return orders
        } else {
            const q = query(collection(db, "orders"), where("userID", "==", userID))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                return orders
            } else {
                docs.docs.forEach(order => {
                    const info = {
                        cart: order.data().cart,
                        payment: order.data().payment,
                        shipToAddress: order.data().shipToAddress,
                        billToAddress: order.data().billToAddress,
                        total: order.data().total,
                        id: order.data().id,
                        time: order.data().time
                    }
                    orders.push(info)
                });
                console.log(orders)
                return orders
                
            }
        }
    } catch (err) {
        console.error(err)
    }
}

export { saveUserOrder, getOrders}
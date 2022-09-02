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

async function getUserCart(userID) {
    try {
        let cart = []
        if (!isUserSignedIn()){
            return cart
        } else {
            const q = query(collection(db, "cartItems"), where("userID", "==", userID))
            const docs = await getDocs(q)
            if(docs.docs.length === 0){
                return cart
            } else {
                docs.docs.forEach(cartItem => {
                    const cartItemDetail = {
                        item: cartItem.data().item,
                        amount: cartItem.data().amount,
                        total: cartItem.data().total
                    }
                    cart.push(cartItemDetail)
                })
                return cart
            }
        }
    } catch (err) {
        console.log(err)
    }
}


async function saveCart(userID, cart) {
    try{
        cart.forEach(async function (item) {
            const q = query(collection(db, "cartItems"), where("userID", "==", userID), where("item.id", "==", item.item.id))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "cartItems"), {
                    ...item,
                    userID: userID,
                    time: time
                })
            } else{
                await updateDoc(doc(db, "cartItems", docs.docs[0].id), {
                    ...item,
                    time: time
                })
            }
        })
    } catch (err) {
        console.error(err)
    }
}

async function deleteCartItem(userID, itemID) {
    try{
        const q = query(collection(db, "cartItems"), where("userID", "==", userID), where("item.id", "==", itemID))
        const docs = await getDocs(q)
        await deleteDoc(doc(db, "cartItems", docs.docs[0].id))
    } catch (err) {
        console.log(err)
    }
}

export { saveCart, getUserCart, deleteCartItem }
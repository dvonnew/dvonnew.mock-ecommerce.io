import React, {useState, useEffect}  from 'react'
import '../App.css'
import Nav from './NavComponents/Nav'
import Home from './HomeComponents/HomePage'
import Shop from './ShopComponents/ShopPage'
import Cart from './CartComponents/ShoppingCart'
import Item from './ShopComponents/ItemPage'
import Profile from './UserProfileComponents/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { db, auth, signIn, signOutUser } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { collection, addDoc, Timestamp } from 'firebase/firestore'

const App = () => {

    const [cart, setCart] = useState([])
    const [user, login, error] = useAuthState(auth)

    useEffect(() => {
        console.log(cart)
    }, [cart])

    useEffect(() => {
        if (!user) return
        console.log(user)
    }, [user])

    //Cart Related

    const addCartQuantity = (i, item, updatedItem) => {
        const newAmount = updatedItem.amount + item.amount
        const newTotal = newAmount * item.item.price
        const newCart = [...cart]
        newCart[i] = {'item': item.item, 'amount' : newAmount, 'total': newTotal}
        setCart(newCart)
    }

    const onQuantityChange = (updatedItem, value) => {
        cart.find((item, i) => {
            if (item.item.id === updatedItem.item.id) {
                const newTotal = value * item.item.price
                const newCart = [...cart]
                newCart[i] = {'item': item.item, 'amount': value, 'total': newTotal}
                setCart(newCart)
        }})
    }

    const addToCart = (cartItemDetail) => {
        if (cart.find(item => item.item.id === cartItemDetail.item.id)){
                cart.find((item, i) => {
                    if (item.item.id === cartItemDetail.item.id){
                        addCartQuantity(i, item, cartItemDetail)
                    }
                })
            } else{
            const newCartItem = [...cart, cartItemDetail]
            setCart(newCartItem)
        }
    }

    const deleteItem = (cartItem) => {
        cart.find((item, i) => {
            if(item.item.id === cartItem.item.id){
                const newCart = [...cart]
                newCart.splice(i, 1)
                setCart(newCart)
            }
        })
    }

    return(
        <>
            <Router>
                <div>
                    <Nav signIn={signIn} signOut={signOutUser} user={user}/>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/shop" exact element={<Shop />} />
                        <Route path="/cart"  element={<Cart cart={cart} deleteItem={deleteItem} onQuantityChange={onQuantityChange} />} />
                        <Route path="/shop/:id" element={<Item addToCart={addToCart} />} />
                        <Route path="/profile" element={<Profile user={user}/>} />
                    </Routes>
                </div>
            </Router>
        </>
  )
}
export default App;

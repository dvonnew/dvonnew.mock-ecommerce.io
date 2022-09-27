import React, {useState, useEffect}  from 'react'
import '../App.css'
import Nav from './NavComponents/Nav'
import Home from './HomeComponents/HomePage'
import Shop from './ShopComponents/ShopPage'
import Cart from './CartComponents/ShoppingCart'
import Item from './ShopComponents/ItemPage'
import Profile from './UserProfileComponents/Profile'
import CheckoutPage from './CheckoutComponents/Checkout'
import Orders from './OrdersComponents/Orders'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { signIn, signOutUser } from '../Firebase/firebaseUser'
import { saveCart, getUserCart, deleteCartItem } from '../Firebase/firebaseCart'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/firebase-config'



const App = () => {


    const [user, login, error] = useAuthState(auth)
    const [cart, setCart] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems()
    }, [])
    
    useEffect(() => {
        if (!user) return
        getCart()
    }, [user])

    //items fetch
    const fetchItems = async () => {
        const data = await fetch("https://serene-chamber-57819.herokuapp.com/https://fakestoreapi.com/products")

        const itemsQuery = await data.json()
        setItems(itemsQuery)
    }

    //Cart Related

    const getCart = async () => {
        const newCart = await getUserCart(user.uid)
        setCart(newCart)
    }

    const signOut = () => {
        signOutUser()
        setCart([])
    }

    const addCartQuantity = (i, item, updatedItem) => {
        const newAmount = updatedItem.amount + item.amount
        const newTotal = newAmount * item.item.price
        const newCart = [...cart]
        newCart[i] = {'item': item.item, 'amount' : newAmount, 'total': newTotal}
        setCart(newCart)
        saveCart(user.uid, newCart)
    }

    const onQuantityChange = (updatedItem, value) => {
        cart.find((item, i) => {
            if (item.item.id === updatedItem.item.id) {
                const newTotal = value * item.item.price
                const newCart = [...cart]
                newCart[i] = {'item': item.item, 'amount': value, 'total': newTotal}
                setCart(newCart)
                saveCart(user.uid, newCart)
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
            const newCart = [...cart, cartItemDetail]
            setCart(newCart)
            saveCart(user.uid, newCart)
        }
    }

    const deleteItem = (cartItem) => {
        cart.find((item, i) => {
            if(item.item.id === cartItem.item.id){
                const newCart = [...cart]
                newCart.splice(i, 1)
                setCart(newCart)
                deleteCartItem(user.uid, cartItem.item.id)
            }
        })
    }

    const clearCart = () => {
        cart.forEach((item) => {
            deleteCartItem(user.uid, item.item.id)
        })
        setCart([])
    }

    return(
        <>
            <Router>
                <div className='body'>
                    <Nav signIn={signIn} signOut={signOut} user={user}/>
                    <div className='shopBody'>
                    <Routes>
                        <Route path="/" exact element={<Home items={items}/>} />
                        <Route path="/shop" exact element={<Shop items={items} />} />
                        <Route path="/cart"  element={<Cart cart={cart} user={user} deleteItem={deleteItem} onQuantityChange={onQuantityChange} />} />
                        <Route path="/shop/:id" element={<Item items={items} addToCart={addToCart} />} />
                        <Route path="/profile" element={<Profile user={user}/>} />
                        <Route path="/orders" element={<Orders user={user} />} />
                        <Route path="/cart/checkout" element={<CheckoutPage user={user} cart={cart} clearCart={clearCart} />}/>
                    </Routes>
                    </div>
                </div>
            </Router>
        </>
  )
}
export default App;

import React, {useState, useEffect}  from 'react'
import '../App.css'
import Nav from './Nav'
import Home from './HomeComponents/HomePage'
import Shop from './ShopComponents/ShopPage'
import Cart from './CartComponents/ShoppingCart'
import Item from './ShopComponents/ItemPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log(cart)
    }, [cart])

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
        if (cart.length !== 0 ) {
            cart.find((item, i) => {
                if(item.item.id === cartItemDetail.item.id){
                    console.log('------item already in cart------')
                    addCartQuantity(i, item, cartItemDetail)
                } else {
                    console.log('------need to add item------')
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
                    <Nav />
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/shop" exact element={<Shop />} />
                        <Route path="/cart"  element={<Cart cart={cart} deleteItem={deleteItem} onQuantityChange={onQuantityChange} />} />
                        <Route path="/shop/:id" element={<Item addToCart={addToCart} />} />
                    </Routes>
                </div>
            </Router>
        </>
  )
}
export default App;

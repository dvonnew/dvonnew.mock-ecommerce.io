import React from "react";
import CartCard from "./CartCard";
import { Link } from "react-router-dom"


const Cart = (props) => {

    const { cart } = props

    if (!cart || cart.length === 0) {
        return (
            <>
                <h1>Cart</h1>
                <p>Cart is Empty</p>
            </>
        )
    } else {
        return (
            <div>
                <h1>Cart</h1>
                <div className='shop-cart'>
                    {cart.map((item) => (
                        <CartCard item={item} key={item.item.id} deleteItem={props.deleteItem} onQuantityChange={props.onQuantityChange} />
                    ))}
                </div>
                <Link to='checkout'>
                    <button className='check-out-button' >Check Out</button>
                </Link>
            </div>
    )
    }
}

export default Cart
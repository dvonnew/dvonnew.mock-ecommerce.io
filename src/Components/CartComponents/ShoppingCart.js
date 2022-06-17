import React from "react";
import CartCard from "./CartCard";


const Cart = (props) => {

    const { cart } = props


    if (cart.length === 0){
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
            </div>
    )
    }
}

export default Cart
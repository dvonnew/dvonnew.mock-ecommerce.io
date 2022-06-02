import React from "react";
import AlterCartQuantity from "./AlterCartQuantity";
import Remove from "./RemoveItem";

const CartCard = (props) => {

    const { item } = props 

    const deleteItem = (e) => {
        e.preventDefault()
        props.deleteItem(item)
    }

    const onQuantityChange = (value) => {
        props.onQuantityChange(item, value)
    }
    
    return (
        <div className='cart-card'>
            <div className="cart-description">
                <p>{item.item.title}</p>
                <div className='cart-item-image'>
                    <img src={item.item.image} alt={item.item.title} className='item-image'></img>
                </div>
            </div>
            <div className='cart-detail'>
                <p>Total: ${item.total}</p>
                <AlterCartQuantity quantity={item.amount} onQuantityChange={onQuantityChange} />
                <Remove deleteItem={deleteItem}/>
            </div>
        </div>
    )
}

export default CartCard
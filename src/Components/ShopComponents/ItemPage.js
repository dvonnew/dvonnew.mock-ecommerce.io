import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlterQuantity from "./AlterQuantity";

const Item = (props) => {

    const params = useParams()
    const { items } = props
    const [item, setItem] = useState(items[params.id-1])
    
    const initialItemDetail = {
        item: item,
        amount: 0,
        total: 0,
    }

    const [itemDetail, setItemDetail] = useState(initialItemDetail)

    const onQuantityChange = (value) => {
        const newTotal = value * itemDetail.item.price
        setItemDetail((prevState) => ({...prevState, 'amount': value, 'total': newTotal }))
    }

    const addToCart = (e) => {
        e.preventDefault()
        props.addToCart(itemDetail)
    }

    if (!item) {
        return( 
            <></>
        )
    } else {
        return (
            <div className="item-page">
                <h1>{item.title}</h1>
                <div className='item-page-detail'>
                    <img src={item.image} alt='/' className='item-image'></img>
                    <div className='rating-buy-box'>
                        <div className='item-rating'>
                            {/* <p>{item.rating.rate}/5</p>
                            <p>{item.rating.count} ratings</p> */}
                        </div>
                        <div className='buy-box'>
                            <p>${item.price.toFixed(2)}</p>
                            <form>
                                <AlterQuantity onQuantityChange={onQuantityChange} quantity={itemDetail.amount} />
                                <button onClick={addToCart}>Add to Cart</button>
                            </form>
                        </div>
                    </div>
                </div>
                <h3>Product Description</h3>
                <p className="description">{itemDetail.item.description}</p>
            </div>
        )
    }
}

export default Item
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlterQuantity from "./AlterQuantity";

const Item = (props) => {

    const params = useParams()

    const initialItemDetail = {
        item: {},
        amount: 1,
        total: 0,
    }

    const [cartItemDetail, setCartItemDetail] = useState(initialItemDetail)

    useEffect(() => {
        fetchItem()
    })

    const fetchItem = async () => {
        const data = await fetch(`https://fakestoreapi.com/products/${params.id}`)

        const item = await data.json()
        setCartItemDetail((prevState) => ({...prevState, 'item': item }))
    }

    const onQuantityChange = (value) => {
        const newTotal = value * cartItemDetail.item.price
        setCartItemDetail((prevState) => ({...prevState, 'amount': value, 'total': newTotal }))
    }

    const addToCart = (e) => {
        e.preventDefault()
        console.log(cartItemDetail.amount)
        props.addToCart(cartItemDetail)
    }

    return (
        <div className="item-page">
            <h1>{cartItemDetail.item.title}</h1>
            <div className='item-page-detail'>
                <img src={cartItemDetail.item.image} alt='/' className='item-image'></img>
                <div className='rating-buy-box'>
                    <div className='item-rating'>
                        {/* <p>{item.rating.rate}/5</p>
                        <p>{item.rating.count} ratings</p> */}
                    </div>
                    <div className='buy-box'>
                        <p>${cartItemDetail.item.price}</p>
                        <form>
                            <AlterQuantity onQuantityChange={onQuantityChange} quantity={cartItemDetail.amount} />
                            <button onClick={addToCart}>Add to Cart</button>
                        </form>
                    </div>
                </div>
            </div>
            <h3>Product Description</h3>
            <p className="description">{cartItemDetail.item.description}</p>
        </div>
    )
}

export default Item
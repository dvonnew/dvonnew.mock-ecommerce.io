import React from "react";
import {Link} from 'react-router-dom'

const ItemDisplay = (props) => {

    const navStyle ={
        color: 'black'
    }

    const { item } = props

    return (
        <Link style={navStyle} to={`${item.id}`}>
            <div className='item-card'>
                <div className='item-image'>
                    <img src={item.image} alt={item.title} className='item-image'></img>
                </div>
                <div className='item-detail'>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ItemDisplay
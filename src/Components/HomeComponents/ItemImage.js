import React, { useState } from "react";
import { Link } from 'react-router-dom'


const ItemImage = (props) => {

    const [style, setStyle] = useState({display: 'none'})

    const { item } = props

    const navStyle ={
        color: 'black'
    }

    const handleHover = (e) => {
        setStyle({display: 'block'})
    }

    const handleOut = (e) => {
        setStyle({display: 'none'})
    }
    
    return(
        <>
            <Link style={navStyle} to={`/shop/${item.id}`}>
                <div className='home-image'>
                    <p className="home-image-title" style={style}>{item.title}</p>
                    <img src={item.image} alt={item.title} className='sliderimg' onMouseOver={handleHover} onMouseOut={handleOut}></img>
                </div>
            </Link>
        </>
    )
}

export default ItemImage
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'
import ItemImage from "./ItemImage";


const ImagesSlider = () => {

    useEffect(() => {
        fetchItems()
    }, [])

    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const data = await fetch("https://fakestoreapi.com/products")

        const items = await data.json()
        items.sort(function (a,b) {
            return a.rating.rate - b.rating.rate
        })
        setItems(items.slice(0,5))
    }

    return (
        <div className='image-slider'>
            <AliceCarousel autoPlay auto autoPlayInterval="3000" infinite={true}>
                {items.map(item=> (
                    <ItemImage item={item} key={item.id}/>
                ))}
            </AliceCarousel>
        </div>
    )
}

export default ImagesSlider
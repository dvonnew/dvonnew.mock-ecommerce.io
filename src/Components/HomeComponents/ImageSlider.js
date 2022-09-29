import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'
import ItemImage from "./ItemImage";


const ImagesSlider = () => {


    const [sliderItems, setSliderItems] = useState([])

    useEffect(() => {
        fetchItems()
    })

    const fetchItems = async () => {
        try {
            const data = await fetch("https://serene-chamber-57819.herokuapp.com/https://fakestoreapi.com/products")

            const itemsQuery = await data.json()


            itemsQuery.sort((function(a,b) { 
                return b.rating.rate - a.rating.rate
            }))
            setSliderItems(itemsQuery.slice(0,5))
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className='image-slider'>
            <AliceCarousel autoPlay auto autoPlayInterval="3000" infinite={true}>
                {sliderItems.map(item=> (
                    <ItemImage item={item} key={item.id}/>
                ))}
            </AliceCarousel>
        </div>
    )
}

export default ImagesSlider
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'
import { ProgressPlugin } from "webpack";
import ItemImage from "./ItemImage";


const ImagesSlider = (props) => {


    const { items } = props

    useEffect(() => {
        grabSliderItems()
    }, [])

    const [sliderItems, setItems] = useState([])

    const grabSliderItems = () => {
        
        items.sort(function (a,b) {
            return a.rating.rate - b.rating.rate
        })
        setItems(items.slice(0,5))
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
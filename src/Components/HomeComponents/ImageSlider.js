import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'
import ItemImage from "./ItemImage";


const ImagesSlider = (props) => {


    const { items } = props
    const [sliderItems, setSliderItems] = useState([])

    useEffect(()=> {
        sortSliderItems()
    }, [])

    const sortSliderItems = () => {
        let dummyList = [...items]

        dummyList.sort((function(a,b) { 
            return b.rating.rate - a.rating.rate
        }))
        setSliderItems(dummyList.slice(0,5))
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
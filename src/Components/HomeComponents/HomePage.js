import React, { useEffect } from "react";
import ImagesSlider from "./ImageSlider";

const Home = (props) => {

    const { sliderItems } = props

    // useEffect(() => {
    //     props.fetchItems()
    // }, [])

    return (
        <div className='home'>
            <ImagesSlider sliderItems={sliderItems} />
        </div>
    )
}

export default Home
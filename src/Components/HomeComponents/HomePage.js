import React from "react";
import ImagesSlider from "./ImageSlider";

const Home = (props) => {

    const { items } = props

    return (
        <div className='home'>
            <ImagesSlider items={items} />
        </div>
    )
}

export default Home
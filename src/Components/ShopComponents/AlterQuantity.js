import React from "react";

const AlterQuantity = (props) => {

    const { quantity } = props

    const onChange = (e) => {
        e.preventDefault()
        props.onQuantityChange(parseInt(e.target.value))
    }

    return(
        <div className='buy-box'>
                <label>Quantity: </label>
                <input type='number' defaultValue={quantity} onChange={onChange}/>
        </div>
    )
}

export default AlterQuantity
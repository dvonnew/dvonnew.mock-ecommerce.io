import React, { useState } from "react";

const AlterCartQuantity = (props) => {

    const { quantity } = props
    const [style, setStyle] = useState({display: 'none'})
    const [value, setValue] = useState(quantity)

    const onChange = (e) => {
        e.preventDefault()
        setStyle({display: 'block'})
        setValue(e.target.value)
    }

    const onSave = (e) => {
        e.preventDefault()
        props.onQuantityChange(value)
        setStyle({display: 'none'})
    }

    return(
        <div className='buy-box'>
                <label>Quantity: </label>
                <input type='number' defaultValue={quantity} onChange={onChange}/>
                <button className='save-btn' style={style} onClick={onSave}>Save</button>
        </div>
    )
}

export default AlterCartQuantity
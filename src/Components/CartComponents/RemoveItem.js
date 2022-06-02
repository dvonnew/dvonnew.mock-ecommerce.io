import React from "react";

const Remove = (props) => {

    return(
        <div className='remove'>
            <button className='remove-button' onClick={props.deleteItem}>Remove Item</button>
        </div>
    )
}

export default Remove
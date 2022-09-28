import React from "react";
import ItemDisplay from "./ItemDisplay";

const Shop = (props) => {

    const {items} = props

    return (
        <div className='shop'>
            <h1>Shop</h1>
            <div className="item-list">
                {items.map(item => (
                    <ItemDisplay item={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default Shop
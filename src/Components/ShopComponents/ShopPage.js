import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay";

const Shop = () => {

    useEffect(() => {
        fetchItems()
    }, [])

    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const data = await fetch("https://fakestoreapi.com/products")

        const items = await data.json()
        setItems(items)
    }

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
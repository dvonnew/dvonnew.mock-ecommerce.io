import React from "react";

const OrderDisplay = (props) => {

    const { order } = props

    return(
        <>
            <div className="order-card">
                <div className="order-display">
                    <h3>Order Number: {order.id}</h3>
                    <p>Order Total: {order.total}</p>
                    <ul>
                        {order.cart.map(item => {
                            <li>{item.item}</li>
                        })}
                    </ul>
                    <p>{order.shipToAddress}</p>
                </div>
            </div>
        </>
    )
}

export default OrderDisplay
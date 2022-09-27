import React, { useState, useEffect } from "react";
import { getOrders } from "../../Firebase/firebaseOrder";
import OrderDisplay from "./OrderDisplay";


const Orders = (props) => {

    const { user } = props
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(!user) return
        getUserOrders()
        
    }, [user])

    const getUserOrders = async () => {
        let ordersQuery = await getOrders(user.uid)
        setOrders(ordersQuery)
    }

    if (!orders || orders.length === 0) {
        return (
            <>
                <div className="order-history">
                    <h3>Order History:</h3>
                    <h5>You have no recent orders</h5>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="order-history">
                    <h3>Order History:</h3>
                    {orders.map(order => (
                        <OrderDisplay order={order} key={order.id} />
                    ))}
                </div>
            </>
        )
    }
}

export default Orders
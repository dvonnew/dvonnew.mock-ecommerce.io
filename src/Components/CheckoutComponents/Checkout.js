import React, { useState, useEffect } from "react";
import CheckoutAddressForm from "./CheckoutAddressForm";
import { saveUserAddress, getUserAddress,  } from "../../../Firebase/firebaseAddress";
import { getPrimaryPayment } from "../../Firebase/firebasePayment";

const CheckoutPage = (props) => {

    const { user, cart } = props

    const [paymentInfo, setPaymentInfo] = useState([])
    const [addressInfo, setAddressInfo ] = useState([])

    useEffect(() => {
        if(!user) return
        getUserInfo()
    }, [user])

    const getUserInfo = async () => {
        const payments = await getPrimaryPayment(user.uid)
        const addresses = await getUserAddress(user.uid)

        setAddressInfo(addresses)
        setPaymentInfo(payments)
    }

    const totalCart = () => {
        
        let total = 0

        cart.forEach(item => {
            total += item.total
        });

        return total.toFixed(2)
    }

    let total = totalCart()

    return (
        <>
            <div className='checkout-display'>
                <h3>Total: ${total}</h3>
                <div className="shipping-address">
                    <h4>Shipping Address</h4>
                    <CheckoutAddressForm addresses={addressInfo} />
                </div>
                <div className="billing-info">
                    <h4>Billing Information</h4>
                </div>
                <div className='billing-address'>
                    <h4>Billing Address</h4>
                    <CheckoutAddressForm addresses={addressInfo} />
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        </>
    )
}

export default CheckoutPage
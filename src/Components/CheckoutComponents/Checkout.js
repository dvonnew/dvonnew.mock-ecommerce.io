import React, { useState, useEffect } from "react";
import CheckoutAddressForm from "./CheckoutAddressForm";
import BillingForm from "./BillingInfoForm";
import { getPrimaryAddress } from "../../Firebase/firebaseAddress";
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
        const payment = await getPrimaryPayment(user.uid)
        const address = await getPrimaryAddress(user.uid)

        setAddressInfo(address)
        setPaymentInfo(payment)
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
                <div className="checkout-address">
                    <h4>Shipping Address</h4>
                    <CheckoutAddressForm address={addressInfo}/>
                </div>
                <div className="billing-info">
                    <h4>Billing Information</h4>
                    <BillingForm paymentInfo={paymentInfo} />
                </div>
                <div className='checkout-address'>
                    <h4>Billing Address</h4>
                    <CheckoutAddressForm address={addressInfo} />
                </div>
                <button className="checkout-button" >Checkout</button>
            </div>
        </>
    )
}

export default CheckoutPage
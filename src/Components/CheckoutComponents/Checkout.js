import React from "react";
import CheckoutAddressForm from "./CheckoutAddressForm";
import { saveUserAddress, getUserAddress, deleteAddressFS } from "../../../Firebase/firebaseAddress";

const CheckoutPage = (props) => {

    const { user, cart } = props

    const totalCart = () => {
        
        let total = 0

        cart.forEach(item => {
            total += item.total
        });

        return total
    }

    let total = totalCart()

    return (
        <>
            <div className='checkout-display'>
                <h3>Total: ${total}</h3>
                <div className="shipping-address">
                    <h4>Shipping Address</h4>
                    <CheckoutAddressForm />
                </div>
                <div className="billing-info">
                    <h4>Billing Information</h4>
                </div>
                <div className='billing-address'>
                    <h4>Billing Address</h4>
                    <CheckoutAddressForm />
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        </>
    )
}

export default CheckoutPage
import React, { useState, useEffect } from "react";

const BillingForm = (props) =>{

    const { paymentInfo } = props
    
    if (paymentInfo.primary === false) {
        return (
            <div className="checkout-payment-form">
                <p>* indicated required items</p>
                <label>* Name on Card:</label>
                <input className="name-input" name='name' type='text' required onChange={props.handlePaymentChange} />
                <label>* Number:</label>
                <input className='number-input' name='number' type='text' required minLength={8} maxLength={19} onChange={props.handlePaymentChange} />
                <div className='exp'>
                    <label>*Expiration Date (Mon/Year):</label>
                    <input className='month-input' name='month' type='text' required minLength={1} maxLength={2} onChange={props.handlePaymentChange}/>
                    <input className='year-input' name='year' type='text' required minLength={4} maxLength={4} onChange={props.handlePaymentChange} />
                </div>
                <label>* CVV:</label>
                <input className='cvv-input' name='cvv' type='text' required minLength={3} maxLength={3} onChange={props.handlePaymentChange} />
                <label>* Zipcode:</label>
                <input className='zipcode-input' name='zipcode' type='text' required minLength={5} maxLength={5} onChange={props.handlePaymentChange} />
            </div>
        )
    } else {
        return (
            <div className='payment-card'>
                <div className='payment-display'>
                    <h3>{paymentInfo.name}</h3>
                    <p>{paymentInfo.number.slice(-4)}</p>
                    <p>{paymentInfo.cardType}</p>
                    <p>{paymentInfo.zipcode}</p>
                </div>
            </div>
        )
    }
}

export default BillingForm
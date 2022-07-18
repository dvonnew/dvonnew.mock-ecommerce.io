import React, { useState, useEffect } from 'react';
import PaymentForm from './PaymentInfoForm';

const PaymentInfo = (props) => {

    const { user } = props

    const [paymentInfo, setPaymentInfo] = useState([])
    const [formStyle, setFrom] = useState({display: 'none'})

    const onClick = () => {
        setFrom({display:'block'})
    }

    const onCancel = () => {
        setFrom({display:'none'})
    }

    const savePaymentInfo = (info) => {
        setPaymentInfo(info)
        setFrom({display:'none'})
    }


    if (!paymentInfo || paymentInfo.length === 0) {
        return (
            <>
                <div className='payment-info-box'>
                    <h3>Payment Information:</h3>
                    <div className='payment-info-display-box'>
                        <PaymentForm onCancel={onCancel} display={formStyle} save={savePaymentInfo}/>
                        <div className='add-payment-card'>
                            <button className='add-payment' onClick={onClick}>Add Payment Info</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return(
        <div className='payment-info-box'>
            <h3>Payment Information:</h3>
            <div className='payment-info-display-box'>
                <PaymentForm onCancel={onCancel} display={formStyle} save={savePaymentInfo}/>
                <div className='add-payment-card'>
                    <button className='add-payment' onClick={onClick}>Add Payment Info</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo
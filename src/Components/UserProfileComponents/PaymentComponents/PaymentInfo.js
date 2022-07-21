import React, { useState, useEffect } from 'react';
import PaymentForm from './PaymentInfoForm';
import PaymentDisplay from './PaymentDisplay';
import { saveUserPaymentInfo, getUserPaymentInfo, deletePaymentInfoFS } from '../../../Firebase/firebasePayment';

const PaymentInfo = (props) => {

    const { user } = props

    const [paymentInfo, setPaymentInfo] = useState([])
    const [formStyle, setFrom] = useState({display: 'none'})

    useEffect(() => {
        if(!user) return
        getPaymentInfo()
    }, [user])

    // useEffect(() => {
    //     getPaymentInfo()
    // }, [paymentInfo])

    const getPaymentInfo = async () => {
        const info = await getUserPaymentInfo(user.uid)
        setPaymentInfo(info)
    }

    const onClick = () => {
        setFrom({display:'block'})
    }

    const onCancel = () => {
        setFrom({display:'none'})
    }

    const savePaymentInfo = (info) => {
        let newPayment = [...paymentInfo, info]
        setPaymentInfo(newPayment)
        setFrom({display:'none'})
        saveUserPaymentInfo(user.uid, info)
    }

    const deleteCard = (paymentID) => {
        deletePaymentInfoFS(user.uid, paymentID)
    }

    if (!paymentInfo || paymentInfo.length === 0) {
        return (
            <>
                <div className='payment-info-box'>
                    <h3>Payment Information:</h3>
                    <div className='payment-info-display-box'>
                        <PaymentForm cancel={onCancel} display={formStyle} save={savePaymentInfo}/>
                        <div className='add-payment-card'>
                            <button className='add-payment' onClick={onClick}>Add Payment Info</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else{
        return(
            <div className='payment-info-box'>
                <h3>Payment Information:</h3>
                <div className='payment-info-display-box'>
                    <PaymentForm cancel={onCancel} display={formStyle} save={savePaymentInfo}/>
                    {paymentInfo.map(info => (
                        <PaymentDisplay payment={info} delete={deleteCard} key={info.id} />
                    ))}
                    <div className='add-payment-card'>
                        <button className='add-payment' onClick={onClick}>Add Payment Info</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentInfo
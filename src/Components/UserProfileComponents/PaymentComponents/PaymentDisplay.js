import React from "react";

const PaymentDisplay = (props) => {

    const { payment } = props

    let displayNumber = `****-${payment.number.slice(-4)}`

    const deletePayment = () => {
        props.delete(payment.id)
    }

    if(payment.name === ""){
        return(
            <></>
        )
    } if (payment.primary === true) {
        return(
            <>
                <div className='payment-card-primary'>
                    <div className='payment-display'>
                        <h3>{payment.name}</h3>
                        <p>{displayNumber}</p>
                        <p>{payment.cardType}</p>
                        <button onClick={deletePayment}>Delete</button>
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className='payment-card'>
                    <div className='payment-display'>
                        <h3>{payment.name}</h3>
                        <p>{displayNumber}</p>
                        <p>{payment.cardType}</p>
                        <button onClick={deletePayment}>Delete</button>
                    </div>
                </div>
            </>
        )
    }

}

export default PaymentDisplay
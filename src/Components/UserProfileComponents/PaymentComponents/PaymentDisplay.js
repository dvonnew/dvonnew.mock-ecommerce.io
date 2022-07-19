import React from "react";

const PaymentDisplay = (props) => {

    const { payment } = props

    let displayNumber = `****-${payment.number.slice(-4)}`

    if(payment.name === ""){
        return(
            <></>
        )
    } else {
        return(
            <>
                <div className='payment-card'>
                    <div className='payment-display'>
                        <h3>{payment.name}</h3>
                        <p>{displayNumber}</p>
                        <p>{payment.cardType}</p>
                    </div>
                </div>
            </>
        )
    }

}

export default PaymentDisplay
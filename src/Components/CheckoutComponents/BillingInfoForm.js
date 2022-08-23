import React, {useState, useEffect} from "react";

const BillingForm = (props) =>{

    const [displayNumber, setDisplayNumber] = useState(0)
    const { paymentInfo } = props
    

    if (!paymentInfo || paymentInfo.length === 0 ) {
        return (
            <form className="payment-form">
                <p>* indicated required items</p>
                <label>* Name on Card:</label>
                <input className="name-input" name='name' type='text' required />
                <label>* Number:</label>
                <input className='number-input' name='number' type='text' required minLength={8} maxLength={19}/>
                <div className='exp'>
                    <label>*Expiration Date (Mon/Year):</label>
                    <input className='month-input' name='month' type='text' required minLength={1} maxLength={2} />
                    <input className='year-input' name='year' type='text' required minLength={4} maxLength={4} />
                </div>
                <label>* CVV:</label>
                <input className='cvv-input' name='cvv' type='text' required minLength={3} maxLength={3} />
                <label>* Zipcode:</label>
                <input className='zipcode-input' name='zipcode' type='text' required minLength={5} maxLength={5} />
            </form>
        )
    } else {
        return (
            <div className='payment-card'>
                    <div className='payment-display'>
                        <h3>{paymentInfo[0].name}</h3>
                        <p>{paymentInfo[0].number.slice(-4)}</p>
                        <p>{paymentInfo[0].cardType}</p>
                        <p>{paymentInfo[0].zipcode}</p>
                    </div>
                </div>
        )
    }
}

export default BillingForm
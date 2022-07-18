import React, { useState } from "react";
import uniqid from 'uniqid';


const PaymentForm = (props) => {

    const { display, save } = props

    const initialState = {
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
        zipcode: "",
        cardType:"",
        id: uniqid()
    }

    const [info, setInfo] = useState(initialState)
    const masterCardRegex = {
        name: "Master Card",
        regex: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
    }
    const amexRegex = {
        name: "AMEX",
        regex: /^3[47][0-9]{13}$/
    }
    const visaRegex = {
        name:"Visa",
        regex: /^4[0-9]{12}(?:[0-9]{3})?$/
    }
    const discoverRegex = {
        name:"Discover", 
        regex: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
    }
    const exampleRegex = {
        name: "example",
        regex: /^[0-9]{16}/
    } 
    const regexChecks = [masterCardRegex, amexRegex, visaRegex, discoverRegex, exampleRegex, exampleRegex]

    const validateCardNumber = (cardNumber) => {
        regexChecks.forEach(type => {
            if(cardNumber.match(type.regex)){
                setInfo((prevState) => ({...prevState, cardType: type.name}))
            } else {
                return
            }
        })
        console.log(info.type)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setInfo((prevState) => ({...prevState, [name]:value}))
    }

    const onSave = (e) => {
        e.preventDefault()
        validateCardNumber(info.number)
        return
    }

    return (
        <>
            <form className="payment-form" style={display}>
                <label>Name:</label>
                <input className="name-input" onChange={handleChange} name='name' defaultValue={info.name} type='text' required='true' />
                <label>Card Number:</label>
                <input className="number-input" onChnage={handleChange} name="number" defaultValue={info.number} type='text' required='true' minLength={16}  maxLength={16}/>
                <div className='exp'>
                    <label>Expiration Date (Mon/Year):</label>
                    <input className='month-input' onChange={handleChange} name='month' defaultValue={info.month} type='text' required='true' minLength={1} maxLength={2} />
                    <input className='year-input' onChange={handleChange} name='year' defaultValue={info.year} type='text' required='true' minLength={4} maxLength={4} />
                </div>
                <label>CVV:</label>
                <input className='cvv-input' onChange={handleChange} name='cvv' defaultValue={info.cvv} type='text' required='true' minLength={3} maxLength={3} />
                <label>Zipcode:</label>
                <input className='zipcode-input' onChange={handleChange} name='zipcode' defaultValue={info.zipcode} type='text' required='true' minLength={5} maxLength={5} />
                <button className='payment-save-button' onClick={onSave}>Save</button>
                <button className='cancel-payment' onClick={props.onCancel}>Cancel</button>
            </form>
        </>
    )
}

export default PaymentForm
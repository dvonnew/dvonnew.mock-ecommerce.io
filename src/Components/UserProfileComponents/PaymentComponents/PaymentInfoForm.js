import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';


const PaymentForm = (props) => {

    const { display, save, cancel } = props
    const [isChecked, setisChecked] = useState(false)

    const initialState = {
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
        zipcode: "",
        cardType:"",
        id: uniqid(),
        primary: false
    }

    useEffect(() => {
        setInfo((prevState) => ({...prevState, 'primary': isChecked}))
    }, [isChecked])

    const [info, setInfo] = useState(initialState)

    useEffect(() => {
        validateCardNumber()
    }, [info.number])

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
        regex: /^[0-9]{8,19}/
    } 
    const regexChecks = [masterCardRegex, amexRegex, visaRegex, discoverRegex, exampleRegex, exampleRegex]
    
    const validateCardNumber = () => {
        if (info.number.length>7) {
            let cardObject = regexChecks.find( card => info.number.match(card.regex))
            setInfo((prevState) => ({...prevState, cardType: cardObject.name}))
        }
        else{
            return
        }
    }

    const validateFields = () => {
        let valid = true
        Object.values(info).forEach(val => {
            if (val === ''){
                valid = false
            }
        })
        return valid
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === 'primary'){
            return
        }
        setInfo((prevState) => ({...prevState, [name]:value}))
        validateCardNumber(info.number)
    }

    const handleClick = () => {
        setisChecked(!isChecked)
    }

    const onCancel = (e) => {
        e.preventDefault()
        cancel()
        setInfo(initialState)
        setisChecked(!isChecked)
    }

    const onSave = (e) => {
        e.preventDefault()
        if(validateFields()) {
            save(info)
            setInfo(initialState)
            setisChecked(!isChecked)
        } else {
            return
        }

    }

    return (
        <>
            <form className="payment-form" style={display}>
                <p>* indicated required items</p>
                <div>
                    <label>* Name on Card:</label>
                    <input className="name-input" onChange={handleChange} value={info.name} name='name' type='text' required />
                </div>
                <div>
                    <label>* Number:</label>
                    <input className='number-input' onChange={handleChange} name='number' value={info.number} type='text' required minLength={8} maxLength={19}/>
                </div>
                <div className='exp'>
                    <label>*Expiration Date (Mon/Year):</label>
                    <input className='month-input' onChange={handleChange} name='month' value={info.month} type='text' required minLength={1} maxLength={2} />
                    <input className='year-input' onChange={handleChange} name='year' value={info.year} type='text' required minLength={4} maxLength={4} />
                </div>
                <div>
                    <label>* CVV:</label>
                    <input className='cvv-input' onChange={handleChange} name='cvv' value={info.cvv} type='text' required minLength={3} maxLength={3} />
                    <label>* Zipcode:</label>
                <input className='zipcode-input' onChange={handleChange} name='zipcode' value={info.zipcode} type='text' required minLength={5} maxLength={5} />
                </div>
                <div>
                    <label>Primary Card?</label>
                    <input type='checkbox' checked={isChecked} onChange={handleClick} name='primary' />
                </div>
                <div>
                    <button className='payment-save-button' onClick={onSave} type='submit'>Save</button>
                    <button className='cancel-payment' onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default PaymentForm
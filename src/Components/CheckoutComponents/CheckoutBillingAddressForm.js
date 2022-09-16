import React, { useState, useEffect } from "react";

const CheckoutBillingAddressForm = (props) => {

    const { address } = props

    const [isChecked, setisChecked] = useState(false)
    const [useShipping, setUseShipping] = useState(false)

    useEffect(() => {
        if(isChecked===true){
            props.useShipping()
        }
    })

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "IA", "ID", "IL", "IN",  
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state} value={state}>{state}</option>
    })

    const handleClick = (e) => {
        setisChecked(!isChecked)
        setUseShipping(!useShipping)
    }

    if (useShipping === false ){
        return(
            <>
                <div className='checkout-address-form'>
                    <div className="billing-address-check">
                        <input type='checkbox' checked={isChecked} onChange={handleClick}/>
                        <p className="same-as-shipping-text">Same as Shipping Address</p>
                        
                    </div>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" name="name" defaultValue={address.name} required={true} onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>* Street Address: </label>
                    <input className="street-input" type="text" name="street" required onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>Apt #: </label>
                    <input className="apt-input" type='text' name="apt" onChange={props.handleAddressChange} />
                    <label>* City: </label>
                    <input className="city-input" type="text" name="city" required onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>* State:</label>
                    <select className="state-input" type="text" name="state" required onChange={props.handleAddressChange} onBlur={props.check}>{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input" type="text" name="zipcode" required minLength={5} maxLength={5} onChange={props.handleAddressChange} onBlur={props.check}/>
                </div>
            </>

        )
    } else {
        return(
            <>
                <div className='checkout-address-form'>
                    <div className="billing-address-check">
                        <input type='checkbox' checked={isChecked} onChange={handleClick} />
                        <p className="same-as-shipping-text">Same as Shipping Address</p>
                    </div>
                    <label>* Name: </label>
                    <input className="name-input" type="text" defaultValue={address.name} name="name" required onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>* Street Address: </label>
                    <input className="street-input" type="text" defaultValue={address.street} name="street" required onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>Apt #: </label>
                    <input className="apt-input" type='text' defaultValue={address.apt} name="apt" onChange={props.handleAddressChange}/>
                    <label>* City: </label>
                    <input className="city-input" type="text" defaultValue={address.city} name="city" required onChange={props.handleAddressChange} onBlur={props.check}/>
                    <label>* State:</label>
                    <select className="state-input" type="text" value={address.state} name="state" required onChange={props.handleAddressChange} onBlur={props.check}>{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input" type="text" defaultValue={address.zipcode} name="zipcode" required minLength={5} maxLength={5} onChange={props.handleAddressChange} onBlur={props.check}/>
                </div>
            </>
        )
    }
}

export default CheckoutBillingAddressForm 
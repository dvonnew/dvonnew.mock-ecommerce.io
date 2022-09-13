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

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
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
            <form className='address-form'>
                    <div className="billing-address-check">
                        <p>Same as Shipping Address</p>
                        <input type='checkbox' checked={isChecked} onChange={handleClick}/>
                    </div>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" required onChange={props.handleBillingAddressChange} />
                    <label>* Street: </label>
                    <input className="street-input" type="text" required onChange={props.handleBillingAddressChange} />
                    <label>Apt #: </label>
                    <input className="apt-inpt" type='text' onChange={props.handleBillingAddressChange} />
                    <label>* City: </label>
                    <input className="city-input" type="text" required onChange={props.handleBillingAddressChange} />
                    <label>* State:</label>
                    <select className="state-input" name="state" type="text" required="true" onChange={props.handleBillingAddressChange} >{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input"name="zipcode" type="text" required minLength={5} maxLength={5} onChange={props.handleBillingAddressChange} />
                </form>
        )
    } else {
        return(
            <form className='address-form'>
                    <div className="billing-address-check">
                        <p>Same as Shipping Address</p>
                        <input type='checkbox' checked={isChecked} onChange={handleClick}/>
                    </div>
                    <label>* Name: </label>
                    <input className="name-input" type="text" defaultValue={address.name} required />
                    <label>* Street: </label>
                    <input className="street-input" type="text" defaultValue={address.street} required />
                    <label>Apt #: </label>
                    <input className="apt-inpt" type='text' defaultValue={address.apt} />
                    <label>* City: </label>
                    <input className="city-input" type="text" defaultValue={address.city} required/>
                    <label>* State:</label>
                    <select className="state-input" name="state" type="text" value={address.state} required="true">{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input"name="zipcode" type="text" defaultValue={address.zipcode} required minLength={5} maxLength={5} />
                </form>
        )
    }
}

export default CheckoutBillingAddressForm 
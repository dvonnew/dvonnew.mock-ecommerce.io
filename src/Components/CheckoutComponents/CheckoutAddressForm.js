import React from "react";

const CheckoutAddressForm = (props) => {

    const { address } = props

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state} value={state}>{state}</option>
    })

    if (!address || address.length ===0 ){
        return(
            <form className='address-form'>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" required />
                    <label>* Street: </label>
                    <input className="street-input" type="text" required />
                    <label>Apt #: </label>
                    <input className="apt-inpt" type='text' />
                    <label>* City: </label>
                    <input className="city-input" type="text" required/>
                    <label>* State:</label>
                    <select className="state-input" name="state" type="text" required="true">{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input"name="zipcode" type="text" required minLength={5} maxLength={5} />
                </form>
        )
    } else {
        return(
            <form className='address-form'>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" defaultValue={address[0].name} required />
                    <label>* Street: </label>
                    <input className="street-input" type="text" defaultValue={address[0].street} required />
                    <label>Apt #: </label>
                    <input className="apt-inpt" type='text' defaultValue={address[0].apt} />
                    <label>* City: </label>
                    <input className="city-input" type="text" defaultValue={address[0].city} required/>
                    <label>* State:</label>
                    <select className="state-input" name="state" type="text" value={address[0].state} required="true">{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input"name="zipcode" type="text" defaultValue={address[0].zipcode} required minLength={5} maxLength={5} />
                </form>
        )
    }
}

export default CheckoutAddressForm 
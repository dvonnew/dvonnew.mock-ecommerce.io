import React from "react";
import AddressDisplay from "../UserProfileComponents/AddressComponents/AddressDisplay";
import { getPrimaryAddress } from "../../Firebase/firebaseAddress";

const CheckoutAddressForm = (props) => {

    const { addresses } = props

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state}>{state}</option>
    })

    if (!addresses || addresses.length ===0 ){
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
    } 
}

export default CheckoutAddressForm 
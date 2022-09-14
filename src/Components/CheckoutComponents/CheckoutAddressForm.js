import React from "react";

const CheckoutAddressForm = (props) => {

    const { address } = props

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state} value={state}>{state}</option>
    })
    

    if (address.primary === false){
        return(
            <>
                <div className='checkout-address-form'>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" name="name" required onChange={props.handleAddressChange} />
                    <label>* Street: </label>
                    <input className="street-input" type="text" name="street" required onChange={props.handleAddressChange} />
                    <label>Apt #: </label>
                    <input className="apt-input" type='text' name="apt" onChange={props.handleAddressChange} />
                    <label>* City: </label>
                    <input className="city-input" type="text" name="city" required onChange={props.handleAddressChange} />
                    <label>* State:</label>
                    <select className="state-input" type="text" name= "state" required="true" onChange={props.handleAddressChange} >{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input" type="text" name="zipcode" required minLength={5} maxLength={5} onChange={props.handleAddressChange} />
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className='checkout-address-form'>
                    <p>* indicates required items</p>
                    <label>* Name: </label>
                    <input className="name-input" type="text" defaultValue={address.name} name="name" required onChange={props.handleAddressChange}/>
                    <label>* Street: </label>
                    <input className="street-input" type="text" defaultValue={address.street} name="street" required onChange={props.handleAddressChange}/>
                    <label>Apt #: </label>
                    <input className="apt-input" type='text' name="apt" defaultValue={address.apt} onChange={props.handleAddressChange}/>
                    <label>* City: </label>
                    <input className="city-input" type="text" defaultValue={address.city} name="city" required onChange={props.handleAddressChange}/>
                    <label>* State:</label>
                    <select className="state-input"  type="text" value={address.state} name="state" required="true" onChange={props.handleAddressChange}>{stateOptions}</select>
                    <label>* Zipcode:</label>
                    <input className="zipcode-input" type="text" defaultValue={address.zipcode} name="zipcode "required minLength={5} maxLength={5} onChange={props.handleAddressChange}/>
                </div>
            </>
        )
    }
}

export default CheckoutAddressForm 
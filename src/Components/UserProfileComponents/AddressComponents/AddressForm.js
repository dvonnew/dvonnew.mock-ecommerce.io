import React, { useState } from "react";
import uniqid from 'uniqid'

const AddressForm = (props) => {

    const { address, display, save } = props

    const initialState = {
        street: "",
        apt: "",
        city: "",
        state: "",
        zipcode: "",
        id: uniqid()
    }

    const [info, setInfo] = useState(initialState)

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state}>{state}</option>
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setInfo((prevState) => ({...prevState, [name]: value}))
    }

    const onSave = (e) => {
        e.preventDefault()
        save(info)
    }

    return(
        <>
            <form className='address-form' style={display}>
                <label>Street: </label>
                <input className="street-input" onChange={handleChange} name="street" defaultValue={address.street} type="text" required="true" />
                <label>Apt #: </label>
                <input className="apt-inpt" onChange={handleChange} name="apt" defaultValue={address.apt} type='text' />
                <label>City: </label>
                <input className="city-input" onChange={handleChange} name="city" defaultValue={address.city} type="text" />
                <label>State:</label>
                <select className="state-input" onChange={handleChange} name="state" type="text" >{stateOptions}</select>
                <label>Zipcode:</label>
                <input className="zipcode-input" onChange={handleChange} name="zipcode" defaultValue={address.state} type="text" />
                <button className='addres-save-button' onClick={onSave}>Save</button>
            </form>
        </>
    )
}

export default AddressForm 
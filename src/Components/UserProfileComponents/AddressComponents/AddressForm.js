import React, { useState } from "react";
import uniqid from 'uniqid'

const AddressForm = (props) => {

    const { display, save } = props

    const initialState = {
        name: "",
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
        if (Object.is(initialState, info)){
            return
        } else {
            save(info)
        }
    }

    return(
        <>
            <form className='address-form' style={display}>
                <label>Name: </label>
                <input className="name-input" onChange={handleChange} name="name" value={info.name} type="text" required />
                <label>Street: </label>
                <input className="street-input" onChange={handleChange} name="street" value={info.street} type="text" required />
                <label>Apt #: </label>
                <input className="apt-inpt" onChange={handleChange} name="apt" value={info.apt} type='text' />
                <label>City: </label>
                <input className="city-input" onChange={handleChange} name="city" value={info.city} type="text" required/>
                <label>State:</label>
                <select className="state-input" onChange={handleChange} name="state" type="text" required="true">{stateOptions}</select>
                <label>Zipcode:</label>
                <input className="zipcode-input" onChange={handleChange} name="zipcode" value={info.zipcode} type="text" required minLength={5} maxLength={5} />
                <button className='addres-save-button' onClick={onSave} type='submit'>Save</button>
                <button className='cancel-address' onClick={props.onCancel}>Cancel</button>
            </form>
        </>
    )
}

export default AddressForm 
import React, { useState, useEffect } from "react";
import uniqid from 'uniqid'

const AddressForm = (props) => {

    const { display, save, onCancel } = props
    const [isChecked, setisChecked] = useState(false)

    const initialState = {
        name: "",
        street: "",
        apt: "",
        city: "",
        state: "",
        zipcode: "",
        id: uniqid(),
        primary: false
    }

    useEffect(() => {
        setInfo((prevState) => ({...prevState, 'primary': isChecked}))
    }, [isChecked])

    const [info, setInfo] = useState(initialState)

    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NV", "NY",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY" ]

    const stateOptions = states.map(state => {
        return <option key={state} value={state}>{state}</option>
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === 'primary'){
            return
        }
        setInfo((prevState) => ({...prevState, [name]: value}))
        
    }

    const handleClick = () => {
        setisChecked(!isChecked)
    }
    
    const cancel = (e) => {
        e.preventDefault()
        onCancel()
        setInfo(initialState)
        setisChecked(false)
    }

    const onSave = (e) => {
        e.preventDefault()
        if (Object.is(initialState, info)){
            return
        } else {
            save(info)
            setInfo(initialState)
            setisChecked(false)
        }
    }

    return(
        <>
            <form className='address-form' style={display}>
                <p>* indicates required items</p>
                <label>* Name: </label>
                <input className="name-input" onChange={handleChange} name="name" value={info.name} type="text" required />
                <label>* Street: </label>
                <input className="street-input" onChange={handleChange} name="street" value={info.street} type="text" required />
                <label>Apt #: </label>
                <input className="apt-inpt" onChange={handleChange} name="apt" value={info.apt} type='text' />
                <label>* City: </label>
                <input className="city-input" onChange={handleChange} name="city" value={info.city} type="text" required/>
                <label>* State:</label>
                <select className="state-input" onChange={handleChange} name="state" type="text" required="true">{stateOptions}</select>
                <label>* Zipcode:</label>
                <input className="zipcode-input" onChange={handleChange} name="zipcode" value={info.zipcode} type="text" required minLength={5} maxLength={5} />
                <label>Primary Address?</label>
                <input type='checkbox' checked={isChecked} name='primary' onChange={handleClick} />
                <button className='addres-save-button' onClick={onSave} type='submit'>Save</button>
                <button className='cancel-address' onClick={cancel}>Cancel</button>
            </form>
        </>
    )
}

export default AddressForm 
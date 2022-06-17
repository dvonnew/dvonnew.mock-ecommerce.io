import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import AddressDisplay from "./AddressDisplay";
import { saveUserAddress, getUserAddress } from "../../../Firebase/firebaseAddress";


const Address = (props) => {

    const { user } = props

    const [address, setAddress] = useState({})
    const [formStyle, setForm] = useState({display: "none"})
    const [displayStyle, setDisplay] = useState({display: "block"})

    useEffect(() => {
        if(!user) return
        getAddress()
    }, [user])

    const getAddress = async () =>{
        const addressInfo = await getUserAddress(user.uid)
        setAddress(addressInfo)
    }

    const onClick = () => {
        setForm({display: "block"})
        setDisplay({display: "none"})
    }

    const saveAddress = (addressInfo) => {
        setAddress(addressInfo)
        setForm({display: "none"})
        setDisplay({display: "block"})
        saveUserAddress(user.uid, addressInfo)
    }

    return(
        <div className="address-box">
            <h3>Address:</h3>
            <AddressForm address={address} display={formStyle} save={saveAddress}/>
            <AddressDisplay address={address} display={displayStyle}/>
            <button className='add-item' onClick={onClick}>Add Address</button>
        </div>
    )
}

export default Address
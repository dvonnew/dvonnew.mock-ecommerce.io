import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import AddressDisplay from "./AddressDisplay";
import { saveUserAddress, getUserAddress, deleteAddressFS } from "../../../Firebase/firebaseAddress";

const Address = (props) => {

    const { user } = props

    const [address, setAddress] = useState([])
    const [formStyle, setForm] = useState({display: "none"})

    useEffect(() => {
        if(!user) return
        getAddress()
    }, [user])

    useEffect(()=>{
        getAddress()
    }, [address])

    const getAddress = async () =>{
        const addressInfo = await getUserAddress(user.uid)
        setAddress(addressInfo)
    }

    const onClick = () => {
        setForm({display: "block"})
    }

    const onCancel = () => {
        setForm({display: "none"})
    }

    const saveAddress = (addressInfo) => {
        setForm({display: "none"})
        saveUserAddress(user.uid, addressInfo)
        getAddress()
    }

    const deleteAddress = (addressID) => {
        deleteAddressFS(user.uid, addressID)
    }

    if (!address || address.length===0) {
        return(
            <div className="address-box">
                <h3>Address:</h3>
                    <div className="address-display-box">
                    <AddressForm onCancel={onCancel}  display={formStyle} save={saveAddress}/>
                    <div className='add-address-card'>
                        <button className='add-address' onClick={onClick}>Add Address</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="address-box">
                <h3>Address:</h3>
                    <div className="address-display-box">
                    <AddressForm onCancel={onCancel} display={formStyle} save={saveAddress}/>
                    {address.map(location => (
                        <AddressDisplay address={location} delete={deleteAddress} key={location.id}/>
                    ))}
                    <div className='add-address-card'>
                        <button className='add-address' onClick={onClick}>Add Address</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address
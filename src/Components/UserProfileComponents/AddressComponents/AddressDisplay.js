import React from 'react'

const AddressDisplay = (props) => {
    
    const { address } = props

    const deleteAddress = () =>{
        props.delete(address.id)
    }
    
    if(address.street === ""){
        return(
            <></>
        )
    } else {
        return(
            <>
                <div className='address-card'>
                    <div className='address-display'>
                        <p>{address.name}</p>
                        <p>{address.street} {address.apt}</p>
                        <p>{address.city}, {address.state} {address.zipcode}</p>
                        <button onClick={deleteAddress}>Delete</button>
                    </div>
                </div>
            </>
        )
    }
}

export default AddressDisplay
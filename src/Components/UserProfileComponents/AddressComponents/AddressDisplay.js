import React from 'react'

const AddressDisplay = (props) => {
    
    const { address, display } = props
    
    if(address.street === ""){
        return(
            <></>
        )
    } else {
        return(
            <>
                <div className='address-display' style={display}>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipcode}</p>
                    <button>Edit</button>
                </div>
            </>
        )
    }
}

export default AddressDisplay
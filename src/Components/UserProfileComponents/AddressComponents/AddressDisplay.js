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
    } if (address.primary === true){
        return(
            <>
                <div className='address-card-primary'>
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
    else {
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
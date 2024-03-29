import React from "react";
import Address from "./AddressComponents/Address";
import PaymentInfo from "./PaymentComponents/PaymentInfo";

const Profile = (props) => {

    const { user } = props

    if (!user){
        return (
            <>
                <h4>No User Signed-in</h4>
            </>
        )
    } else {
        return (
            <>
                <div className="user-info-box">
                    <img className='user-img' src={user.photoURL} alt={user.displayName} />
                    <div className='user-personal-info'>
                        <h3>{user.displayName}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
                <Address user={user}/>
                <PaymentInfo user={user}/>
            </>
        )
    }
}

export default Profile
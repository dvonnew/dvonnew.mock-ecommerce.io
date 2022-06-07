import React, { useState } from "react";
import { isUserSignedIn } from '../../firebase'

const DropDown = (props) => {

    const [login, setLogin] = useState({display:'block'})
    const [logout, setLogout] = useState({display:'none'})
    const [style, setStyle] = useState({display:'none'})

    const handleHover = (e) => {
        setStyle({display: 'block',})
    }

    const handleOut = (e) => {
        setStyle({display: 'none'})
    }

    const onLogin = () => {
        props.signIn()
        if (isUserSignedIn()) {
            setLogin({display: 'none'})
            setLogout({display: 'block'})
            console.log('logged in')
        } else{
            return
        }
    }

    const onLogout = () => {
        props.signOut()
        setLogout({display: 'none'})
        setLogin({display: 'block'})
    }

    return (
        <>
            <div className='dropdown' onMouseOver={handleHover} >
                <p className='dropdown' onMouseOver={handleHover}>Account</p>
                <ul style={style} className='dropdown-content' onMouseOut={handleOut}>
                    <li>Profile</li>
                    <li>Orders</li>
                    <button className="log-button" style={login} onClick={onLogin}>Login</button>
                    <button className="log-button" style={logout} onClick={onLogout}>Logout</button>
                </ul>
            </div>
        </>
    )
}

export default DropDown
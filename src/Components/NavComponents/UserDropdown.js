import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const DropDown = (props) => {

    const { user } = props
    const [login, setLogin] = useState({display:'block'})
    const [logout, setLogout] = useState({display:'none'})
    const [profileImage, setProfileImage] = useState({display:'none'})
    const [style, setStyle] = useState({display:'none'})

    const linkStyle = {
        color: 'black',
        textDecoration: 'none'
    }
    
    useEffect(() => {
        onLoad()
    }, [user])

    const handleHover = (e) => {
        setStyle({display: 'flex',})
    }

    const handleOut = (e) => {
        setStyle({display: 'none'})
    }

    const onLoad = () =>{
        if (!user) {
            return
        } else{
            setLogin({display: 'none'})
            setLogout({display: 'block'})
        } 
    }

    const onLogin = () => {
        props.signIn()
        setLogin({display: 'none'})
        setLogout({display: 'block'})
        console.log('----logged in----')
    }

    const onLogout = () => {
        props.signOut()
        setLogout({display: 'none'})
        setLogin({display: 'block'})
        console.log('----logged out----')
    }

  
    return (
        <>
            <div className='dropdown' onMouseOver={handleHover} onMouseOut={handleOut}>
                <li className='dropdown'>Account</li>
                <div className='dropdown-container' style={style} onMouseOut={handleOut}>
                    <ul className='dropdown-content' >
                        <Link style={linkStyle} to='/profile'>
                            <li style={logout}>Profile</li>
                        </Link>
                        <Link style={linkStyle} to='/orders'>
                            <li style={logout}>Orders</li>
                        </Link>
                        <button className="log-button" style={login} onClick={onLogin}>Login</button>
                        <button className="log-button" style={logout} onClick={onLogout}>Logout</button>
                    </ul>
                </div>
            </div>
        </>
    )

}

export default DropDown
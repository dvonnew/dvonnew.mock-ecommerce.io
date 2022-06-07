import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from './UserDropdown'

const Nav = (props) => {
    
    const navStyle = {
        color: 'white'
    }

    return(
        <nav>
            <h1>Online Store</h1>
            <ul className='nav-links'>
                <Link style={navStyle} to='/home'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/shop'>
                    <li>Shop</li>
                </Link>
                <Link style={navStyle} to='/cart'>
                    <li>Cart</li>
                </Link>
                <li>
                    <DropDown signIn={props.signIn} signOut={props.signOut}/>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
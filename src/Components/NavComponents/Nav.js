import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from './UserDropdown'

const Nav = (props) => {
    
    const { user } = props
    const navStyle = {
        color: 'white'
    }

    return(
        <nav>
            <h1>Online Store</h1>
            <ul className='nav-links'>
                <Link style={navStyle} to='/'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/shop'>
                    <li>Shop</li>
                </Link>
                <Link style={navStyle} to='/cart'>
                    <li>Cart</li>
                </Link>
                <li>
                    <DropDown signIn={props.signIn} signOut={props.signOut} user={user}/>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
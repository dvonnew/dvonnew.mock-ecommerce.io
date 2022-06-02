import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

const Nav = () => {
    
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
            </ul>
        </nav>
    )
}

export default Nav
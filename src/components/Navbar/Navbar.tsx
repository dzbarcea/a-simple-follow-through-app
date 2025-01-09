import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <a
                className='nav-link nav-link-left'
                href='/learn'
            >
                Learn About IB
            </a>
            <a href='/'>
                <img className='logo' src={'/actify-logo-horizontal.svg'} alt='Actify Logo'/>
            </a>
            <a
                className='nav-link nav-link-right'
                href='https://ko-fi.com/dzbarcea'
                target='_blank'
            >
                Buy me a coffee
            </a>
        </div>
    );
}

export default Navbar;
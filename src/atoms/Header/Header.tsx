import React from 'react';
import './Header.css';
import NavButton from '../NavButton/NavButton';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = (props: HeaderProps) => {
    return (
        <div className='section-header'>
            <h1>{props.title}</h1>
            <div className='nav-container'>
                <NavButton type='back' status='disabled' to={null}/>
                <NavButton type='next' status='disabled' to={'/predict'}/>
            </div>
        </div>
    );
}

export default Header;
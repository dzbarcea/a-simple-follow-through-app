import React, {useState} from 'react';
import './Header.css';
import NavButton from '../../atoms/NavButton/NavButton';

interface HeaderProps {
    title: string;
    subtitle: string;
    hasSelection: boolean;
}

const Header = ({ title, subtitle, hasSelection }: HeaderProps) => {
    return (
        <div className='section-header'>
            <h1>{title}</h1>
            <div className='nav-container'>
                <NavButton type='back' status='disabled'/>
                <NavButton type='next' status={hasSelection ? 'active' : 'disabled'}/>
            </div>
        </div>
    );
}

export default Header;
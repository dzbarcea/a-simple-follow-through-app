import React from 'react';
import './Header.css';
import NavButton from '../../atoms/NavButton/NavButton';

interface HeaderProps {
    title: string;
    subtitle: string;
    sectionComplete: boolean;
    hasNavigation?: boolean;
}

const Header = ({ title, subtitle, sectionComplete, hasNavigation=true }: HeaderProps) => {
    return (
        <div className='section-header'>
            <h1>{title}</h1>
            {hasNavigation && (
                <div className='nav-container'>
                    <NavButton type='back' status='disabled'/>
                    <NavButton type='next' status={sectionComplete ? 'active' : 'disabled'}/>
                </div>
            )}
        </div>
    );
}

export default Header;
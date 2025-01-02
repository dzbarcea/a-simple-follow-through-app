import React, {ReactNode} from 'react';
import './Header.css';
import NavButton from '../../atoms/NavButton/NavButton';
import Tooltip from '../../atoms/Tooltip/Tooltip';

interface HeaderProps {
    title: string;
    subtitle: string;
    sectionComplete: boolean;
    hasNavigation?: boolean;
    tooltipText?: ReactNode;
}

const Header = ({ title, subtitle, sectionComplete, hasNavigation=true, tooltipText }: HeaderProps) => {
    return (
        <div className='section-header'>
            <div className='title-container'>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <h1>{title}</h1>
                    {tooltipText && <Tooltip text={tooltipText} />}
                </div>
                <p className='faded-text'>{subtitle}</p>
            </div>
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
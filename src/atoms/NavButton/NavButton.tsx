import React from 'react';
import './NavButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

interface NavButtonProps {
    type: 'back' | 'next';
    status: 'active' | 'disabled';
    to: string | null;
}

const NavButton = ({type, status, to}: NavButtonProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (to && status === 'active') {
            navigate(to);
        }
    }

    return (
        <div className={`nav-button-${status}`} onClick={handleNavigate}>
            <FontAwesomeIcon
                icon={type === 'back' ? faArrowUp : faArrowDown}
                style={{color: status === 'active' ? 'var(--text-main)' : 'var(--text-faded)'}}
            />
        </div>
    );
}

export default NavButton;
import React from 'react';
import './NavButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useNavContext} from '../../context/NavContext';

interface NavButtonProps {
    type: 'back' | 'next';
    status: 'active' | 'disabled';
}

const NavButton = ({ type, status }: NavButtonProps) => {
    const navigate = useNavigate();
    const navContext = useNavContext();
    const trueStatus = (
        // Back buttons should always be active if a previous path exists
        type === 'back' && navContext?.prevPath ?
            'active' :
            status
    );

    const handleNavigate = () => {
        if (type === 'back' && navContext?.prevPath) {
            navigate(navContext.prevPath);
        } else if (type === 'next' && status === 'active' && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    return (
        <div
            className={`nav-button-${trueStatus}`}
            onClick={handleNavigate}
        >
            <FontAwesomeIcon
                icon={type === 'back' ? faArrowUp : faArrowDown}
                style={{color: trueStatus === 'active' ? 'var(--text-main)' : 'var(--text-faded)'}}
            />
        </div>
    );
}

export default NavButton;
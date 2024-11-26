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

    const handleNavigate = () => {
        if (type === 'back' && navContext?.prevPath) {
            navigate(navContext.prevPath);
        } else if (type === 'next' && status === 'active' && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    return (
        <div
            className={
                // Back button should always be active if a previous path exists
                type === 'back' && navContext?.prevPath ?
                    `nav-button-active` :
                    `nav-button-${status}`
            }
            onClick={handleNavigate}
        >
            <FontAwesomeIcon
                icon={type === 'back' ? faArrowUp : faArrowDown}
                style={{color: status === 'active' ? 'var(--text-main)' : 'var(--text-faded)'}}
            />
        </div>
    );
}

export default NavButton;
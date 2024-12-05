import React from 'react';
import './Button.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    text: string;
    status: 'active' | 'disabled';
    onClick: () => void;
}

const ProceedButton = ({ text, status, onClick }: ButtonProps) => {
    return (
        <button type='button' className={`button button-${status}`} onClick={onClick}>
            {text}
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
    );
}

export default ProceedButton;
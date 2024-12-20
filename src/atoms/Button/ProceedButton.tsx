import React from 'react';
import './Button.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    text: string;
    status: 'active' | 'disabled';
    onClick: () => void;
    hasIcon?: boolean;
}

const ProceedButton = ({ text, status, onClick, hasIcon=true }: ButtonProps) => {
    return (
        <button type='button' className={`button button-${status}`} onClick={onClick}>
            {text}
            {hasIcon && <FontAwesomeIcon icon={faArrowDown} />}
        </button>
    );
}

export default ProceedButton;
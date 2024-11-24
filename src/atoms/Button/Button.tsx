import React from 'react';
import './Button.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    text: string;
    status: 'active' | 'disabled';
}

const Button = ({ text, status }: ButtonProps) => {
    return (
        <button className={`button button-${status}`}>
            {text}
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
    );
}

export default Button;
import React from 'react';
import './Select.css';

interface SelectProps {
    children?: React.ReactNode;
}

const Select = ({ children }: SelectProps) => {
    return (
        <button className='select'>
            {children}
        </button>
    );
}

export default Select;
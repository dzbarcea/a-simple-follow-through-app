import React from 'react';
import './ActivitySelector.css';
import Select from '../../atoms/Select/Select';

interface ActivitySelectorProps {
    
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    return (
        <div className='activity-selector'>
            <Select>Hello</Select>
            <Select>Hello</Select>
            <Select>Hello</Select>
        </div>
    );
}

export default ActivitySelector;
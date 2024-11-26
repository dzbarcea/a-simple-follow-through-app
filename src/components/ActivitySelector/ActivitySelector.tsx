import React from 'react';
import './ActivitySelector.css';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    return (
        <form className='activity-selector' onChange={props.onChange}>
            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 1</span>
            </label>

            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 2</span>
            </label>

            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 3</span>
            </label>
        </form>
    );
}

export default ActivitySelector;
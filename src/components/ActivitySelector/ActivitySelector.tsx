import React from 'react';
import './ActivitySelector.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    return (
        <form className='activity-selector' onChange={props.onChange}>
            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 1</span>
                <button className='edit-button'>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            </label>

            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 2</span>
                <button className='edit-button'>
                    <FontAwesomeIcon icon={faPencil}/>
                </button>
            </label>

            <label className='selection'>
                <input type='radio' name='activity'/>
                <span>Activity 3</span>
                <button className='edit-button'>
                    <FontAwesomeIcon icon={faPencil}/>
                </button>
            </label>
        </form>
    );
}

export default ActivitySelector;
import React, {MouseEventHandler, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

interface SelectionProps {
    idKey: string | null;
    handleOpenModal: MouseEventHandler<HTMLButtonElement>;
    handleDelete: (keyToDelete: string | null) => void;
}

const Selection = ({ idKey, handleDelete, handleOpenModal }: SelectionProps) => {
    const selectionRef = useRef<HTMLLabelElement>(null);

    return (
        <label ref={selectionRef} className='selection'>
            <input type='radio' name='activity'/>
            <span>New Activity</span>

            <div>
                <button type='button' className='round-button' onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faPencil}/>
                </button>
                <button type='button' className='round-button' onClick={() => handleDelete(idKey)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </label>
    );
}

export default Selection;
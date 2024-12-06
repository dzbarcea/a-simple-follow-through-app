import React, {useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {useFormContext} from '../../context/FormContext';

interface SelectionProps {
    name: string;
    idKey: string;
    handleOpenModal: (name: string, id: string) => void;
    handleDelete: (idToDelete: string) => void;
}

const Selection = ({ name, idKey, handleDelete, handleOpenModal }: SelectionProps) => {
    const formContext = useFormContext();
    const selectionRef = useRef<HTMLLabelElement>(null);

    const handleClick = () => {
        if (!formContext) {
            return;
        }

        formContext.setChosenSelectionId(idKey);
    }

    return (
        <label ref={selectionRef} className='selection' onClick={handleClick}>
            <input type='radio' name='activity' defaultChecked={formContext?.chosenSelectionId === idKey}/>
            <span>{name}</span>

            <div>
                <button type='button' className='round-button' onClick={() => handleOpenModal(name, idKey)}>
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
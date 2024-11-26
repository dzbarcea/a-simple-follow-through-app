import React, {ChangeEventHandler, MouseEventHandler, useRef, useState} from 'react';
import './ActivitySelector.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import Modal from '../../atoms/Modal/Modal';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlyEditingSpan, setCurrentlyEditingSpan] = useState<Element | null>();
    const [inputHasChanged, setInputHasChanged] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (event) => {
        const target = event.currentTarget;

        setCurrentlyEditingSpan(target.previousElementSibling);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSave: MouseEventHandler<HTMLButtonElement> = (event) => {
        const textInput = textInputRef.current?.value;

        if (textInput !== undefined && currentlyEditingSpan) {
            currentlyEditingSpan.textContent = textInput;
        }

        handleCloseModal();
    }
    
    return (
        <>
            <form className='activity-selector' onChange={props.onChange}>
                <label className='selection'>
                    <input type='radio' name='activity'/>
                    <span>Activity 1</span>
                    <button type='button' className='edit-button' onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPencil}/>
                    </button>
                </label>

                <label className='selection'>
                    <input type='radio' name='activity'/>
                    <span>Activity 2</span>
                    <button type='button' className='edit-button' onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPencil}/>
                    </button>
                </label>

                <label className='selection'>
                    <input type='radio' name='activity'/>
                    <span>Activity 3</span>
                    <button type='button' className='edit-button' onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPencil}/>
                    </button>
                </label>
            </form>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <p>Edit name</p>
                <input
                    type='text'
                    ref={textInputRef}
                    defaultValue={ currentlyEditingSpan?.textContent ?? '' }
                />
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ActivitySelector;
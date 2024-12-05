import React, {KeyboardEventHandler, MouseEventHandler, useRef, useState} from 'react';
import './ActivitySelector.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import Modal from '../../atoms/Modal/Modal';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlyEditingSpan, setCurrentlyEditingSpan] = useState<Element | null>();
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (event) => {
        const target = event.currentTarget;

        setCurrentlyEditingSpan(target.previousElementSibling);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSave = () => {
        const textInput = textInputRef.current?.value;

        if (textInput !== undefined && currentlyEditingSpan) {
            currentlyEditingSpan.textContent = textInput;
        }

        handleCloseModal();
    }

    const handleEnterKeyPressed: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        // step 1: get the label the event came from
        const target = event.currentTarget.parentElement?.parentElement;

        // step 2: remove it from the DOM
        if(target) {
            target.remove();
        }
    }

    return (
        <>
            <form className='activity-selector' onChange={props.onChange}>
                <label className='selection'>
                    <input type='radio' name='activity'/>
                    <span>Activity 1</span>

                    <div>
                        <button type='button' className='round-button' onClick={handleOpenModal}>
                            <FontAwesomeIcon icon={faPencil}/>
                        </button>
                        <button type='button' className='round-button' onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </label>

                <label className='selection'>
                    <input type='radio' name='activity'/>
                    <span>Activity 2</span>
                    <div>
                        <button type='button' className='round-button' onClick={handleOpenModal}>
                            <FontAwesomeIcon icon={faPencil}/>
                        </button>
                        <button type='button' className='round-button' onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </label>
            </form>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <p>Edit name</p>
                <input
                    type='text'
                    ref={textInputRef}
                    defaultValue={currentlyEditingSpan?.textContent ?? ''}
                    onKeyDown={handleEnterKeyPressed}
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
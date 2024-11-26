import React, {useState} from 'react';
import './ActivitySelector.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import Modal from '../../atoms/Modal/Modal';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                <input type='text'/>
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseModal}>
                        Cancel
                    </button>
                    <button type='button' className='modal-button button-primary'>
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ActivitySelector;
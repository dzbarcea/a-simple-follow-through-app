import React from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children } : ModalProps) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close-button' onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
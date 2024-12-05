import React, {
    KeyboardEventHandler,
    MouseEventHandler,
    useEffect,
    useRef,
    useState
} from 'react';
import './ActivitySelector.css';
import Modal from '../../atoms/Modal/Modal';
import Selection from './Selection';
import {SelectionType, useFormContext} from '../../context/FormContext';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlyEditingSelection, setCurrentlyEditingSelection] = useState<SelectionType | null>(null);
    const [canAddMoreSelections, setCanAddMoreSelections] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const formContext = useFormContext();

    const MAX_SELECTIONS = 5;

    useEffect(() => {
        if (!formContext) {
            return;
        }

        if (formContext.selectionList.length >= MAX_SELECTIONS) {
            setCanAddMoreSelections(false);
        } else {
            setCanAddMoreSelections(true);
        }
    }, [formContext]);

    const handleOpenModal = (name: string, id: string) => {
        setCurrentlyEditingSelection({ name: name, id: id });
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSave = () => {
        const textInput = textInputRef.current?.value;

        if (textInput !== undefined && currentlyEditingSelection?.name !== '') {
            formContext?.setSelectionList(selectionList => selectionList.map((selection) => {
                if (selection.id === currentlyEditingSelection?.id) {
                    return { name: textInput, id: currentlyEditingSelection.id };
                }
                return selection;
            }));
        }

        handleCloseModal();
    }

    const handleEnterKeyPressed: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    }

    const handleDelete = (keyToDelete: string | null) => {
        // setSelectionList(selectionList => selectionList.filter((item) => {
        //     return item.key !== keyToDelete;
        // }));
    }

    const handleAddSelection: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        // const form = formRef.current;
        // if (form) {
        //     const newKey = uuidv4();
        //     const elementToAdd = (
        //         <Selection key={newKey} idKey={newKey} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
        //     );
        //
        //     // setSelectionList(selectionList => [...selectionList, elementToAdd]);
        // }
    }

    return (
        <>
            <form className='activity-selector' ref={formRef} onChange={props.onChange}>
                {
                    formContext &&
                    formContext.selectionList.map(selection => {
                        return <Selection
                            name={selection.name}
                            key={selection.id}
                            idKey={selection.id}
                            handleOpenModal={handleOpenModal}
                            handleDelete={handleDelete}
                        />
                    })
                }

                <button className={`add-button ${!canAddMoreSelections && 'disabled'}`} onClick={
                    canAddMoreSelections ? handleAddSelection : (event) => event.preventDefault()
                }>
                    +
                </button>
            </form>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <p>Edit name</p>
                <input
                    type='text'
                    ref={textInputRef}
                    defaultValue={currentlyEditingSelection?.name ?? ''}
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
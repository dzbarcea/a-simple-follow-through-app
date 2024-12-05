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
import {PresetType, SelectionType, useFormContext} from '../../context/FormContext';
import {v4 as uuidv4} from 'uuid';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    // Handles modal state for editing selections
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentlyEditingSelection, setCurrentlyEditingSelection] = useState<SelectionType | null>(null);
    const editTextInputRef = useRef<HTMLInputElement>(null);

    // Handles modal state for saving presets
    const [isSavePresetModalOpen, setIsSavePresetModalOpen] = useState(false);
    const [currentlyEditingPreset, setCurrentlyEditingPreset] = useState<PresetType | null>(null);
    const namePresetTextInputRef = useRef<HTMLInputElement>(null);

    // Other state
    const [canAddMoreSelections, setCanAddMoreSelections] = useState(false);
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

    const handleOpenEditModal = (name: string, id: string) => {
        setCurrentlyEditingSelection({ name: name, id: id });
        setIsEditModalOpen(true);
    }

    const handleCloseEditModal = () => {
        setCurrentlyEditingSelection(null);
        setIsEditModalOpen(false);
    }

    const handleSaveEdit = () => {
        const textInput = editTextInputRef.current?.value;

        if (textInput !== undefined && currentlyEditingSelection?.name !== '') {
            formContext?.setSelectionList(selectionList => selectionList.map((selection) => {
                if (selection.id === currentlyEditingSelection?.id) {
                    return { name: textInput, id: currentlyEditingSelection.id };
                }
                return selection;
            }));
        }

        handleCloseEditModal();
    }

    const handleEnterKeyPressed: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        if (isEditModalOpen) {
            handleSaveEdit();
        }
    }

    const handleDelete = (idToDelete: string) => {
        if (!formContext) {
            return;
        }

        formContext.setSelectionList(selectionList => selectionList.filter((selection) => {
            return selection.id !== idToDelete;
        }));
    }

    const handleAddSelection: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!formContext) {
            return;
        }

        formContext.setSelectionList(selectionList => [...selectionList, { name: 'New Activity', id: uuidv4() }])
    }

    const handleOpenSavePresetModal = () => {

        if (!formContext) {
            return;
        }

        const newPreset: PresetType = {
            name: '',
            selectionList: formContext.selectionList,
        }
        setCurrentlyEditingPreset(newPreset);
        setIsSavePresetModalOpen(true);
    }

    const handleCloseSavePresetModal = () => {
        setCurrentlyEditingPreset(null);
        setIsSavePresetModalOpen(false);
    }

    const handleSavePreset = () => {

        if (!formContext) {
            return;
        }

        const textInput = namePresetTextInputRef.current?.value;
        if (!textInput) {
            return;
        }

        const newPreset = {
            name: textInput,
            selectionList: formContext.selectionList,
        }
        formContext.setPresetList(presets => [...presets, newPreset]);

        handleCloseSavePresetModal();
    }

    return (
        <>
            <form className='activity-selector' onChange={props.onChange}>
                {
                    formContext &&
                    formContext.selectionList.map(selection => {
                        return <Selection
                            name={selection.name}
                            key={selection.id}
                            idKey={selection.id}
                            handleOpenModal={handleOpenEditModal}
                            handleDelete={handleDelete}
                        />
                    })
                }

                <button type='button' className={`add-button ${!canAddMoreSelections && 'disabled'}`} onClick={
                    canAddMoreSelections ? handleAddSelection : (event) => event.preventDefault()
                }>
                    +
                </button>
                <div className='preset-container'>
                    <button type='button' className='preset-button' onClick={handleOpenSavePresetModal}>
                        Save Preset
                    </button>
                    <button type='button' className='preset-button'>
                        Load Preset
                    </button>
                </div>
            </form>

            <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                <p>Edit name</p>
                <input
                    type='text'
                    ref={editTextInputRef}
                    defaultValue={currentlyEditingSelection?.name ?? ''}
                    onKeyDown={handleEnterKeyPressed}
                />
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseEditModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleSaveEdit}>
                        Save
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isSavePresetModalOpen} onClose={handleCloseSavePresetModal}>
                <p>Name your preset</p>
                <input
                    type='text'
                    ref={namePresetTextInputRef}
                    defaultValue={currentlyEditingSelection?.name ?? ''}
                    onKeyDown={handleEnterKeyPressed}
                />
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseSavePresetModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleSavePreset}>
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ActivitySelector;
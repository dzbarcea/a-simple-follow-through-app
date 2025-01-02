import React, {
    KeyboardEventHandler,
    MouseEventHandler,
    useEffect,
    useRef,
    useState
} from 'react';
import './ActionSelector.css';
import Modal from '../../atoms/Modal/Modal';
import Selection from './Selection';
import {PresetType, SelectionType, useFormContext} from '../../context/FormContext';
import {v4 as uuidv4} from 'uuid';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const ActionSelector = () => {
    // Handles modal state for editing selections
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentlyEditingSelection, setCurrentlyEditingSelection] = useState<SelectionType | null>(null);
    const editTextInputRef = useRef<HTMLInputElement>(null);

    // Handles modal state for saving presets
    const [isSavePresetModalOpen, setIsSavePresetModalOpen] = useState(false);
    const namePresetTextInputRef = useRef<HTMLInputElement>(null);

    // Handles modal state for loading preset
    const [isLoadPresetModalOpen, setIsLoadPresetModalOpen] = useState(false);
    const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

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

    const handleEnterKeyPressedEditModal: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        if (isEditModalOpen) {
            handleSaveEdit();
        }
    }
    const handleEnterKeyPressedSavePresetModal: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        if (isSavePresetModalOpen) {
            handleSavePreset();
        }
    }

    const handleDeleteSelection = (idToDelete: string) => {
        if (!formContext) {
            return;
        }

        if (formContext.chosenSelectionId === idToDelete) {
            formContext.setChosenSelectionId('');
        }

        formContext.setSelectionList(selectionList => selectionList.filter((selection) => {
            return selection.id !== idToDelete;
        }));
    }

    const handleAddSelection: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!formContext) {
            return;
        }

        formContext.setSelectionList(selectionList => [...selectionList, { name: 'New Action', id: uuidv4() }])
    }

    const handleOpenSavePresetModal = () => {

        if (!formContext) {
            return;
        }

        const newPreset: PresetType = {
            name: '',
            id: uuidv4(),
            selectionList: formContext.selectionList,
        }
        setIsSavePresetModalOpen(true);
    }

    const handleCloseSavePresetModal = () => {
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
            id: uuidv4(),
            selectionList: formContext.selectionList,
        }
        formContext.setPresetList(presets => [...presets, newPreset]);

        handleCloseSavePresetModal();
    }

    const handleOpenLoadPresetModal = () => {
        setIsLoadPresetModalOpen(true);
    }
    const handleCloseLoadPresetModal = () => {
        setIsLoadPresetModalOpen(false);
    }
    const handleLoadPreset = () => {
        if (!formContext) {
            return;
        }

        if (!selectedPresetId) {
            return;
        }

        const presetToLoad = formContext.presetList.filter((preset) => (preset.id === selectedPresetId));
        formContext.setSelectionList(presetToLoad[0].selectionList);

        handleCloseLoadPresetModal();
    }
    const handleDeletePreset = (id: string) => {
        if (!formContext) {
            return;
        }

        if (selectedPresetId === id) {
            setSelectedPresetId(null);
        }

        formContext.setPresetList(presetList => presetList.filter((preset) => (preset.id !== id)));
    }

    return (
        <>
            <form className='action-selector'>
                {
                    formContext &&
                    formContext.selectionList.map(selection => {
                        return <Selection
                            name={selection.name}
                            key={selection.id}
                            idKey={selection.id}
                            handleOpenModal={handleOpenEditModal}
                            handleDelete={handleDeleteSelection}
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
                    <button type='button' className='preset-button' onClick={handleOpenLoadPresetModal}>
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
                    onKeyDown={handleEnterKeyPressedEditModal}
                />
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseEditModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleSaveEdit}>
                        Confirm
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isSavePresetModalOpen} onClose={handleCloseSavePresetModal}>
                <p>Name your preset</p>
                <input
                    type='text'
                    ref={namePresetTextInputRef}
                    onKeyDown={handleEnterKeyPressedSavePresetModal}
                />
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseSavePresetModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleSavePreset}>
                        Confirm
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isLoadPresetModalOpen} onClose={handleCloseLoadPresetModal}>
                <p>Load preset</p>
                <ul className='load-preset-container'>
                    {formContext?.presetList && formContext.presetList.length > 0
                        ? formContext.presetList.map(preset => (
                            <li key={preset.id}>
                                <label className='preset-option'>
                                    <input
                                        type='radio'
                                        name='preset'
                                        onChange={() => setSelectedPresetId(preset.id)}
                                    />
                                    <span>{preset.name}</span>

                                    <button type='button' className='round-button' onClick={() => handleDeletePreset(preset.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </label>
                            </li>
                        ))
                        : <li>You currently have no presets.</li>
                    }
                </ul>
                <div className='button-container'>
                    <button type='button' className='modal-button button-secondary' onClick={handleCloseLoadPresetModal}>
                        Cancel
                    </button>
                    <button type='button' className={`modal-button button-primary`} onClick={handleLoadPreset}>
                        Confirm
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ActionSelector;
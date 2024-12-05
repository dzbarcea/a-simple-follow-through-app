import React, {
    KeyboardEventHandler,
    MouseEventHandler,
    ReactElement,
    useEffect,
    useRef,
    useState
} from 'react';
import './ActivitySelector.css';
import Modal from '../../atoms/Modal/Modal';
import Selection from './Selection';
import { v4 as uuidv4 } from 'uuid';

interface ActivitySelectorProps {
    onChange: () => void;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlyEditingSpan, setCurrentlyEditingSpan] = useState<Element | null>();
    const [selectionList, setSelectionList] = useState<ReactElement[]>([]);
    const [canAddMoreSelections, setCanAddMoreSelections] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const MAX_SELECTIONS = 5;

    useEffect(() => {
        // Load initial selections
        let selections: ReactElement[] = [];

        // TODO: load from context
        for (let i = 0; i < 2; i++) {
            const newKey = uuidv4();
            selections.push(
                <Selection key={newKey} idKey={newKey} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            );
        }

        setSelectionList(selections);
    }, []);

    useEffect(() => {
        if (selectionList.length >= MAX_SELECTIONS) {
            setCanAddMoreSelections(false);
        } else {
            setCanAddMoreSelections(true);
        }
    }, [selectionList]);

    const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (event) => {
        const target = event.currentTarget;

        setCurrentlyEditingSpan(target.parentElement?.previousElementSibling);
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

    const handleDelete = (keyToDelete: string | null) => {
        setSelectionList(selectionList => selectionList.filter((item) => {
            return item.key !== keyToDelete;
        }));
    }

    const handleAddSelection: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const form = formRef.current;
        if (form) {
            const newKey = uuidv4();
            const elementToAdd = (
                <Selection key={newKey} idKey={newKey} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            );

            setSelectionList(selectionList => [...selectionList, elementToAdd]);
        }
    }

    return (
        <>
            <form className='activity-selector' ref={formRef} onChange={props.onChange}>
                {selectionList}

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
import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
    SetStateAction,
    Dispatch
} from 'react';
import {v4 as uuidv4} from 'uuid';

export interface SelectionType {
    name: string;
    id: string;
}

export interface PresetType {
    name: string;
    id: string;
    selectionList: SelectionType[];
}

export interface FormContextType {
    // Values
    selectionList: SelectionType[];
    chosenSelectionId: string;
    predictionText: string;
    reflectionText?: string;
    presetList: PresetType[];

    // Setters
    setSelectionList: Dispatch<SetStateAction<SelectionType[]>>
    setChosenSelectionId: (id: string) => void;
    setPredictionText: (predictionText: string) => void;
    setReflectionText: (reflectionText: string) => void;
    setPresetList: Dispatch<SetStateAction<PresetType[]>>

    // Submission form
    submitForm: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => useContext(FormContext);

const useLocalStorage = (field: string, defaultValue: any) => {
    try {
        const initialValue = localStorage.getItem(field);
        return initialValue ? JSON.parse(initialValue) : defaultValue;
    } catch (error) {
        console.error(error);
        return defaultValue;
    }
}

const FormContextProvider = ({ children } : { children: ReactNode }) => {
    const [selectionList, setSelectionList] = useState<SelectionType[]>(useLocalStorage('selectionList', []));
    const [chosenSelectionId, setChosenSelectionId] = useState(useLocalStorage('chosenSelectionId', ''));
    const [predictionText, setPredictionText] = useState<string>(useLocalStorage('predictionText', ''));
    const [reflectionText, setReflectionText] = useState<string>(useLocalStorage('reflectionText', ''));
    const [presetList, setPresetList] = useState<PresetType[]>(useLocalStorage('presetList', []));

    useEffect(() => {
        //TODO: fetch initial state from local storage
        let selections = [
            {
                name: 'Activity 1',
                id: uuidv4()
            },
            {
                name: 'Activity 2',
                id: uuidv4()
            },
        ];
        let presets = [];

        const localStorageSelections = localStorage.getItem('selectionList');
        if (localStorageSelections) {
            selections = JSON.parse(localStorageSelections);
        }

        const localStoragePresets = localStorage.getItem('presetList');
        if (localStoragePresets) {
            presets = JSON.parse(localStoragePresets);
        }

        setSelectionList(selections);
        setPresetList(presets);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectionList', JSON.stringify(selectionList));
    }, [selectionList]);

    useEffect(() => {
        console.log('hi')
        localStorage.setItem('chosenSelectionId', JSON.stringify(chosenSelectionId));
    }, [chosenSelectionId]);

    useEffect(() => {
        localStorage.setItem('presetList', JSON.stringify(presetList));
    }, [presetList]);

    useEffect(() => {
        localStorage.setItem('predictionText', JSON.stringify(predictionText));
    }, [predictionText]);

    useEffect(() => {
        localStorage.setItem('reflectionText', JSON.stringify(reflectionText));
    }, [reflectionText]);

    const submitForm = () => {

        // TODO: add form data to local storage and view it later

        // Clear local storage for predictions and reflections
        setPredictionText('');
        setReflectionText('');
        setChosenSelectionId('');
        localStorage.setItem('predictionText', '');
        localStorage.setItem('reflectionText', '');
        localStorage.setItem('chosenSelectionId', '');
    }

    return (
        <FormContext.Provider value={{
            selectionList: selectionList,
            setSelectionList: setSelectionList,
            chosenSelectionId: chosenSelectionId,
            setChosenSelectionId: setChosenSelectionId,
            predictionText: predictionText,
            setPredictionText: setPredictionText,
            reflectionText: reflectionText,
            setReflectionText: setReflectionText,
            presetList: presetList,
            setPresetList: setPresetList,
            submitForm: submitForm
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;

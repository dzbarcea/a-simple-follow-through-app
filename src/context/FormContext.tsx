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
    predictionText: string;
    reflectionText?: string;
    presetList: PresetType[];

    // Setters
    setSelectionList: Dispatch<SetStateAction<SelectionType[]>>
    setPredictionText: (predictionText: string) => void;
    setReflectionText: (reflectionText: string) => void;
    setPresetList: Dispatch<SetStateAction<PresetType[]>>
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => useContext(FormContext);

const FormContextProvider = ({ children } : { children: ReactNode }) => {
    const [selectionList, setSelectionList] = useState<SelectionType[]>(() => {
        try {
            const initialSelections = localStorage.getItem('selectionList');
            return initialSelections ? JSON.parse(initialSelections) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });
    const [predictionText, setPredictionText] = useState<string>(() => {
        try {
            const initialPrediction = localStorage.getItem('predictionText');
            return initialPrediction ? JSON.parse(initialPrediction) : '';
        } catch (error) {
            console.error(error);
            return '';
        }
    });
    const [reflectionText, setReflectionText] = useState<string>(() => {
        try {
            const initialReflection = localStorage.getItem('predictionText');
            return initialReflection ? JSON.parse(initialReflection) : '';
        } catch (error) {
            console.error(error);
            return '';
        }
    });
    const [presetList, setPresetList] = useState<PresetType[]>(() => {
        try {
            const initialPresets = localStorage.getItem('presetList');
            return initialPresets ? JSON.parse(initialPresets) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });

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
        localStorage.setItem('presetList', JSON.stringify(presetList));
    }, [presetList]);

    useEffect(() => {
        localStorage.setItem('predictionText', JSON.stringify(predictionText));
    }, [predictionText]);

    useEffect(() => {
        localStorage.setItem('reflectionText', JSON.stringify(reflectionText));
    }, [reflectionText]);

    return (
        <FormContext.Provider value={{
            selectionList: selectionList,
            setSelectionList: setSelectionList,
            predictionText: predictionText,
            setPredictionText: setPredictionText,
            reflectionText: reflectionText,
            setReflectionText: setReflectionText,
            presetList: presetList,
            setPresetList: setPresetList,
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;

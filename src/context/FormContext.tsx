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
    const [selectionList, setSelectionList] = useState<SelectionType[]>([]);
    const [predictionText, setPredictionText] = useState('');
    const [reflectionText, setReflectionText] = useState('');
    const [presetList, setPresetList] = useState<PresetType[]>([]);

    useEffect(() => {
        //TODO: fetch initial state from local storage

        const selections = [
            {
                name: 'Activity 1',
                id: uuidv4()
            },
            {
                name: 'Activity 2',
                id: uuidv4()
            },
        ];

        setSelectionList(selections);
    }, []);

    useEffect(() => {
        // console.log(selectionList);
        // console.log(presetList);
    }, [selectionList, presetList]);

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

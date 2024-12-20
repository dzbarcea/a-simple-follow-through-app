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

export interface SessionData {
    date: string;
    id: string;
    selectionList: SelectionType[];
    chosenSelectionName: string;
    predictionText: string;
    reflectionText: string;
}

export interface FormContextType {
    // Values
    selectionList: SelectionType[];
    chosenSelectionId: string;
    predictionText: string;
    reflectionText?: string;
    presetList: PresetType[];
    pastSessions: SessionData[]; // Stores all past sessions

    // Setters
    setSelectionList: Dispatch<SetStateAction<SelectionType[]>>
    setChosenSelectionId: (id: string) => void;
    setPredictionText: (predictionText: string) => void;
    setReflectionText: (reflectionText: string) => void;
    setPresetList: Dispatch<SetStateAction<PresetType[]>>
    setPastSessions: Dispatch<SetStateAction<SessionData[]>>;

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
    const [selectionList, setSelectionList] = useState<SelectionType[]>(useLocalStorage('selectionList', [
        {
            name: 'Example Activity',
            id: uuidv4()
        },
        {
            name: 'Example Activity 2',
            id: uuidv4()
        },
    ]));
    const [chosenSelectionId, setChosenSelectionId] = useState(useLocalStorage('chosenSelectionId', ''));
    const [predictionText, setPredictionText] = useState<string>(useLocalStorage('predictionText', ''));
    const [reflectionText, setReflectionText] = useState<string>(useLocalStorage('reflectionText', ''));
    const [presetList, setPresetList] = useState<PresetType[]>(useLocalStorage('presetList', []));
    const [pastSessions, setPastSessions] = useState<SessionData[]>(useLocalStorage('pastSessions', []));

    useEffect(() => {
        localStorage.setItem('selectionList', JSON.stringify(selectionList));
    }, [selectionList]);

    useEffect(() => {
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

    useEffect(() => {
        localStorage.setItem('pastSessions', JSON.stringify(pastSessions));
    }, [pastSessions]);

    const submitForm = () => {

        // Gather the session data
        const currentDate = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        let selectedActivity = '';
        for (const selection of selectionList) {
            if (selection.id === chosenSelectionId) {
                selectedActivity = selection.name;
            }
        }

        const sessionData: SessionData = {
            date: currentDate,
            id: uuidv4(),
            selectionList: selectionList,
            chosenSelectionName: selectedActivity,
            predictionText: predictionText,
            reflectionText: reflectionText,
        }

        // Add past sessions to local storage for future viewing
        setPastSessions(pastSessions => [...pastSessions, sessionData]);
        localStorage.setItem('pastSessions', JSON.stringify(pastSessions));

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
            pastSessions: pastSessions,
            setPastSessions: setPastSessions,
            submitForm: submitForm
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;

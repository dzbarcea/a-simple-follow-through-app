import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import ProceedButton from '../atoms/Button/ProceedButton';
import ActivitySelector from '../components/ActivitySelector/ActivitySelector';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';
import {useFormContext} from '../context/FormContext';


const PickActivity = () => {
    const formContext = useFormContext();

    const [hasSelection, setHasSelection] = useState(false);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(formContext?.chosenSelectionId && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    useEffect(() => {
        if (formContext?.chosenSelectionId) {
            setHasSelection(true);
        } else {
            setHasSelection(false);
        }
    }, [formContext?.chosenSelectionId]);

    return (
        <>
            <Header title='Pick an activity.' subtitle='Some subtitle' sectionComplete={hasSelection}/>

            <ActivitySelector/>

            <div className='flex-column-container'>
                <ProceedButton text='Predict' status={formContext?.chosenSelectionId ? 'active' : 'disabled'}
                               onClick={navigateToNextPage}/>

                <a href='/past-sessions'>View past sessions</a>
            </div>

        </>
    );
}

export default PickActivity;
import React, {useState} from 'react';
import Header from '../components/Header/Header';
import ProceedButton from '../atoms/Button/ProceedButton';
import ActivitySelector from '../components/ActivitySelector/ActivitySelector';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';


const PickActivity = () => {
    const [hasSelection, setHasSelection] = useState(false);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(hasSelection && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    // TODO: use useEffect with empty dependency array to submit the form when unmounted

    return (
        <>
            <Header title='Pick an activity.' subtitle='Some subtitle' sectionComplete={hasSelection}/>

            <ActivitySelector onChange={() => setHasSelection(true)}/>

            <ProceedButton text='Predict' status={hasSelection ? 'active' : 'disabled'} onClick={navigateToNextPage} />
        </>
    );
}

export default PickActivity;
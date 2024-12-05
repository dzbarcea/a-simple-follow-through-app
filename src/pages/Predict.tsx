import React, {useState} from 'react';
import Header from '../components/Header/Header';
import TextArea from '../components/TextArea/TextArea';
import ProceedButton from '../atoms/Button/ProceedButton';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';


const Predict = () => {
    const [isSectionComplete, setIsSectionComplete] = useState(false);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(isSectionComplete && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    // TODO: onChange handler

    return (
        <>
            <Header title='Make a prediction.' subtitle='Some subtitle' sectionComplete={isSectionComplete}/>
            
            <TextArea placeholder='Type a prediction for the outcome of the activity you chose.' setIsSectionComplete={setIsSectionComplete}/>

            <ProceedButton text='Reflect' status={isSectionComplete ? 'active' : 'disabled'} onClick={navigateToNextPage} />
        </>
    );
}

export default Predict;
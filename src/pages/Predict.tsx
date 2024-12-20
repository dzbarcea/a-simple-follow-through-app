import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import TextArea from '../components/TextArea/TextArea';
import ProceedButton from '../atoms/Button/ProceedButton';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';
import {useFormContext} from '../context/FormContext';


const Predict = () => {
    const formContext = useFormContext();

    const [isSectionComplete, setIsSectionComplete] = useState(() =>
        formContext?.predictionText !== undefined && formContext?.predictionText !== null
    );
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(isSectionComplete && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    useEffect(() => {
        if (formContext?.predictionText && formContext.predictionText.length > 0) {
            setIsSectionComplete(true);
        } else {
            setIsSectionComplete(false);
        }
    }, [formContext?.predictionText]);

    return (
        <>
            <Header title='Make a prediction.' subtitle='Some subtitle' sectionComplete={isSectionComplete}/>
            
            <TextArea
                placeholder='Type a prediction for the outcome of the activity you chose.'
                defaultValue={formContext?.predictionText}
                setDefaultValue={formContext?.setPredictionText}
            />

            <div className='flex-column-container'>
                <ProceedButton text='Reflect' status={formContext?.predictionText ? 'active' : 'disabled'} onClick={navigateToNextPage} />
                <a href='/past-sessions'>View past sessions</a>
            </div>

        </>
    );
}

export default Predict;
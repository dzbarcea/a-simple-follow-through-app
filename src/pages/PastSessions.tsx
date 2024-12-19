import React from 'react';
import {useFormContext} from '../context/FormContext';
import Header from '../components/Header/Header';
import {useNavigate} from 'react-router-dom';

interface PastSessionsProps {

}

const PastSessions = (props: PastSessionsProps) => {
    const formContext = useFormContext();
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        if (!formContext?.chosenSelectionId || !formContext.predictionText) {
            console.log('Go home!');
            navigate('/');
        } else {
            navigate(-1); // Go back one page
        }
    }

    return (
        <>
            <a onClick={handleBackNavigation}>
                Go Back
            </a>

            <Header
                title='Your past sessions'
                subtitle={`These are the activities you've done so far`}
                sectionComplete={true}
                hasNavigation={false}
            />


        </>
    );
}

export default PastSessions;
import React from 'react';
import {useFormContext} from '../context/FormContext';
import Header from '../components/Header/Header';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

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
            <button type='button' className='back-button' onClick={handleBackNavigation}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Go Back
            </button>

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
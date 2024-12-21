import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {useNavigate} from 'react-router-dom';
import {SessionData, useFormContext} from '../../context/FormContext';
import Header from '../../components/Header/Header';
import ProceedButton from '../../atoms/Button/ProceedButton';
import './Session.css';

const Session = () => {
    const [sessionData, setSessionData] = useState<SessionData | undefined>();

    const sessionId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const formContext = useFormContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (formContext) {
            const session = formContext.pastSessions.find(
                (value) => value.id === sessionId
            );
            setSessionData(session);
        }
    }, [formContext]);

    const handleBackNavigation = () => {
        navigate('/past-sessions');
    }

    return (
        <>
            <button type='button' className='back-button' onClick={handleBackNavigation}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                Back to sessions
            </button>

            <Header
                title={sessionData?.chosenSelectionName ?? ''}
                subtitle={sessionData?.date ?? ''}
                sectionComplete={true}
                hasNavigation={false}
            />

            <div className='flex-column-container-grow'>
                <div className='session-field-display'>
                    <h2>You chose <span style={{color: 'var(--primary-light)'}}>{sessionData?.chosenSelectionName}</span> from the following options:</h2>
                    <p className='faded-text horizontal-list'>
                        {sessionData?.selectionList.map(selection => (
                            <span key={selection.id}>{selection.name}</span>
                        ))}
                    </p>
                </div>
                <div className='session-field-display'>
                    <h2>Here was your prediction:</h2>
                    <p className='faded-text'>{sessionData?.predictionText}</p>
                </div>
                <div className='session-field-display'>
                    <h2>This was your reflection:</h2>
                    <p className='faded-text'>{sessionData?.reflectionText}</p>
                </div>
            </div>

            <ProceedButton
                text='Go back'
                status='active'
                onClick={() => navigate('/past-sessions')}
                hasIcon={false}
            />
        </>
    );
}

export default Session;
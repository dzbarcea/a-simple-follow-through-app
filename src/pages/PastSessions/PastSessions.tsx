import React from 'react';
import {SessionData, useFormContext} from '../../context/FormContext';
import Header from '../../components/Header/Header';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import ProceedButton from '../../atoms/Button/ProceedButton';
import './PastSessions.css';

interface PastSessionsProps {

}

const PastSessions = (props: PastSessionsProps) => {
    const formContext = useFormContext();
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        if (!formContext?.chosenSelectionId) {
            navigate('/');
        } else if (!formContext.predictionText) {
            navigate('/predict')
        }
        else {
            navigate(-1); // Go back one page
        }
    }

    type GroupedSessions = Record<string, SessionData[]>
    const groupSessionsByDate = () => {
        if (!formContext?.pastSessions) {
            return;
        }

        return formContext.pastSessions.reduce((groups: GroupedSessions, session) => {
            const date = session.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(session);
            return groups;
        }, {} as GroupedSessions);
    }

    const renderPastSessionsByDate = () => {
        if (!formContext?.pastSessions) {
            return <></>;
        }

        const groupedSessions = groupSessionsByDate();
        if (!groupedSessions) {
            return <></>;
        }

        let pastSessions = [];
        for (const date in groupedSessions) {
            pastSessions.push(
                <div className='past-sessions-section' key={date}>
                    <h3>{date}</h3>
                    {groupedSessions[date].map(session => (
                        <button
                            type='button'
                            className='selection'
                            key={session.id}
                        >
                            {session.chosenSelectionName}
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    ))}
                </div>
            );
        }

        return pastSessions;
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

            <div className='past-sessions-container'>
                {renderPastSessionsByDate()}
            </div>

            <ProceedButton text='Start a session' status='active' onClick={() => navigate('/')} />
        </>
    );
}

export default PastSessions;
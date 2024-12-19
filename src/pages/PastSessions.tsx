import React from 'react';
import {SessionData, useFormContext} from '../context/FormContext';

interface PastSessionsProps {

}

const PastSessions = (props: PastSessionsProps) => {
    const formContext = useFormContext();

    return (
        <div>
            {formContext?.pastSessions.map((session: SessionData) => (
                <p>{`${session.date} - ${session.chosenSelectionName}`}</p>
            ))}
        </div>
    );
}

export default PastSessions;
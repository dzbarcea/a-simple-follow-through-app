import React from 'react';
import Header from '../atoms/Header/Header';
import Button from '../atoms/Button/Button';

interface PickActivityProps {
    
}

const PickActivity = (props: PickActivityProps) => {
    return (
        <>
            <Header title='Pick an activity.' subtitle='Some subtitle'/>
            <Button text='Predict' status='active'/>
        </>
    );
}

export default PickActivity;
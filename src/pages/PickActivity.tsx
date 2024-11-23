import React from 'react';
import Header from '../atoms/Header/Header';

interface PickActivityProps {
    
}

const PickActivity = (props: PickActivityProps) => {
    return (
        <Header title='Pick an activity.' subtitle='Some subtitle'/>
    );
}

export default PickActivity;
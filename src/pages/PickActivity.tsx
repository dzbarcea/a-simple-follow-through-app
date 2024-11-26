import React, {useEffect, useState} from 'react';
import Header from '../atoms/Header/Header';
import Button from '../atoms/Button/Button';
import ActivitySelector from '../components/ActivitySelector/ActivitySelector';

interface PickActivityProps {
    
}

const PickActivity = (props: PickActivityProps) => {
    const [hasSelection, setHasSelection] = useState(false);

    return (
        <>
            <Header title='Pick an activity.' subtitle='Some subtitle' />

            <ActivitySelector onChange={() => setHasSelection(true)}/>

            <Button text='Predict' status={hasSelection ? 'active' : 'disabled'} />
        </>
    );
}

export default PickActivity;
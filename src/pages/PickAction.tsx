import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import ProceedButton from '../atoms/Button/ProceedButton';
import ActionSelector from '../components/ActionSelector/ActionSelector';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';
import {useFormContext} from '../context/FormContext';


const PickAction = () => {
    const formContext = useFormContext();

    const [hasSelection, setHasSelection] = useState(false);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(formContext?.chosenSelectionId && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    useEffect(() => {
        if (formContext?.chosenSelectionId) {
            setHasSelection(true);
        } else {
            setHasSelection(false);
        }
    }, [formContext?.chosenSelectionId]);

    return (
        <>
            <Header
                title='Pick an action.'
                subtitle='List two or more things you want to do, then choose one'
                sectionComplete={hasSelection}
                tooltipText={
                    <>
                        Choosing one action out of many activates our brain's sense of agency.
                        This is called <span style={{color: 'var(--primary-light)'}}>Voluntary Action</span>,
                        the first step in Intentional Binding.
                    </>
                }
            />

            <ActionSelector/>

            <div className='flex-column-container'>
                <ProceedButton text='Predict' status={formContext?.chosenSelectionId ? 'active' : 'disabled'}
                               onClick={navigateToNextPage}/>

                <a href='/past-sessions'>View past sessions</a>
            </div>

        </>
    );
}

export default PickAction;
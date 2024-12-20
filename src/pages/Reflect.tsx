import React, {useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';
import TextArea from '../components/TextArea/TextArea';
import ProceedButton from '../atoms/Button/ProceedButton';
import {useFormContext} from '../context/FormContext';


const Reflect = () => {
    const formContext = useFormContext();

    const [isSectionComplete, setIsSectionComplete] = useState(() =>
        formContext?.reflectionText !== undefined && formContext?.reflectionText !== null);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const handleSubmit = () => {
        formContext?.submitForm();

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
    }, [formContext?.reflectionText]);

    return (
        <>
            <Header
                title='Reflect.'
                subtitle={`Take as long as you'd like, but think deeply`}
                sectionComplete={isSectionComplete}
                tooltipText={
                    <>
                        <span style={{color: 'var(--primary-light)'}}>Reflection</span> tightens the link
                        between action and outcome, making them seem closer together.
                    </>
                }
            />

            <TextArea
                placeholder='Reflect on the activity you just did. Optionally write something here to view later.'
                defaultValue={formContext?.reflectionText}
                setDefaultValue={formContext?.setReflectionText}
            />

            <div className='flex-column-container'>
                <ProceedButton text='Finish' status={isSectionComplete ? 'active' : 'disabled'}
                               onClick={handleSubmit}/>
                <a href='/past-sessions'>View past sessions</a>
            </div>
        </>
    );
}

export default Reflect;
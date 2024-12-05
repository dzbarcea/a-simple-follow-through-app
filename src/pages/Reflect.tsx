import React, {useState} from 'react';
import Header from '../components/Header/Header';
import {useNavContext} from '../context/NavContext';
import {useNavigate} from 'react-router-dom';
import TextArea from '../components/TextArea/TextArea';
import ProceedButton from '../atoms/Button/ProceedButton';


const Reflect = () => {
    const [isSectionComplete, setIsSectionComplete] = useState(false);
    const navContext = useNavContext();
    const navigate = useNavigate();

    const navigateToNextPage = () => {
        if(isSectionComplete && navContext?.nextPath) {
            navigate(navContext.nextPath);
        }
    }

    // TODO: onChange handler

    return (
        <>
            <Header title='Reflect.' subtitle='Some subtitle' sectionComplete={isSectionComplete}/>

            <TextArea placeholder={`Reflect on the activity you just did. Optionally write something here to view later.`} setIsSectionComplete={setIsSectionComplete}/>

            <ProceedButton text='Finish' status={isSectionComplete ? 'active' : 'disabled'} onClick={navigateToNextPage} />
        </>
    );
}

export default Reflect;
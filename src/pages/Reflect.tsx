import React, {useState} from 'react';
import Header from '../components/Header/Header';


const Reflect = () => {
    const [isSectionComplete, setIsSectionComplete] = useState(false);


    return (
        <>
            <Header title='Pick an activity.' subtitle='Some subtitle' sectionComplete={isSectionComplete}/>
        </>
    );
}

export default Reflect;
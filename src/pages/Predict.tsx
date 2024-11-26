import React, {useState} from 'react';
import Header from '../components/Header/Header';


const Predict = () => {
    const [hasSelection, sethasSelection] = useState(false);

    return (
        <>
            <Header title='Make a prediction.' subtitle='Some subtitle' sectionComplete={hasSelection}/>
            
            
        </>
    );
}

export default Predict;
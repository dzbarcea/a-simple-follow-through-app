import React from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import PickActivity from './pages/PickActivity';
import NavContextProvider from './context/NavContext';
import Predict from './pages/Predict';
import Reflect from './pages/Reflect';
import FormContextProvider from './context/FormContext';

const App = () => {
    return (
        <BrowserRouter>
            <NavContextProvider>
                <FormContextProvider>
                    <Routes>
                        <Route path='/' element={
                            <div className='bg-container'>
                                <div className='body-container'>
                                    <Outlet />
                                </div>
                            </div>
                        }>
                            <Route index element={<Navigate to='/pick-activity' replace={true} />}/>
                            <Route path='/pick-activity' element={<PickActivity/>}/>
                            <Route path='/predict' element={<Predict/>}/>
                            <Route path='/reflect' element={<Reflect/>}/>
                        </Route>
                    </Routes>
                </FormContextProvider>
            </NavContextProvider>
        </BrowserRouter>
    );
}

export default App;

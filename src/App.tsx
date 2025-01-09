import React from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import PickAction from './pages/PickAction';
import NavContextProvider from './context/NavContext';
import Predict from './pages/Predict';
import Reflect from './pages/Reflect';
import FormContextProvider from './context/FormContext';
import PastSessions from './pages/PastSessions/PastSessions';
import Session from './pages/Session/Session';
import Learn from './pages/Learn';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (
        <BrowserRouter>
            <NavContextProvider>
                <FormContextProvider>
                    <Routes>
                        <Route path='/' element={
                            <div className='bg-container'>
                                <Navbar />
                                <div className='body-container'>
                                    <Outlet />
                                </div>
                            </div>
                        }>
                            <Route index element={<Navigate to='/pick-action' replace={true} />}/>
                            <Route path='/pick-action' element={<PickAction/>}/>
                            <Route path='/predict' element={<Predict/>}/>
                            <Route path='/reflect' element={<Reflect/>}/>
                            <Route path='/past-sessions' element={<Outlet/>}>
                                <Route index element={<PastSessions/>}/>
                                <Route path='*' element={<Session/>}/>
                            </Route>
                        </Route>
                        <Route path='/learn' element={<Learn/>}/>
                    </Routes>
                </FormContextProvider>
            </NavContextProvider>
        </BrowserRouter>
    );
}

export default App;

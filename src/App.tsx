import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import PickActivity from './pages/PickActivity';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
              <div className='bg-container'>
                  <div className='body-container'>
                      <Outlet />
                  </div>
              </div>
          }>
              <Route index element={<PickActivity/>}/>
              <Route path='/pick-an-activity' element={<PickActivity/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

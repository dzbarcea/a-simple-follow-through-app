import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p></p>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import AllList from './pages/AllList.jsx';
import Complete from './pages/Complete.jsx';
import './App.css';
import Router from './Router';

const App = () => {
  return (
    <>
        <div className="App">
          <div className='main'>
                <Router />
          </div>
      </div>
    </>
    
  );
};

export default App;

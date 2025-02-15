import React, { useState } from 'react';
import AllList from './pages/AllList.jsx';
import Complete from './pages/Complete.jsx';
import './App.css';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
        <div className="App">
        <ToastContainer />
          <div className='main'>
                <Router />
          </div>
      </div>
    </>
    
  );
};

export default App;

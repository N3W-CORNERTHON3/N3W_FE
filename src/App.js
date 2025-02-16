import React, { useState } from 'react';
import './App.css';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

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

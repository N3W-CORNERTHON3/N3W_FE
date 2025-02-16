import React from 'react';
import './App.css';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <>
        <div className="App">
          <Header /> 
          {/*<Sidebar />*/}
        <ToastContainer />
          <div className='main'>
                <Router />
          </div>
          <Footer />
      </div>
    </>
    
  );
};

export default App;

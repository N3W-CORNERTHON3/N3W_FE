import {  Route, Routes } from 'react-router-dom';


import { LoginPage } from './components/Login/Login';

function AppNavigation() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} /> 

            </Routes>
        </>
    );
}


export default function Router() {
    return (
        <AppNavigation />
    );
}
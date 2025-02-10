import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';

function AppNavigation() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/signin" element={<Signin />} /> 
            </Routes>
        </>
    );
}


export default function Router() {
    return (
        <AppNavigation />
    );
}
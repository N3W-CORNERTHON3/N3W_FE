import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';
import FirstMission from './pages/FirstMission';

function AppNavigation() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/signin" element={<Signin />} />

                <Route path="/missioninitial" element={<FirstMission />} />
            </Routes>
        </>
    );
}


export default function Router() {
    return (
        <AppNavigation />
    );
}
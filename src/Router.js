import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Signin from './pages/Signin';
import FirstMission from './pages/FirstMission';
import FirstMissionAdd from './pages/FirstMissionAdd';
import Challenge1 from './pages/Challenge1';
import Challenge2 from './pages/Challenge2';


function AppNavigation() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/signin" element={<Signin />} />

                <Route path="/missioninitial" element={<FirstMission />} />
                <Route path="/missioninitialAdd" element={<FirstMissionAdd />} />

                <Route path="/challenge" element={<Challenge1 />} />
                <Route path="/challengeSelect" element={<Challenge2 />} />

            </Routes>
        </>
    );
}


export default function Router() {
    return (
        <AppNavigation />
    );
}
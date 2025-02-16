import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Signin from './pages/Signin';
import FirstMission from './pages/FirstMission';
import FirstMissionAdd from './pages/FirstMissionAdd';
import Challenge1 from './pages/Challenge1';
import Challenge2 from './pages/Challenge2';
import Challenge3 from './pages/Challenge3';
import Challenge4 from './pages/Challenge4';
import AllList from './pages/AllList';
import Complete from './pages/Complete';


function AppNavigation() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/signin" element={<Signin />} />

                <Route path="/missioninitial" element={<FirstMission />} />
                <Route path="/missioninitialAdd" element={<FirstMissionAdd />} />
                <Route path="/mission" element={<AllList />} />

                <Route path="/challenge" element={<Challenge1 />} />
                <Route path="/challengeSelect" element={<Challenge2 />} />
                <Route path="/challengeResult" element={<Challenge3 />} />
                <Route path="/challengeIng/:missionId" element={<Challenge4 />} />

                <Route path="/challengeComplete" element={<Complete />} />
                

            </Routes>
        </>
    );
}


export default function Router() {
    return (
        <AppNavigation />
    );
}
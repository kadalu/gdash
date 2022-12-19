import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { Login } from './pages/login.jsx';
import { Logout } from './pages/logout.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Volumes } from './pages/volumes.jsx';
import { Peers } from './pages/peers.jsx';
import { Bricks } from './pages/bricks.jsx';
import { VolumeDetail } from './pages/volumeDetail.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login"
                       element={<Login/>}/>
                <Route path="/dashboard"
                       element={<Dashboard/>}/>
                <Route path="/volumes/:volumeId"
                       element={<VolumeDetail/>}/>
                <Route path="/volumes"
                       element={<Volumes/>}/>
                <Route path="/peers"
                       element={<Peers/>}/>
                <Route path="/bricks"
                       element={<Bricks/>}/>
                <Route path="/logout"
                       element={<Logout/>}/>
                <Route path="/"
                       element={<Dashboard/>}/>
            </Routes>
        </Router>
    );
}

export default App;

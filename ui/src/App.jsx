import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
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
            <Switch>
                <Route path="/login"
                       component={Login}/>
                <Route path="/dashboard"
                       component={Dashboard}/>
                <Route path="/volumes/:volumeId"
                       component={VolumeDetail}/>
                <Route path="/volumes"
                       component={Volumes}/>
                <Route path="/peers"
                       component={Peers}/>
                <Route path="/bricks"
                       component={Bricks}/>
                <Route path="/logout"
                       component={Logout}/>
                <Route path="/"
                       component={Dashboard}/>
            </Switch>
        </Router>
    );
}

export default App;

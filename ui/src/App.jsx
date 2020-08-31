import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Login } from './pages/login.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Volumes } from './pages/volumes.jsx';
import { Peers } from './pages/peers.jsx';
import { Bricks } from './pages/bricks.jsx';
import { VolumeDetail } from './pages/volumeDetail.jsx';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/volumes/:volumeId"
                       component={VolumeDetail}/>
                <Route path="/volumes"
                       component={Volumes}/>
                <Route path="/peers">
                    <Peers />
                </Route>
                <Route path="/bricks">
                    <Bricks />
                </Route>
                <Route path="/logout">
                    <Login />
                </Route>
                <Route path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

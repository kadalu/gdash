import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { Content } from '../components/content.jsx';

function Box({label, value, onClick}) {
    return (
        <div className="p-5 shadow-lg border border-indigo-100 rounded-lg inline-block mr-10 cursor-pointer" style={{width: "200px", height: "130px"}} onClick={onClick}>
            <h2 className="font-bold text-xl">{label}</h2>
            <div className="text-right text-3xl">{value}</div>
        </div>
    )
}

function dashboardUI(history, volumes, peers) {
    let numBricks = 0;
    let upBricks = 0;
    let upPeers = 0;
    let upVolumes = 0;
    for(var v=0; v<volumes.length; v++) {
        if (volumes[v].status === 'Started' && volumes[v].health === 'up') {
            upVolumes++;
        }
        for(var sv=0; sv<volumes[v].subvols.length; sv++) {
            for(var b=0; b<volumes[v].subvols[sv].bricks.length; b++) {
                if (volumes[v].subvols[sv].bricks[b].online) {
                    upBricks++;
                }
                numBricks++;
            }
        }
    }
    for (var p=0; p<peers.length; p++) {
        if (peers[p].connected === 'Connected') {
            upPeers++;
        }
    }
    return (
        <div className="">
            <Box label="Peers" value={upPeers + ' / ' + peers.length} onClick={() => window.location = '/peers'}/>
            <Box label="Volumes" value={upVolumes + ' / ' + volumes.length} onClick={() => window.location = '/volumes'}/>
            <Box label="Bricks" value={upBricks + ' / ' + numBricks} onClick={() => window.location = '/bricks'}/>
        </div>
);
}

export function Dashboard({ history }) {
    let elements = [
        {label: "Dashboard", url: ''}
    ];

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [peers, setPeers] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [refreshRequired, setRefreshRequired] = useState(dayjs());

    useEffect(() => {
        axios.get("/api/volumes")
             .then((resp) => {
                 setLoading(false);
                 setVolumes(resp.data);
             })
             .catch(err => {
                 if (err.response.status === 403) {
                     window.location = '/login';
                 } else {
                     setLoading(false);
                     setError("Failed to get data from the server(HTTP Status: " + err.response.status + ")");
                 }
             });

        axios.get("/api/peers")
             .then((resp) => {
                 setPeers(resp.data);
             })
             .catch(err => {
                 if (err.response.status === 403) {
                     window.location = '/login';
                 }
             });
    }, [refreshRequired, history]);

    return (
        <Content breadcrumb={elements} data={dashboardUI(history, volumes, peers)} setRefreshRequired={setRefreshRequired} loading={loading} error={error} />
    );
}

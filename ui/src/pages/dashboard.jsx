import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Content } from '../components/content.jsx'

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
            <Box label="Peers" value={upPeers + ' / ' + peers.length} onClick={() => history.push('/peers')}/>
            <Box label="Volumes" value={upVolumes + ' / ' + volumes.length} onClick={() => history.push('/volumes')}/>
            <Box label="Bricks" value={upBricks + ' / ' + numBricks} onClick={() => history.push('/bricks')}/>
        </div>
    );
}

export function Dashboard({ history }) {
    let elements = [
        {label: "Dashboard", url: ''}
    ];

    const [peers, setPeers] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [refreshRequired, setRefreshRequired] = useState(new Date());

    useEffect(() => {
        axios.get("/api/volumes")
             .then((resp) => {
                 setVolumes(resp.data);
             })
             .catch(err => {
                 if (err.response.status === 403) {
                     history.push('/login');
                 }
             });

        axios.get("/api/peers")
             .then((resp) => {
                 setPeers(resp.data);
             })
             .catch(err => {
                 if (err.response.status === 403) {
                     history.push('/login');
                 }
             });
    }, [refreshRequired, history]);

    return (
        <Content breadcrumb={elements} data={dashboardUI(history, volumes, peers)} />
    );
}

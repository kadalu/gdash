import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { Content } from '../components/content.jsx'

function peerStatus(peer) {
    let cls = 'inline-block px-2 py-1 text-sm rounded-lg '
    if (peer.connected === 'Connected') {
        cls += 'bg-green-500 text-white'
    } else {
        cls += 'bg-red-500 text-white'
    }
    return (
        <span className={cls}>{peer.connected}</span>
    );
}

function peersUI(peers) {
    return (
        <table className="border border-indigo-100 rounded-lg shadow-lg" style={{width: "90%"}}>
            <thead>
                <tr className="bg-indigo-100">
                    <th className="px-5 py-2 uppercase text-left">Peer Address</th>
                    <th className="px-5 py-2 uppercase text-left">State</th>
                </tr>
            </thead>
            <tbody>
                {
                    peers.map((peer, idx) => {
                        return (
                            <tr key={idx} className="border-b border-indigo-100 hover:bg-gray-100">
                                <td className="px-5 py-2" style={{minWidth: "250px"}}>
                                    {peer.hostname}<div className="text-sm text-gray-700">{peer.uuid}</div>
                                </td>
                                <td className="px-5 py-2">{peerStatus(peer)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}

export function Peers({ history }) {
    let elements = [
        {label: "Peers", url: ''}
    ];

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [peers, setPeers] = useState([]);
    const [refreshRequired, setRefreshRequired] = useState(dayjs());

    useEffect(() => {
        axios.get("/api/peers")
             .then((resp) => {
                 setLoading(false);
                 setPeers(resp.data);
             })
             .catch(err => {
                 if (err.response.status === 403) {
                     window.location = '/login';
                 } else {
                     setLoading(false);
                     setError("Failed to get data from the server(HTTP Status: " + err.response.status + ")");
                 }
             });
    }, [refreshRequired, history]);

    return (
        <Content breadcrumb={elements} data={peersUI(peers)} setRefreshRequired={setRefreshRequired} loading={loading} error={error} />
    );
}

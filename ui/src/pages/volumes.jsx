import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { Content } from '../components/content.jsx'
import { volumeStatus, capitalize, sizeUtilization, inodesUtilization } from '../components/helpers';

function volumesUI(history, volumes) {

    function handleClick(volume_id) {
        history.push('/volumes/' + volume_id)
    }

    return (
        <table className="border border-indigo-100 rounded-lg shadow-lg" style={{width: "90%"}}>
            <thead>
                <tr className="bg-indigo-100">
                    <th className="px-5 py-2 uppercase text-left">Name</th>
                    <th className="px-5 py-2 uppercase text-left">State</th>
                    <th className="px-5 py-2 uppercase text-left">Type</th>
                    <th className="px-5 py-2 uppercase text-left">Size</th>
                    <th className="px-5 py-2 uppercase text-left">Inodes</th>
                </tr>
            </thead>
            <tbody>
                {
                    volumes.map((volume, idx) => {
                        return (
                            <tr key={idx} className="border-b border-indigo-100 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick(volume.uuid)}>
                                <td className="px-5 py-2" style={{minWidth: "250px"}}>
                                    {volume.name}<div className="text-sm text-gray-700">{volume.uuid}</div>
                                </td>
                                <td className="px-5 py-2">{volumeStatus(volume)}</td>
                                <td className="px-5 py-2">
                                    {capitalize(volume.type)}<br/><span className="text-sm text-gray-800">{volume.subvols.length + ' x ' + volume.subvols[0].bricks.length}</span>
                                </td>
                                <td className="px-5 py-2">{sizeUtilization(volume)}</td>
                                <td className="px-5 py-2">{inodesUtilization(volume)}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}

export function Volumes({ history }) {
    let elements = [
        {label: "Volumes", url: ''}
    ];

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
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
                     history.push('/login');
                 } else {
                     setLoading(false);
                     setError("Failed to get data from the server(HTTP Status: " + err.response.status + ")");
                 }
             });
    }, [refreshRequired, history]);

    return (
        <Content breadcrumb={elements} data={volumesUI(history, volumes)} setRefreshRequired={setRefreshRequired} loading={loading} error={error} />
    );
}

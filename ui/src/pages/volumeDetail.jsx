import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { Content } from '../components/content.jsx'

import { brickStatus, volumeStatus, capitalize, sizeUtilization, inodesUtilization } from '../components/helpers';

function volumeDetailUI(volumeId, volumes) {
    let volume = {}
    for(var i=0; i<volumes.length; i++) {
        if (volumes[i].uuid === volumeId) {
            volume = volumes[i]
            break;
        }
    }

    if (Object.keys(volume).length === 0) {
        return <></>;
    }

    return (
        <div>
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
                    <tr key={volume.uuid} className="border-b border-indigo-100 hover:bg-gray-100 cursor-pointer">
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
                </tbody>
            </table>
            <div className="shadow-lg p-5 border rounded-lg border-indigo-100 mt-10 mb-10" style={{width: "90%"}}>
                <h2 className="text-xl text-gray-800 uppercase mb-5">Bricks</h2>
                <table className="border border-indigo-100 rounded-lg" style={{width: "100%"}}>
                    <thead>
                        <tr className="bg-indigo-100">
                            <th className="pl-5 py-2 uppercase text-left">Subvol</th>
                            <th className="px-5 py-2 uppercase text-left">Brick</th>
                            <th className="px-5 py-2 uppercase text-left">State</th>
                            <th className="px-5 py-2 uppercase text-left">FS</th>
                            <th className="px-5 py-2 uppercase text-left">Size</th>
                            <th className="px-5 py-2 uppercase text-left">Inodes</th>
                            <th className="px-5 py-2 uppercase text-left">PID/Port</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            volume.subvols.map((subvol, sdx) => {
                                return subvol.bricks.map((brick, bdx) => {
                                    return (
                                        <tr key={sdx+'-'+bdx} className="border-b border-indigo-100 hover:bg-gray-100">
                                            <td className="pl-5 py-2">{sdx+1}</td>
                                            <td className="px-5 py-2">
                                                {brick.name}
                                            </td>
                                            <td className="px-5 py-2">{brickStatus(volume, brick)}</td>
                                            <td className="px-5 py-2">
                                                {brick.fs_name}
                                            </td>
                                            <td className="px-5 py-2">{sizeUtilization(brick)}</td>
                                            <td className="px-5 py-2">{inodesUtilization(brick)}</td>
                                            <td className="px-5 py-2">{brick.pid} / {brick.ports.tcp}</td>
                                        </tr>
                                    );
                                })
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="shadow-lg p-5 border rounded-lg border-indigo-100 mt-10 mb-10" style={{width: "90%"}}>
                <h2 className="text-xl text-gray-800 uppercase mb-5">Volume Options</h2>
                <table className="border border-indigo-100 rounded-lg">
                    <thead>
                        <tr className="bg-indigo-100">
                            <th className="pl-5 py-2 uppercase text-left">Name</th>
                            <th className="px-5 py-2 uppercase text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            volume.options.map((opt, odx) => {
                                return (
                                    <tr key={odx} className="border-b border-indigo-100 hover:bg-gray-100">
                                        <td className="px-5 py-2">
                                            {opt.name}
                                        </td>
                                        <td className="px-5 py-2">
                                            {opt.value}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function VolumeDetail({ history }) {
    const { volumeId } = useParams();
    const [loading, setLoading] = useState(true);
    const [volumes, setVolumes] = useState([]);
    const [refreshRequired, setRefreshRequired] = useState(dayjs());
    const [error, setError] = useState("");
    const [elements, setElements] = useState([
        {label: "Volumes", url: '/volumes'}
    ]);

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

    useEffect(() => {
        let volume = {};
        for (var i=0; i<volumes.length; i++) {
            if (volumeId === volumes[i].uuid) {
                volume = volumes[i];
                break;
            }
        }
        if (volume.name !== undefined) {
            setElements([
                {label: "Volumes", url: '/volumes'},
                {label: volume.name, url: ''}
            ]);
        }
    }, [volumes, volumeId])
    return (
        <Content breadcrumb={elements} data={volumeDetailUI(volumeId, volumes)} setRefreshRequired={setRefreshRequired} loading={loading} error={error} />
    );
}

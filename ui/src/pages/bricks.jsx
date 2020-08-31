import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Content } from '../components/content.jsx'
import { brickStatus, volumeStatus, capitalize, sizeUtilization, inodesUtilization } from '../components/helpers';

function bricksUI(volumes) {

    return (
        <table className="border border-indigo-100 rounded-lg shadow-lg mb-10" style={{width: "90%"}}>
            <thead>
                <tr className="bg-indigo-100">
                    <th className="px-5 py-2 uppercase text-left">Volume</th>
                    <th className="px-5 py-2 uppercase text-left">Brick</th>
                    <th className="px-5 py-2 uppercase text-left">State</th>
                    <th className="px-5 py-2 uppercase text-left">FS</th>
                    <th className="px-5 py-2 uppercase text-left">Size</th>
                    <th className="px-5 py-2 uppercase text-left">Inodes</th>
                </tr>
            </thead>
            <tbody>
                {
                    volumes.map((volume, vdx) => {
                        return volume.subvols.map((subvol, sdx) => {
                            return subvol.bricks.map((brick, bdx) => {
                                return (
                                    <tr key={vdx + '-' + sdx + '-' + bdx} className="border-b border-indigo-100 hover:bg-gray-100 cursor-pointer">
                                        <td className="px-5 py-2" style={{minWidth: "250px"}}>
                                            {volume.name}<div className="text-sm text-gray-700">{volume.uuid}</div>
                                        </td>
                                        <td className="px-5 py-2" style={{minWidth: "250px"}}>
                                            {brick.name}
                                        </td>
                                        <td className="px-5 py-2">{brickStatus(volume, brick)}</td>
                                        <td className="px-5 py-2">{brick.fs_name}</td>
                                        <td className="px-5 py-2">{sizeUtilization(brick)}</td>
                                        <td className="px-5 py-2">{inodesUtilization(brick)}</td>
                                    </tr>
                                );
                            })
                        })
                    })
                }
            </tbody>
        </table>
    )
}

export function Bricks() {
    let elements = [
        {label: "Bricks", url: ''}
    ];

    const [volumes, setVolumes] = useState([]);
    const [refreshRequired, setRefreshRequired] = useState(new Date());

    useEffect(() => {
        axios.get("/api/volumes")
             .then((resp) => {
                 setVolumes(resp.data);
             });
    }, [refreshRequired]);

    return (
        <Content breadcrumb={elements} data={bricksUI(volumes)} setRefreshRequired={setRefreshRequired} />
    );
}

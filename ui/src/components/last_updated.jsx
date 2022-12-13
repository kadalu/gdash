import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export function LastUpdated({ setRefreshRequired }) {
    dayjs.extend(relativeTime);

    const [autoRefresh, setAutoRefresh] = useState(false);
    const [lstUpdated, setLstUpdated] = useState(dayjs());
    const [lstUpdatedDisp, setLstUpdatedDisp] = useState(lstUpdated.fromNow());

    useEffect(() => {
        setLstUpdatedDisp(lstUpdated.fromNow());
        let interval = null;

        if (autoRefresh) {
            interval = setInterval(() => {
                setLstUpdated(dayjs());
                setRefreshRequired(dayjs());
            }, 60000);
        } else {
            clearInterval(interval);
            interval = null;
        }

        return () => clearInterval(interval);
    }, [autoRefresh, lstUpdated, setRefreshRequired]);

    function handleClick() {
        setLstUpdated(dayjs());
        setRefreshRequired(dayjs());
    }

    function toggleAutoRefresh() {
        setAutoRefresh(!autoRefresh);
    }

    return (
        <p className="text-indigo-900 px-4 py-1 text-right text-sm mt-5">
            {autoRefresh ? 'Last updated (auto refresh)' : 'Last updated'} {lstUpdatedDisp}
            <button className="bg-indigo-600 text-indigo-100 rounded-lg px-2 py-1 hover:bg-indigo-900 mx-2" onClick={handleClick}>reload</button>
            <button 
                className={`bg-indigo-600 text-indigo-100 rounded-lg px-2 py-1 hover:bg-indigo-900 ${autoRefresh ? 'bg-indigo-900' : ''}`}
                onClick={() => toggleAutoRefresh()}
            >
                auto refresh
            </button>
        </p>
    );
}

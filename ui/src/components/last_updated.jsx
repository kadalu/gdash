import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export function LastUpdated({ setRefreshRequired }) {
    dayjs.extend(relativeTime);

    const [lstUpdated, setLstUpdated] = useState(dayjs());
    const [lstUpdatedDisp, setLstUpdatedDisp] = useState(lstUpdated.fromNow());

    useEffect(() => {
        setInterval(() => {
            setLstUpdatedDisp(lstUpdated.fromNow());
        }, 1000);
    }, [lstUpdated]);

    function handleClick() {
        setLstUpdated(dayjs());
        setRefreshRequired(dayjs());
    }

    return (
        <p className="text-indigo-900 px-4 py-1 text-right text-sm mt-5">
            Last updated {lstUpdatedDisp} <button className="bg-indigo-600 text-indigo-100 rounded-lg px-2 py-1 hover:bg-indigo-900" onClick={handleClick}>reload</button>
        </p>
    );
}

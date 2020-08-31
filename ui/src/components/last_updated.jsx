import React, { useState } from 'react';
import Moment from 'react-moment';

export function LastUpdated({ setRefreshRequired }) {
    const [lstUpdated, setLstUpdated] = useState(new Date());

    function handleClick() {
        setLstUpdated(new Date());
        setRefreshRequired(new Date());
    }

    return (
        <p className="text-indigo-900 px-4 py-1 text-right text-sm mt-5">
            Last updated <Moment fromNow>{lstUpdated}</Moment> <button className="bg-indigo-600 text-indigo-100 rounded-lg px-2 py-1 hover:bg-indigo-900" onClick={handleClick}>reload</button>
        </p>
    );
}

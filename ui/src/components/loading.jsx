import React from 'react';

import LoadingGif from '../assets/images/loading.gif';

export function Loading({ loading }) {
    if (!loading) {
        return <></>;
    }

    return (
        <div className="text-gray-700"><img className="inline-block mr-2" alt="loading..." src={LoadingGif}/> Loading...</div>
    );
}

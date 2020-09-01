import React from 'react';

import { Sidebar } from '../components/sidebar.jsx'
import { LastUpdated } from '../components/last_updated.jsx'
import { BreadCrumb } from '../components/breadcrumb.jsx'
import { Loading } from '../components/loading.jsx'

function ShowError({ error }) {
    return (
        <div className="bg-red-300 p-5 rounded-lg border border-red-400" style={{width: "90%"}}>
            {error}
        </div>
    );
}

export function Content({ breadcrumb, data, setRefreshRequired, loading, error }) {
    return (
        <div className="grid grid-cols-12 gap-10">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-10">
                <LastUpdated setRefreshRequired={setRefreshRequired} />
                <BreadCrumb elements={breadcrumb}/>
                {loading ? <Loading loading={loading}/> : (error === '' ? <>{data}</> : <ShowError error={error}/>)}
            </div>
        </div>
    );
}

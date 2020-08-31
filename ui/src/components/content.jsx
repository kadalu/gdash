import React from 'react';

import { Sidebar } from '../components/sidebar.jsx'
import { LastUpdated } from '../components/last_updated.jsx'
import { BreadCrumb } from '../components/breadcrumb.jsx'

export function Content({ breadcrumb, data, setRefreshRequired }) {
    return (
        <div className="grid grid-cols-12 gap-10">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-10">
                <LastUpdated setRefreshRequired={setRefreshRequired} />
                <BreadCrumb elements={breadcrumb}/>
                {data}
            </div>
        </div>
    );
}

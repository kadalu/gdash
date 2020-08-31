import React, { useState, useEffect } from 'react';

import { Content } from '../components/content.jsx'

export function Dashboard() {
    let elements = [
        {label: "Dashboard", url: ''}
    ];

    return (
        <Content breadcrumb={elements} data="Dashboard" />
    );
}

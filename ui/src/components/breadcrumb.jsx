import React from 'react';
import { Link } from 'react-router-dom';


export function BreadCrumb({ elements }) {
    return (
        <div className="mb-10">
            <Link to="/">
                <svg viewBox="0 0 20 20" fill="currentColor" className="home w-6 h-6 inline-block text-gray-700 pb-1"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            </Link>
            {
                elements.map((item, idx) => {
                    return (
                        <span key={idx}>
                            <span className="pl-2 pr-1 text-gray-700">/</span>
                            {
                                item.url === '' ?
                                <span className="pl-2 pr-1 text-gray-700">{item.label}</span>:
                                <span className="pl-2 pr-1 text-gray-700"><Link to={item.url}>{item.label}</Link></span>
                            }
                        </span>
                    )
                })
            }
        </div>
    );
}

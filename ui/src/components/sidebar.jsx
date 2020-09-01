import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
    return (
        <div className="bg-indigo-900 text-yellow-200 h-screen">
            <div className="py-5 px-4 bg-indigo-800">
                <h1 className="text-3xl text-yellow-400 font-bold">gdash</h1>
                <p>GlusterFS Dashboard</p>
            </div>
            <div className="text-white">
                <h2 className="text-gray-500 mt-10 uppercase px-4">Menu</h2>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="document-report w-5 h-5 inline-block mr-2"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd"></path></svg>
                    Dashboard
                </Link>
                <Link to="/volumes" className="block px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="folder w-5 h-5 inline-block mr-2"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                    Volumes
                </Link>
                <Link to="/peers" className="block px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="server w-5 h-5 inline-block mr-2"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path></svg>
                    Peers
                </Link>
                <Link to="/bricks" className="block px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="table w-5 h-5 inline-block mr-2"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                    Bricks
                </Link>
                <h2 className="text-gray-500 mt-10 uppercase px-4">Account</h2>
                <Link to="/logout" className="block px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="logout w-5 h-5 inline-block mr-2"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                    Logout
                </Link>
            </div>
        </div>
    );
}

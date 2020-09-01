import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Logout({ history }) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("/api/logout")
             .then((resp) => {
                 setMessage("Logged out Successfully...");
                 setInterval(() => {
                     history.push('/login');
                 }, 2000);
             });
    }, [history]);

    return (
        <div className="w-full md:w-1/2 lg:w-1/4 m-auto py-10 bg-indigo-100 md:mt-10 h-screen md:h-auto rounded-lg shadow-lg">
            <div className="text-center">
                {message}
            </div>
        </div>
    );
}

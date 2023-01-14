import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Logout({ history }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("/api/logout")
             .then((resp) => {
                 setMessage("Logged out Successfully...");
                 setInterval(() => {
                     window.location = '/login';
                 }, 2000);
             }).catch(err => {
                 setError("Failed to get data from the server(HTTP Status: " + err.response.status + ")");
             });
    }, [history]);
    
    return (
        <div className="w-full md:w-1/2 lg:w-1/4 m-auto bg-indigo-100 md:mt-10 h-screen md:h-auto rounded-lg shadow-lg">
            {
                error === '' ?
                <div className="text-center my-10">
                    {message}
                </div> :
                <div className="bg-red-300 p-5 rounded-lg border border-red-400">
                    {error}
                </div>
            }
        </div>
    );
}

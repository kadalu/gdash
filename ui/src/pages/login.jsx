import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bg1 from '../assets/images/bg1.svg';


export function Login({ history }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [error, setError] = useState("");

    function buttonClass() {
        let cls = "cursor-pointer text-white py-2 px-5 rounded-lg "
        return cls + (buttonEnabled ? "bg-indigo-700 hover:bg-indigo-900" : "bg-gray-400 hover:bg-gray-400")
    }

    useEffect(() => {
        axios.get("/api/login")
             .then((resp) => {
                 history.push('/dashboard');
             });
    }, [history]);

    function handleLogin(e) {
        e.preventDefault()
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false);
        if (username === '' || password === '') {
            setButtonEnabled(true);
            return
        }
        axios.post('/api/login', {
            username: username,
            password: password
        }).then(res => {
            history.push('/dashboard');
        }).catch(err => {
            if (err.response.status === 403) {
                setError("Invalid username/password");
                setButtonEnabled(true);
            } else {
                setError("Failed to get data from the server(HTTP Status: " + err.response.status + ")");
                setButtonEnabled(true);
            }
        });
    }
    
    return (
        <div className="w-full md:w-1/2 lg:w-1/4 m-auto py-10 bg-indigo-100 md:mt-10 h-screen md:h-auto rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl text-indigo-800 text-center">
                    GlusterFS Dashboard
                </h1>
                <img className="w-1/4 md:w-1/2 m-auto" alt="." src={Bg1} />
                <div className="mt-10 px-10 pb-10">
                    <div className="text-red-600 text-left">{error}</div>
                    <form className="mt-5" onSubmit={handleLogin}>
                        <input className="bg-white focus:outline-none border border-indigo-200 mb-5 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input className="bg-white focus:outline-none border border-indigo-200 mb-5 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input
                            type="submit"
                            className={buttonClass()}
                            value="Login"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

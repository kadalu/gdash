import React from 'react';

import Bg1 from '../assets/images/bg1.svg';


export function Login() {
    return (
        <div className="w-full md:w-1/2 lg:w-1/4 m-auto py-10 bg-indigo-100 md:mt-10 h-screen md:h-auto rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl text-indigo-800 text-center">
                    GlusterFS Dashboard
                </h1>
                <img className="w-1/4 md:w-1/2 m-auto" alt="." src={Bg1} />
                <div className="mt-10 p-10">
                    <form>
                        <input className="bg-white focus:outline-none border border-indigo-200 mb-5 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Username"/>
                        <input className="bg-white focus:outline-none border border-indigo-200 mb-5 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="password" placeholder="Password"/>
                        <input
                            type="submit"
                            className="bg-indigo-700 hover:bg-indigo-900 cursor-pointer text-white py-2 px-5 rounded-lg"
                            value="Login"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

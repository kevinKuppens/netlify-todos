import { RouteComponentProps } from "@reach/router";
import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { storeContext } from "../Store";

const Register: FC<RouteComponentProps> = () => {
    const { state, dispatch } = useContext(storeContext);
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => (
            {
                ...prevUser,
                [name]: value
            }
        ))
    }
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch({ type: "REGISTER", payload: user })
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.4 38" className="mx-auto h-12 w-auto fill-current text-blue-500">
                    <path d="M73.8,17.9,88.8,0H76.5L64.7,15.5h-.1V0h-10V9.2c-.1-.3-.1-.7-.2-1A9.9,9.9,0,0,0,44.3,0H0V8.2H8.2V38h10V8.2h7.6V38h9.9V25.3h5.6c7.5,0,12.2-2.9,13.3-9.6V38h10V21.4h.1L77.5,38H90.4Zm-36.5-.5H35.6V7.9h1.7c3.8,0,7.1.1,7.1,4.9S40.9,17.4,37.3,17.4Z">
                    </path>
                </svg>
                <h2 className="mt-6 text-center text-3xl text-gray-900">
                    Register a new account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={submitHandler} className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input onChange={handleChange} id="email" name="email" type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input onChange={handleChange} id="password" name="password" type="password" required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
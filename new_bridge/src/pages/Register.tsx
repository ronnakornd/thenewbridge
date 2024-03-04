import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickname] = useState("");
    const [position, setPosition] = useState("");
    const [registrationError, setRegistrationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegistration = async () => {
        if (password !== verifyPassword) {
            setRegistrationError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username,
                email,
                password,
                firstName,
                lastName,
                nickName,
                position
            });

            console.log("Registration successful:", response);
            setSuccessMessage("Registration successful. You can now log in.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error: any) {
            console.error("Registration error:", error.response.data);
            setRegistrationError("Registration failed. Please check your details.");
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        handleRegistration();
    };

    return (
        <div className="flex items-center p-5 justify-center min-h-screen bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-800">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
                            Nickname
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nickname"
                            type="text"
                            placeholder="Nickname"
                            value={nickName}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                            Position
                        </label>
                        <select name="position" id="position" onChange={(e) => setPosition(e.target.value)} >
                            <option value="student">นักเรียน</option>
                            <option value="teacher">ครู</option>
                            <option value="parent">ผู้ปกครอง</option>
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verifyPassword">
                            Verify Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="verifyPassword"
                            type="password"
                            placeholder="Verify Password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </div>

                    {registrationError && <p className="text-red-500 text-xs italic">{registrationError}</p>}
                    {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}

                    <div className="flex items-center justify-center">
                        <button className="btn btn-neutral" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

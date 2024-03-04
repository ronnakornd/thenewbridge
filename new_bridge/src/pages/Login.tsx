import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });
            console.log("Login successful:", response);
            localStorage.setItem('jwt', response.data.jwt);
            localStorage.setItem('user', JSON.stringify(response.data.user));  
            window.location.href = "/";
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-800">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            อีเมล
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            placeholder="อีเมล"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            รหัสผ่าน
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {loginError && <p className="text-red-500 text-xs italic">{loginError}</p>}
                    <div className="grid grid-cols-1 mt-4">
                        <button className="btn btn-neutral" type="submit">
                            เข้าสู่ระบบ
                        </button>
                        <div className="flex justify-end">
                        <a className="btn btn-link text-sm" type="button">
                            ลืมรหัสผ่าน
                        </a>
                        <a href="/register" className="btn btn-link text-sm" type="button">
                        ลงทะเบียน
                        </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;

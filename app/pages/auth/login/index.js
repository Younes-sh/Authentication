import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Style from "./login.module.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } else {
            console.error(data.message);
        }
    };

    return (
        <div className='cotainer'>
            <div className='main'>
                <div className={Style.loginPage}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                            <button type="submit">Login</button>
                        </form>
                    </div>

            </div>
        </div>
    );
};

export default Login;

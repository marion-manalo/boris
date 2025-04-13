'use client';

import React, { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './Auth.css';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                console.error(result.error);
                setError(result.error || 'Invalid credentials');
            } else {
                router.push('/');
            }
        } catch (e: any) {
            console.error('Login error:', e);
            setError('Check credentials');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="heading">Login</h2>

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
            />

            <button type="submit" className="button">
                Log In
            </button>

            <button
                type="submit"
                className="button"
                onClick={() => router.push('/signup')}
            >
                Signup
            </button>

            {error && <p className="error">{error}</p>}
        </form>
    );
}

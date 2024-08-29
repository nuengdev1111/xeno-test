'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // ตรวจสอบข้อมูลที่กรอก
    if (email === '1234' && password === '1234') {
      router.push('/quote');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Xenosoft</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4">Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

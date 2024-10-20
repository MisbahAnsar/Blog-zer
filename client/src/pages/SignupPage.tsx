// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.signup({ username, email, password });
      localStorage.setItem('token', response.token); // Store token
      localStorage.setItem('isSignedUp', 'true'); // Set signup status
      navigate('/'); // Redirect to landing page
    } catch (err) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;

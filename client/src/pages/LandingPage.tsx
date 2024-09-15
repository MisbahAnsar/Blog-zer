// src/pages/LandingPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      const loginTime = localStorage.getItem('loginTime');
      if (token && loginTime) {
        const now = new Date();
        const storedLoginTime = new Date(loginTime);
        const diffDays = Math.floor((now.getTime() - storedLoginTime.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 30) {
          setIsLoggedIn(true);
        } else {
          api.logout();
        }
      }
    };

    checkLogin();
  }, []);

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="bg-red-500 text-white p-3 rounded">
          Logout
        </button>
      ) : (
        <div className="space-x-4">
          <button onClick={handleSignup} className="bg-blue-500 text-white p-3 rounded">
            Sign Up
          </button>
          <button onClick={handleLogin} className="bg-green-500 text-white p-3 rounded">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

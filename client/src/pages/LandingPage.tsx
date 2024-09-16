import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Button = ({ children, variant = 'primary', ...props }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : variant === 'danger'
        ? 'bg-red-500 text-white hover:bg-red-600'
        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
    }`}
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    {...props}
  />
);

export default function LandingPage() {
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
    navigate('/');{
      2000
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      <header className="px-4 lg:px-6 h-14 flex items-center lg:mx-20">
        <a className="flex items-center justify-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 mr-2"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M22 3v7h-7" />
            <path d="M22 3 12 13" />
          </svg>
          <span className="font-bold">BloggerPro</span>
        </a>
        <div className="ml-auto flex items-center space-x-2">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          ) : (
            <>
              <Button onClick={handleSignup} variant="outline">
                Sign Up
              </Button>
              <Button onClick={handleLogin}>
                Login
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-40 lg:py-48 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Share Your Story with the World
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg dark:text-gray-400">
                  Create, publish, and grow your blog with our powerful and intuitive platform. Start your blogging journey today!
                </p>
              </div>
              <div className="space-x-2 sm:space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
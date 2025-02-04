import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api'; // Ensure your API utility is correctly imported

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.login({ email, password });
      if (response.token) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white font-mono tracking-tighter relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -left-40 w-40 h-[100%] bg-blue-400 opacity-10 -rotate-12 blur-3xl pointer-events-none"></div>

      {/* Left side with image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img 
          src="https://i.pinimg.com/236x/8e/e0/60/8ee0600cce110a8b54126283322d952b.jpg" 
          alt="Typewriter on a desk" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-10 bg-gradient-to-b from-black/50 via-transparent to-black/50">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
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
            <span>Blog-zer</span>
          </div>
          <div className="max-w-lg text-white">
            <h2 className="text-3xl font-bold mb-4 tracking-tighter">Share Your Story with the World</h2>
            <p className="text-gray-200">
              Create, publish, and grow your blog with our powerful and intuitive platform. 
              Start your blogging journey today!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100
                           focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50
                           transition-colors duration-200"
                  placeholder="jinwoo@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100
                           focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50
                           transition-colors duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md
                         shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Don't have an account?</span>
              {' '}
              <a href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

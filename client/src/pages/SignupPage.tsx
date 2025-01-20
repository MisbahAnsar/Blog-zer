import React, { useState } from 'react';
import { ListTodo, Github, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api'; // Assuming this is the correct path

function App() {
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
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white font-mono tracking-tighter relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -left-40 w-40 h-[100%] bg-blue-400 opacity-10 -rotate-12 blur-3xl pointer-events-none"></div>
      
      {/* Left side with image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
          alt="Person writing on laptop" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-10 bg-gradient-to-b from-black/50 via-transparent to-black/50">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <ListTodo className="w-8 h-8" />
            <span>BlogShare</span>
          </div>
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">Begin Your Writing Journey</h2>
            <p className="text-gray-200">
              Join our community of writers, thinkers, and storytellers. 
              Your unique voice matters, and we're here to help you share it.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Join our community and start sharing your stories
            </p>
          </div>

          <form onSubmit={handleSignup} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100
                           focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50
                           transition-colors duration-200"
                  placeholder="johndoe"
                />
              </div>

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
                  placeholder="you@example.com"
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

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md
                         shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition-all duration-200 transform hover:scale-[1.02]"
              >
                Create Account
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 
                         dark:border-gray-700 rounded-md shadow-sm text-sm font-medium 
                         text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 
                         dark:border-gray-700 rounded-md shadow-sm text-sm font-medium 
                         text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5 mr-2" />
                Twitter
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Already have an account?</span>
              {' '}
              <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                Sign in instead
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

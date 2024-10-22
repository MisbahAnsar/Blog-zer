import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { ModeToggle } from '../components/mode-toggle';
import DropdownMenuCheckboxes from '@/components/userButton';
import { Button } from '@/components/ui/button';
import { Back } from '@/components/Back'; // Import the Back button component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

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
          setIsLoggedIn(false);  // Ensure isLoggedIn is updated
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

  return (
    <div className=''>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-between w-full">
          {location.pathname === '/' ? ( // Show logo on the main page
            <a className="flex items-center" href="#">
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
              <span className="font-bold font-mono">Blog-zer</span>
            </a>
          ) : (
            <Back />
          )}
          <div className="ml-auto flex items-center space-x-2">
            {!isLoggedIn ? (
              <>
                <Button onClick={handleSignup} variant="outline">
                  Sign Up
                </Button>
                <Button onClick={handleLogin}>
                  Login
                </Button>
              </>
            ) : (
              <DropdownMenuCheckboxes setIsLoggedIn={setIsLoggedIn} />
            )}
            <ModeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;

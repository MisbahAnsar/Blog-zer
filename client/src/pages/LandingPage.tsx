// import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { api } from '../utils/api';
import Navbar from "./Navbar";

const Button = ({ children, variant = "primary", ...props }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : variant === "danger"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
    }`}
    {...props}
  >
    {children}
  </button>
);

export default function LandingPage() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/allblogs");
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-24 md:py-40 lg:py-48 xl:py-48">
          <div className="px-20 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Share Your Story with the World
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg dark:text-gray-400">
                  Create, publish, and grow your blog with our powerful and
                  intuitive platform. Start your blogging journey today!
                </p>
              </div>
              <div className="space-x-2 sm:space-x-4">
                <Button onClick={handleGetStarted}>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

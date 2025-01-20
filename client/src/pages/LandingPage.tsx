// import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { api } from '../utils/api';
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Tiles } from '../components/TilesComponents';

const AnimatedGridBackgroundSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={
        'w-full h-screen min-h-[400px] relative overflow-hidden flex justify-center'
      }
    >
      <div className={'w-fit h-fit relative z-[2]'}>{children}</div>
      <div className={'absolute top-0 left-0 h-full w-full'}>
        <Tiles rows={30} cols={20} />
      </div>
    </div>
  );
};

export default function LandingPage() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/allblogs");
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-black text-black dark:text-white font-mono tracking-tighter">
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>
      <Navbar />
      <main className="flex-1">
        <section className="w-full">
          <div className="px-12 md:px-6">
            <AnimatedGridBackgroundSection>
              <div className="flex flex-col items-center space-y-4 text-center py-24 sm:py-24 md:py-28 lg:py-32 xl:py-40">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
                    Share Your Story with the World
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg dark:text-gray-400">
                    Create, publish, and grow your blog with our powerful and
                    intuitive platform. Start your blogging journey today!
                  </p>
                </div>
                <div className="space-x-2 sm:space-x-4">
                  <Button onClick={handleGetStarted}>All Blogs</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </AnimatedGridBackgroundSection>
          </div>
        </section>
      </main>
    </div>
  );
}
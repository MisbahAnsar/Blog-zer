import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import TilesComponents from "@/components/TilesComponents";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/allblogs");
  };

  return (
    <div className="w-full flex h-screen flex-col bg-white dark:bg-black text-black dark:text-white font-mono tracking-tighter overflow-x-hidden">
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>

      <TilesComponents />      
      <div className="">
        <Navbar />
      </div>
      <main className="flex-1 relative">
        <section className="w-full">
          <div className="px-8 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center py-28 sm:py-40 md:py-48 lg:py-48 xl:py-48">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
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
          </div>
        </section>
      </main>
    </div>
  );
}
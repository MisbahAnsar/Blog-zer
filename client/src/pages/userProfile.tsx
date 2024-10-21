import Navbar from "./Navbar";
import DialogButton from "@/components/DialogButton";
import Avatar from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

const userProfile = () => {
  const [username, setUsername] = useState<string | null>(null);  // Only store the username
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await api.getUser(); // Fetch authenticated user
        setUsername(userData.username);  // Only set the username
      } catch (error: any) {
        setError(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="dark:bg-black dark:text-white bg-white text-black min-h-screen flex flex-col items-center py-6 px-4">
        {/* Main Content */}
        <div className="mt-8 w-full">
          {/* Sidebar - Profile */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-gray-600 h-32 w-32 flex items-center justify-center">
              <div className="">
                <Avatar  width={80} height={80} />
              </div>
              {/* You can replace this with your Dicebear avatar */}
            </div>
            <div className="mt-4 text-center">
              <p className="font-bold text-lg">{username || "Username"}</p>
              <p className="text-sm text-gray-400">Bio</p>
            </div>
          </div>

          {/* Main area - Blog section */}
          <div className="mt-12 text-center items-center">
            <h2 className="text-2xl gap-3 font-semibold">Start Your First Blog</h2>

            <DialogButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;

import Navbar from "./Navbar";
import DialogButton from "@/components/DialogButton";
import Avatar from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Search } from "lucide-react"; // Import the Search icon

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
}

const UserProfile = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await api.getUser(); // Fetch authenticated user
        setUsername(userData.username); // Only set the username
      } catch (error: any) {
        setError(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await api.getUserPosts();
        setPosts(postData.data);
        setFilteredPosts(postData.data); // Initialize filtered posts
      } catch (error) {
        setError(error.message || "Failed to retrieve posts, please try again");
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the beginning of the posts array
    setFilteredPosts((prevPosts) => [newPost, ...prevPosts]); // Update filtered posts as well
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dark:bg-black dark:text-white ">
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Navbar />
      </div>
      <div className="dark:bg-black dark:text-white sm:max-w-5xl mx-auto bg-white text-black min-h-screen flex flex-col items-center py-6 px-8">
        <div className="mt-8 w-full">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-gray-600 h-32 w-32 flex items-center justify-center">
              <Avatar width={80} height={80} />
            </div>
            <div className="mt-4 text-center">
              <p className="font-bold text-lg">{username || "Username"}</p>
              {/* <p className="text-sm text-gray-400">Bio</p> */}
            </div>
          </div>

          <div className="mt-12 text-center items-center">
            {posts.length === 0 ? (
              <>
                <h2 className="text-2xl gap-3 font-semibold">
                  Start Your First Blog
                </h2>
                <DialogButton
                  onNewPost={handleNewPost}
                  buttonText="Write now"
                />
              </>
            ) : (
              <>
                <form
                  className="flex flex-col sm:flex-row gap-2 mb-4 justify-center items-center sm:items-stretch w-full max-w-md sm:max-w-full mx-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  {/* Search bar container */}
                  <div className="relative w-full sm:flex-grow">
                    <input
                      placeholder="Search blogs..."
                      type="text"
                      className="w-full text-black dark:bg-gray-900 dark:text-gray-300 border-2 dark:border-gray-500 placeholder-gray-400 rounded-md px-10 py-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Search Icon inside the input */}
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>

                  <button
                    className="dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
                    type="button"
                  >
                    <DialogButton
                      onNewPost={handleNewPost}
                      buttonText="Create"
                    />
                  </button>
                </form>

                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-[#eae1d6] text-black dark:bg-gray-900 dark:text-white p-4 mt-5 rounded-xl shadow-md hover:shadow-white/10 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <h2 className="font-Supreme text-2xl mb-3 text-start font-extralight underline capitalize">
                        {post.title}
                      </h2>
                      <p className="text-black dark:text-white mb-4 line-clamp-1 text-start text-lg">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center text-md text-gray-400">
                        <div className="flex items-center">
                          <p>{post.author.username}</p>
                        </div>
                        <div className="flex items-center">
                          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

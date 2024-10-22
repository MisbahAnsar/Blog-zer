import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Search, Loader2, Calendar, User, X } from "lucide-react";
import '../index.css';
import Navbar from "./Navbar";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // State for selected post
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await api.allblogs();
        setPosts(response);
        setFilteredPosts(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Function to handle clicking on a card
  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen p-4 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 -right-40 w-40 h-[100%] bg-blue-500 opacity-20 rotate-12 blur-3xl pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="lg:mx-2">
          <Navbar />
        </div>
        <h1 className="text-4xl text-center font-serif mb-12 relative mt-10">
          <span className="bg-gradient-to-r from-black via-gray-700 to-black dark:bg-gradient-to-r dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            Explore, Learn, and Stay Informed with Our Latest Blogs
          </span>
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-12">
          <input
            placeholder="Search blogs..."
            type="text"
            className="flex-grow tracking-wider text-black dark:bg-gray-900 dark:text-gray-300 border-2 placeholder-gray-400 rounded-md px-6 py-3 focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="bg-white text-black border-2 pl-4 pr-10 py-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center transition-all duration-300" 
            type="submit"
          >
            <Search className="mr-2 h-5 w-5" /> Search
          </button>
        </form>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-xl bg-red-900/20 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="space-y-2 font-mono tracking-tighter cursor-pointer">
            {filteredPosts.map((post: Post) => (
              <div
                className="bg-[#eae1d6] text-black dark:bg-gray-900 dark:text-white p-6 rounded-xl shadow-md hover:shadow-white/10 transform hover:-translate-y-1 transition-all duration-300"
                key={post._id}
                onClick={() => handleCardClick(post)} // Add onClick event
              >
                <h2 className="text-2xl mb-3">
                  {post.title}
                </h2>
                <p className="text-black dark:text-gray-300 mb-4 line-clamp-1">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <p>{post.author.username}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredPosts.length === 0 && !isLoading && !error && (
          <div className="text-center text-xl mt-12 text-gray-400 bg-gray-900/50 p-8 rounded-lg">
            No posts found. Try a different search term.
          </div>
        )}
      </div>

      {/* Modal for displaying post details */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 mx-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedPost.title}</h2>
            <button 
              onClick={closeModal} 
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-full p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto flex-grow mb-4 pr-2">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedPost.content}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p>By: {selectedPost.author.username}</p>
            <p>{new Date(selectedPost.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default AllPosts;

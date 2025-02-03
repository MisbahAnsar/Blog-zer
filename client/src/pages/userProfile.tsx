import type React from "react"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import DialogButton from "@/components/DialogButton"
import { api } from "../utils/api"
import { Search, UserIcon } from "lucide-react"

interface ImageProps {
  fileUrl: string
}

export interface Post {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  createdAt: string
}

const UserProfile = () => {
  const [username, setUsername] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [imageMessage, setImageMessage] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<ImageProps[]>([])
  const [message, setMessage] = useState<string>("")
  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMessage("No file selected")

    if (hasUploadedImage) {
      return setMessage("You have already uploaded a photo.")
    }

    const token = localStorage.getItem("token")
    if (!token) return setMessage("You must be logged in to upload images")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("File uploaded successfully")
        setImages([{ fileUrl: data.imagePath }])
        setHasUploadedImage(true)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("Error uploading file")
    }
  }

  const fetchImages = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setMessage("You must be logged in to view images")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        if (data.fileUrls.length > 0) {
          setImages(data.fileUrls.map((url: string) => ({ fileUrl: url })))
          setHasUploadedImage(true)
        }
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("Error fetching images")
    }
  }

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await api.getUser()
        setUsername(userData.username)
      } catch (error: any) {
        setError(error.message || "Failed to fetch user.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsername()
    fetchImages()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await api.getUserPosts()
        setPosts(postData.data)
        setFilteredPosts(postData.data)
      } catch (error: any) {
        setError(error.message || "Failed to retrieve posts, please try again")
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (posts.length > 0) {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(results);
    }
  }, [searchTerm, posts]);

  const handleNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setFilteredPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg">{error}</div>
      </div>
    )

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto sm:p-6">
        <Navbar />
      </div>

      <div className="max-w-5xl mx-auto bg-white dark:bg-black text-black dark:text-white min-h-screen pb-12">
        {/* Cover Image Section */}
        <div className="relative w-full h-56 sm:h-72 rounded-b-md overflow-hidden shadow-lg">
          {images.length > 0 ? (
            <img src={`http://localhost:5000${images[0].fileUrl}`} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300 rounded-md">
              <p className="text-gray-600 mb-2">No cover image</p>
              <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
                Click to upload
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
          )}

          {!hasUploadedImage && (
            <div className="absolute bottom-4 right-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input type="file" onChange={handleFileChange} className="hidden" id="file-input" accept="image/*" />
                <label
                  htmlFor="file-input"
                  className="bg-white text-blue-500 py-2 px-4 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  Choose File
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Upload
                </button>
              </form>
            </div>
          )}
        </div>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 py-2 rounded-lg">
            {message}
          </div>
        )}

        {/* Profile Section */}
        <div className="px-6 -mt-20 relative z-10">
          <div className="flex flex-col items-start">
            <div className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl">
              <div className="rounded-full bg-white dark:bg-gray-900 h-36 w-36 flex items-center justify-center overflow-hidden">
                <span className="text-5xl">{username?.[0]?.toUpperCase() || "?"}</span>
              </div>
            </div>
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {username || "Username"}
            </h1>
          </div>

          <div className="mt-8">
            {posts.length === 0 ? (
              <div className="text-start space-y-4">
                <DialogButton onNewPost={handleNewPost} buttonText="Add Blog" />
              </div>
            ) : (
              <>
                <div className="max-w-5xl mx-auto mb-8">
                  <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex-1">
                      <input
                        placeholder="Search your blogs..."
                        type="text"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-12 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <DialogButton onNewPost={handleNewPost} buttonText="Create Post" />
                  </form>
                </div>

                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div
                        key={post._id}
                        className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <span>{post.author.username}</span>
                          </div>
                          <time dateTime={post.createdAt} className="font-medium">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      No posts found matching your search.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

// When i was 17 i was in 2022, but i am in 2025 and i am still 17
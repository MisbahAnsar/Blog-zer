//2) Logic for post-related requests

const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, author: req.user.id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // Debugging: Log the request params
    console.log('Deleting post with ID:', req.params.id);

    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      console.log('Post not found:', req.params.id); // Debugging statement
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user requesting deletion is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized to delete this post" });
    }

    // Use deleteOne or remove method on the document
    await Post.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error('Error deleting post:', error); // Debugging statement
    res.status(500).json({ message: "Error deleting post", error });
  }
};

//4) Routes for post endpoints

const express = require('express');
const { createPost, getPosts, deletePost, getUserPosts } = require('../controllers/postControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', protect, createPost);
router.delete('/:id', protect, deletePost);
router.get('/', getPosts);
router.get('/myposts', protect, getUserPosts);

module.exports = router;

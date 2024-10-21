// Routes for user authentication endpoints

const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUsers);

module.exports = router;
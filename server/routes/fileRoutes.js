const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { uploadSingle, getUserImages } = require('../controllers/uploadControllers'); // No 'upload'
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }); // ✅ Define multer inside fileRoutes.js

// Debugging: Log middleware types
console.log("uploadSingle type:", typeof uploadSingle);
console.log("protect type:", typeof protect);
console.log("upload.single('file') type:", typeof upload.single);

// Define routes
router.post('/upload', protect, upload.single('file'), uploadSingle);
router.get('/images', protect, getUserImages);

module.exports = router;

const File = require('../models/File');  
const multer = require('multer');
const fs = require('fs');

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

const upload = multer({ storage });  // This is middleware, not a route handler

// Upload Single File (Authenticated User)
exports.uploadSingle = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    const file = new File({
      originalName: req.file.originalname,
      filename: req.file.filename,
      fileUrl: fileUrl,
      user: req.user._id  // Associate file with user
    });

    await file.save();

    res.json({
      message: 'File uploaded successfully',
      fileUrl: fileUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving file information' });
  }
};

// Get Images Uploaded by Authenticated User
exports.getUserImages = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id });

    if (!files || files.length === 0) return res.status(404).json({ error: 'No files found' });

    const fileUrls = files.map(file => file.fileUrl);

    res.json({
      message: 'Files retrieved successfully',
      fileUrls
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving files' });
  }
};

// module.exports = { uploadSingle, getUserImages };

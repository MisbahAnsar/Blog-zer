const mongoose = require('mongoose');

// Define the File Schema
const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  fileUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Adjust path as necessary
const userRoutes = require('./routes/userRoutes'); // Adjust path as necessary
const postRoutes = require('./routes/postRoutes'); // Adjust path as necessary
const cors = require('cors'); // Import cors
const path = require('path'); // Import path to handle file paths

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: "https://blogzerv0.vercel.app", // Replace with your frontend URL if needed
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Serve static files from the React app (the 'dist' folder)
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // Adjust path accordingly
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

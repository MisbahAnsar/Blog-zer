const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: "https://blogzerv0.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Serve static files from the React app (build folder)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve React's index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

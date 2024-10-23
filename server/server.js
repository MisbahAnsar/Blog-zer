const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors'); 

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
    origin: "https://blogzerv0.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

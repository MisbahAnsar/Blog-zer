const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors'); 
const path = require('path');
const router = require('./routes/fileRoutes');
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     credentials: true, // Allow cookies and credentials
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

const allowedOrigins = [
    "https://blogzers69.vercel.app",
    "https://blogzers.vercel.app",
  ];
  
  app.use(cors({
      origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
          } else {
              callback(new Error("Not allowed by CORS"));
          }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

app.use(express.json());

app.get('/', (_req, res) => {
    // res.send("hello from server")
    res.send("hi from server")
 });

//Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

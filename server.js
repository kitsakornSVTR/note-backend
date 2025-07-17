
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();
const connectDB = require('./config/db');


// Connect to MongoDB
connectDB();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);



// Error handling middleware
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


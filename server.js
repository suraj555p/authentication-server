const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.route'); // Adjust path as necessary

dotenv.config();

const app = express();
// Set up CORS options
const corsOptions = {
    origin: ['http://localhost:3000','https://admin-pannel-one.vercel.app/'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
  };
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const offenderRoutes = require('./routes/offenders');  // Import the routes
const authRoutes = require('./routes/auth');
const responseLogger = require('./middleware/responseLogger');

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse incoming JSON data
app.use(responseLogger);

// Routes
app.use('/api/offenders', offenderRoutes);  // Ensure your API routes are prefixed with '/api'
app.use('/api/auth', authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

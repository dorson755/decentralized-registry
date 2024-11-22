const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());  // Allow all origins by default
app.use(express.json());

connectDB();

app.use('/api/offenders', require('./routes/offenders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

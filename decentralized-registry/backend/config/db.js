const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Log the MONGO_URI (mask sensitive parts in logs to avoid exposure)
        console.log("Attempting to connect to MongoDB with URI:", process.env.MONGO_URI.split('@')[0] + '@<hidden>'); // Hide password for safety

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB Connected");
    } catch (err) {
        // Log the error message for troubleshooting
        console.error("MongoDB connection error:", err.message);
        
        // If authentication fails, log specific error information
        if (err.message.includes('Authentication failed')) {
            console.error("Possible authentication issue. Please check your MongoDB credentials and URI.");
        }

        process.exit(1); // Exit the process if connection fails
    }
};

module.exports = connectDB;

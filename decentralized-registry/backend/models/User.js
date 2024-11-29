const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Role-based access
});

module.exports = mongoose.model('User', UserSchema);

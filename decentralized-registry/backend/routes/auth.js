const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const logger = require('../utils/logger'); // Import the logger


const JWT_SECRET = process.env.JWT_SECRET || 'service1'; // Replace with a strong secret

// Register Route
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        logger.info('Registration attempt:', req.body); // Log the incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err); // Log any errors
            res.status(500).send('Server error');
        }
    }
);

// Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = { userId: user.id, role: user.role };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (err) {
            logger.error(err);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;

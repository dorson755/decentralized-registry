const express = require('express');
const router = express.Router();
const Offender = require('../models/Offender'); // Assuming you have the Offender model
const auth = require('../middleware/auth'); // Import the auth middleware

// POST route to add an offender (secured with auth middleware)
router.post('/add', auth, async (req, res) => {
    const { offenderID, name, courtProof, socialProof, addedBy } = req.body;

    // Check if all required fields are provided
    if (!offenderID || !name || !courtProof || !socialProof || !addedBy) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new offender document
        const newOffender = new Offender({
            offenderID,
            name,
            courtProof,
            socialProof,
            addedBy: req.user.userId, // Use user ID from the token
        });

        // Save the new offender to the database
        await newOffender.save();

        // Return a success response
        res.status(201).json({ message: 'Offender added successfully', offender: newOffender });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET route to fetch offenders (secured with auth middleware)
router.get('/', auth, async (req, res) => {
    try {
        const offenders = await Offender.find(); // Assuming you're using Mongoose
        res.status(200).json(offenders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET route to fetch an offender by offenderID (secured with auth middleware)
router.get('/:offenderID', auth, async (req, res) => {
    try {
        const offender = await Offender.findOne({ offenderID: req.params.offenderID });
        if (!offender) {
            return res.status(404).json({ error: 'Offender not found' });
        }
        res.json(offender);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE route to remove an offender by offenderID (secured with auth middleware)
router.delete('/:offenderID', auth, async (req, res) => {
    try {
        const result = await Offender.deleteOne({ offenderID: req.params.offenderID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Offender not found' });
        }
        res.json({ message: 'Offender removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

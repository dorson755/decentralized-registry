const express = require('express');
const router = express.Router();
const Offender = require('../models/Offender'); // Adjust the path if needed

// Route: Add a new offender
router.post('/add', async (req, res) => {
    try {
        const { offenderID, name, courtProof, socialProof, addedBy } = req.body;

        // Create a new offender object
        const newOffender = new Offender({
            offenderID,
            name,
            courtProof,
            socialProof,
            addedBy,
        });

        // Save the offender to the database
        const savedOffender = await newOffender.save();
        res.status(201).json(savedOffender);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to add offender. Server error.' });
    }
});

// Route: Fetch all offenders
router.get('/', async (req, res) => {
    try {
        const offenders = await Offender.find();
        res.status(200).json(offenders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch offenders. Server error.' });
    }
});

module.exports = router;

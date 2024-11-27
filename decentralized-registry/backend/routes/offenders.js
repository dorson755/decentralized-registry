const express = require('express');
const router = express.Router();
const Offender = require('../models/Offender');  // Assuming you have the Offender model

// POST route to add an offender
router.post('/add', async (req, res) => {
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
            addedBy
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

module.exports = router;
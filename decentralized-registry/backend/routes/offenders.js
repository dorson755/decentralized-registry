const express = require('express');
const Offender = require('../models/Offender');
const router = express.Router();

// Add an offender
router.post('/add', async (req, res) => {
    try {
        const { offenderID, name, courtProof, socialProof, addedBy } = req.body;
        const newOffender = new Offender({ offenderID, name, courtProof, socialProof, addedBy });
        await newOffender.save();
        res.status(201).json(newOffender);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all offenders
router.get('/', async (req, res) => {
    try {
        const offenders = await Offender.find();
        res.status(200).json(offenders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

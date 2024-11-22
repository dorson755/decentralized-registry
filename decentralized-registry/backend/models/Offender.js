const mongoose = require('mongoose');

const OffenderSchema = new mongoose.Schema({
    offenderID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    courtProof: { type: String, required: true },
    socialProof: { type: String, required: true },
    addedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offender', OffenderSchema);

const mongoose = require('mongoose');

// Define the schema for offenders
const OffenderSchema = new mongoose.Schema({
    offenderID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    courtProof: { type: String, required: true },
    socialProof: { type: String, required: true },
    addedBy: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Offender', OffenderSchema, 'offenders');

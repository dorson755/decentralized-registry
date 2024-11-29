const mongoose = require('mongoose');

// Check if the model is already cached
if (mongoose.models['Offender']) {
    // Clear the cached model if it exists
    delete mongoose.models['Offender']; // This clears the cached model
}

const offenderSchema = new mongoose.Schema({
    offenderID: {
        type: String,
        required: true,  // This makes the offenderID field required
    },
    name: {
        type: String,
        required: true
    },
    courtProof: {
        type: String,
        required: true
    },
    socialProof: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        required: true
    }
});

const Offender = mongoose.model('Offender', offenderSchema);

module.exports = Offender;

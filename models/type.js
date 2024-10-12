const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weaknesses: {
        type: [String],
        required: true
    },
    resistances: {
        type: [String],
        required: true
    },
    immunities: {
        type: [String],
        required: true
    }
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    pp: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
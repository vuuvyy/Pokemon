const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abilitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    effect: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ability', abilitySchema);
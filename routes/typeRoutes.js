const express = require('express');
const Type = require('../models/type');
var Pokemon = require('../models/pokemon'); // Assuming you have a Type model

const router = express.Router();



// Route to get all types
router.get('/types', async function (req, res, next) {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





module.exports = router;
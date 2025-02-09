var express = require('express');
var router = express.Router();
var Pokemon = require('../models/pokemon');
var Type = require('../models/type');
var Move = require('../models/move');
var Abilities = require('../models/abilities');



router.post('/', async function (req, res, next) {
    try {
        const newPokemon = new Pokemon(req.body);
        const savedPokemon = await newPokemon.save();
        res.status(201).json(savedPokemon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!deletedPokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.status(200).json({ message: 'Pokemon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/random', async function (req, res, next) {
    try {
        const count = await Pokemon.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomPokemons = await Pokemon.find().skip(random).limit(7);
        res.status(200).json(randomPokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async function (req, res, next) {
    try {
        const allPokemon = await Pokemon.find();
        console.log(allPokemon);
        res.status(200).json(allPokemon);
    } catch (error) {
        console.error("Error fetching Pokemon:", error.message);

        res.status(500).json({ message: error.message });
    }
});
router.get('/top-attack', async function (req, res, next) {
    try {
        const topAttackPokemon = await Pokemon.find().sort({ 'base_stats.attack': -1 }).limit(7);
        res.status(200).json(topAttackPokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/check-duplicates', async (req, res) => {
    try {
        const duplicates = await Pokemon.aggregate([
            {
                $group: {
                    _id: "$name", // Nhóm theo tên Pokémon
                    count: { $sum: 1 } // Đếm số lượng bản ghi cho mỗi tên
                }
            },
            {
                $match: {
                    count: { $gt: 1 } // Chỉ giữ lại các nhóm có số lượng lớn hơn 1
                }
            }
        ]);

        res.status(200).json(duplicates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:name', async function (req, res, next) {
    try {
        const pokemon = await Pokemon.findOne({ name: req.params.name });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/type/:name', async function (req, res, next) {
    try {
        const pokemon = await Pokemon.findOne({ name: req.params.name });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.status(200).json({ type: pokemon.type });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
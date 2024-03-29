const router = require('express').Router();
const Game = require('../models/Game');
const User = require('../models/User');

// create a game
router.post('/', async (req, res) => {
    const newGame = new Game(req.body);

    try {
        const savedGame = await newGame.save();
        res.status(200).json(savedGame);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a game
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (game.userId === req.body.userId) {
            await game.deleteOne();
            res.status(200).json('game has been deleted');
        } else {
            res.status(403).json('you can only delete your game');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a game
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json(err);
    }
});

// like a game
router.put('/:id/like', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        // if user is not in likes array, can like
        if (!game.likes.includes(req.body.userId)) {
            await game.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('The game has been liked');
        } else {
            // if user is in likes array, can unlike
            await game.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('The game has been disliked');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

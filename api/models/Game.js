const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        game: {
            type: Boolean,
            default: true,
        },
        userId: {
            type: String,
            required: true,
        },
        score: {
            type: String,
            default: '0',
            required: true,
        },
        opposingScore: {
            type: String,
            default: '0',
            required: true,
        },
        teammate: {
            type: String,
            required: true,
        },
        opposingTeam: {
            type: Array,
            required: true,
        },
        location: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Game', GameSchema);

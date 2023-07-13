const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        score: {
            type: String,
            required: true,
        },
        opposingScore: {
            type: String,
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
    },
    { timestamps: true }
);

module.exports = mongoose.model('Game', GameSchema);
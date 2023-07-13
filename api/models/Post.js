const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        location: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);

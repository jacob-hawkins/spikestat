const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Game = require('../models/Game');

// create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('post has been updated');
        } else {
            res.status(403).json('you can only update your post');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('post has been deleted');
        } else {
            res.status(403).json('you can only delete your post');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// like a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // if user is not in likes array, can like
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked');
        } else {
            // if user is in likes array, can unlike
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('The post has been disliked');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );

        const userGames = await Game.find({ userId: currentUser._id });
        const friendGames = await Promise.all(
            currentUser.following.map((friendId) => {
                return Game.find({ userId: friendId });
            })
        );
        
        const all = userPosts.concat(...friendPosts, ...userGames, ...friendGames);

        res.status(200).json(all);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user posts
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// comment on a post
router.put('/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = {
            user: req.body.user,
            comment: req.body.comment,
        };

        await post.updateOne({ $push: { comments: comment } });
        res.status(200).json('You have commented on the post');
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment on a post
router.delete('/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = {
            userId: req.body.userId,
            comment: req.body.comment,
        };

        if (!post.comments.includes(req.body.userId)) {
            await post.updateOne({ $pull: { comments: comment } });
            res.status(200).json('You have delete the comment on the post');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

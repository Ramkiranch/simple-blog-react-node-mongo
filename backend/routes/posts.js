// Author: Ram Chevendra
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Get single post
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

// Create new post
router.post('/', async (req, res) => {
    const { title, body, author, username, imageUrl } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    const newPost = new Post({ title, body, author, username, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
});

// Update post
router.put('/:id', async (req, res) => {
    const { title, body } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { title, body },
        { new: true }
    );
    res.json(updatedPost);
});

// Delete post
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted' });
});

module.exports = router;

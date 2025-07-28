// Author: Ram Chevendra
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user to req
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
}

// Get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add a comment to a post (only for logged-in users)
router.post('/:postId', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text required' });
    const comment = new Comment({
      postId: req.params.postId,
      userId: req.userId,
      username: req.username,
      text
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;

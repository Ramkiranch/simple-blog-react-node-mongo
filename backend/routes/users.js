const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user to req
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

// Update profile (name, email)
router.put('/:id', authMiddleware, async (req, res) => {
  console.log('Profile update attempt:', { tokenUserId: req.userId, paramId: req.params.id });
  if (String(req.userId) !== String(req.params.id)) {
    console.log('ID mismatch:', { tokenUserId: req.userId, paramId: req.params.id });
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select('-password -username');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ name: user.name, email: user.email, lastLogin: user.lastLogin });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;

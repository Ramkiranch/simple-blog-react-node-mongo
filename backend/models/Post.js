// Author: Ram Chevendra
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    username: { type: String, required: true }, // Link to User.username
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', PostSchema);

// Author: Ram Chevendra
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb', {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));


// Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
app.use('/api/posts', postsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

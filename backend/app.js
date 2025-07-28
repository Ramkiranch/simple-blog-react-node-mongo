// Author: Ram Chevendra
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend origin
  credentials: true,
};
// CORS middleware should be at the very top
app.use(cors(corsOptions));
app.use(express.json());

// Multer for file uploads
const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
const commentsRoute = require('./routes/comments');
app.use('/api/posts', postsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the URL to access the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const request = require('supertest');
const express = require('express');
const usersRoute = require('../routes/users');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/users', usersRoute);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/blogdb_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('User API', () => {
  let user, token;
  beforeAll(async () => {
    user = new User({ username: 'user1', password: 'pass', name: 'User One', email: 'user1@example.com' });
    await user.save();
    token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'User Updated', email: 'updated@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('User Updated');
    expect(res.body.email).toBe('updated@example.com');
  });

  it('should not update profile without token', async () => {
    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ name: 'User Updated', email: 'updated@example.com' });
    expect(res.statusCode).toBe(401);
  });

  it('should not update another user profile', async () => {
    const res = await request(app)
      .put(`/api/users/invalidid`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Hacker', email: 'hacker@example.com' });
    expect(res.statusCode).toBe(403);
  });
});

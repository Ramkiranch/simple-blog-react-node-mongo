const request = require('supertest');
const express = require('express');
const authRoute = require('../routes/auth');
const usersRoute = require('../routes/users');
const mongoose = require('mongoose');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
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

describe('Auth & User API', () => {
  let token, userId;
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpass', name: 'Test User', email: 'test@example.com' });
    expect(res.statusCode).toBe(201);
  });

  it('should login and return token/user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
    token = res.body.token;
    userId = res.body.user.id;
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name', email: 'updated@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Name');
    expect(res.body.email).toBe('updated@example.com');
  });

  it('should not update another user profile', async () => {
    const res = await request(app)
      .put(`/api/users/invalidid`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Hacker', email: 'hacker@example.com' });
    expect(res.statusCode).toBe(403);
  });
});

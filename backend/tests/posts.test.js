// Author: Ram Chevendra
const request = require('supertest');
const express = require('express');
const postsRoute = require('../routes/posts');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/api/posts', postsRoute);

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

describe('Posts API', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', body: 'Test Body', author: 'Tester', username: 'testuser' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Post');
  });

  it('should get all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a post by id', async () => {
    const postRes = await request(app)
      .post('/api/posts')
      .send({ title: 'Another Post', body: 'Body', author: 'Tester', username: 'testuser' });
    const id = postRes.body._id;
    const res = await request(app).get(`/api/posts/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(id);
  });
});

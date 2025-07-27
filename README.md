
# Simple Blog Platform (React + Node.js/Express + MongoDB)

## Getting Started

### 1. Local Development

- Backend:
  ```
  cd backend
  npm install
  npm run dev
  ```
- Frontend:
  ```
  cd frontend
  npm install
  npm start
  ```
- MongoDB: Ensure local MongoDB is running (`MONGO_URI` default is `mongodb://localhost:27017/blogdb`)

### 2. Docker Setup (Recommended)

This project includes Docker and docker-compose for easy setup of backend, frontend, and MongoDB.

#### Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and ensure Docker daemon is running.

#### Steps
1. In the project root, run:
   ```
   docker-compose up --build
   ```
   This will build and start:
   - Backend (Node.js/Express) on port 5001
   - Frontend (React) on port 3000
   - MongoDB (with persistent volume)

2. Access the app:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5001/api](http://localhost:5001/api)

3. To stop containers:
   ```
   docker-compose down
   ```

4. Data Persistence:
   - MongoDB data is stored in a named Docker volume (`mongo_data`).
   - Data will persist across container restarts unless you remove the volume:
     ```
     docker volume rm simple-blog-platform_mongo_data
     ```

## Features

- List all blog posts
- View post details
- Create new post
- Authentication (login/register)
- JWT-based user sessions
- Responsive UI, navigation bar, breadcrumbs, skeleton screens

---

**Docker setup recommended for production or team development.**

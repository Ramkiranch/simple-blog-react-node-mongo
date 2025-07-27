// Author: Ram Chevendra
import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import "./BlogInspire.css";

function App() {
  return (
    <div className="blog-fullpage-bg">
      <NavBar />
      <main className="blog-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
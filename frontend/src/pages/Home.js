import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5001/api/posts")
      .then(res => setPosts(res.data));
  }, []);
  console.log('Home component rendered');
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2 className="home-title">All Blog Posts</h2>
      {user && <Link to="/create"><button className="create-btn">Create New Post</button></Link>}
      {posts.length === 0 && (
        <div style={{color: '#888', fontSize: 18, marginTop: 32}}>No posts yet. Be the first to create one!</div>
      )}
      {posts.map(post => (
        <div key={post._id} className="post-preview post-hover">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="author-avatar">
              {post.author ? post.author[0].toUpperCase() : 'A'}
            </div>
            <div style={{flex: 1}}>
              <Link to={`/posts/${post._id}`} style={{textDecoration: 'none'}}>
                <h3>{post.title}</h3>
              </Link>
              <div className="post-meta">
                by {post.author || 'Anonymous'}
                {post.createdAt && (
                  <span> &middot; {new Date(post.createdAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
          {post.body && (
            <p>{post.body.length > 120 ? post.body.slice(0, 120) + '...' : post.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

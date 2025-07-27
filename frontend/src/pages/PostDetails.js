// Author: Ram Chevendra
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5001/api/posts/${id}`)
      .then(res => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="post-details-fullpage-bg">
      <div className="post-details-card post-details-card-full">
        <div className="skeleton-title" />
        <div className="skeleton-meta" />
        <div className="skeleton-body" />
      </div>
    </div>
  );

  return (
    <div className="post-details-fullpage-bg">
      <div style={{marginBottom: 16}}>
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <span style={{marginLeft: 12, color: '#888'}}>
          <Link to="/">Home</Link> / <span>{post.title}</span>
        </span>
      </div>
      <div className="post-details-card post-details-card-full">
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 18}}>
          <div className="author-avatar">
            {post.author ? post.author[0].toUpperCase() : 'A'}
          </div>
          <div>
            <div style={{fontSize: 18, fontWeight: 600, color: '#222'}}>{post.author || 'Anonymous'}</div>
            <div className="post-details-meta">{post.createdAt && new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>
        <h2 className="post-details-title">{post.title}</h2>
        <div className="post-details-body">{post.body}</div>
      </div>
    </div>
  );
}

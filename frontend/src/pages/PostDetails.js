// Author: Ram Chevendra
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function PostDetails() {
  const { id } = useParams();
  const { user, token } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5001/api/posts/${id}`)
      .then(res => setPost(res.data))
      .finally(() => setLoading(false));
    axios.get(`http://localhost:5001/api/comments/${id}`)
      .then(res => setComments(res.data));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    await axios.post(
      `http://localhost:5001/api/comments/${id}`,
      { text: commentText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCommentText("");
    const res = await axios.get(`http://localhost:5001/api/comments/${id}`);
    setComments(res.data);
    setCommentLoading(false);
  };

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
        {post.imageUrl && (
          <div style={{margin: '18px 0'}}>
            <img src={`http://localhost:5001${post.imageUrl}`} alt="Post" style={{maxWidth: '100%', maxHeight: 350, borderRadius: 8}} />
          </div>
        )}
        <div className="post-details-body">{post.body}</div>
        <hr style={{margin: '32px 0 16px 0'}} />
        <h3>Comments</h3>
        {comments.length === 0 && <div>No comments yet.</div>}
        <ul style={{paddingLeft: 0}}>
          {comments.map(c => (
            <li key={c._id} style={{marginBottom: 12, listStyle: 'none'}}>
              <b>{c.username}</b>: {c.text} <span style={{color:'#888', fontSize:12}}>{new Date(c.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        {user ? (
          <form onSubmit={handleComment} style={{marginTop: 16}}>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              style={{width: '100%', padding: 8}}
              disabled={commentLoading}
            />
            <button type="submit" style={{marginTop: 8}} disabled={commentLoading || !commentText.trim()}>Post Comment</button>
          </form>
        ) : (
          <div style={{marginTop: 16}}>Please log in to comment.</div>
        )}
      </div>
    </div>
  );
}

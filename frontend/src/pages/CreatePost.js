import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
// Author: Ram Chevendra
import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await axios.post('http://localhost:5001/api/posts', {
        title,
        body,
        author: user.name,
        username: user.username
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-fullpage-bg">
      <form className="create-form create-form-full" onSubmit={handleSubmit}>
        <h2 className="home-title">Create New Post</h2>
        {loading && <div className="skeleton-title" />}
        {success && <div style={{color: 'green', marginBottom: 12}}>Post created successfully!</div>}
        {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
        <input className="create-input-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} disabled={loading} />
        <input className="create-input-full" placeholder="Author" value={user?.name || ''} readOnly disabled={loading} />
        <textarea className="create-textarea-full" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} disabled={loading} />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
}

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5001/api/auth/register', { username, password, name, email });
      // Auto-login after registration
      const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="create-fullpage-bg">
      <form className="create-form create-form-full" onSubmit={handleSubmit}>
        <h2 className="home-title">Register</h2>
        {error && <div style={{color: 'red', marginBottom: 12}}>{error}</div>}
        <input className="create-input-full" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="create-input-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="create-input-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="create-input-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Register</button>
        <div style={{marginTop: 16, textAlign: 'center'}}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}

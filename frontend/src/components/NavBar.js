// Author: Ram Chevendra
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">📝 Simple Blog Platform</Link>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        {user && <Link to="/create" className={location.pathname === '/create' ? 'active' : ''}>Create Post</Link>}
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="navbar-user-menu">
            <span className="navbar-avatar">{user.name[0].toUpperCase()}</span>
            <span className="navbar-username">{user.name}</span>
            <Link to="/profile">Profile</Link>
            <button className="navbar-logout" onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

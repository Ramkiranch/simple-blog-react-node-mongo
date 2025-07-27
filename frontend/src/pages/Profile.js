// Author: Ram Chevendra
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function Profile() {
  const { user, token, login } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [lastLogin, setLastLogin] = useState(user?.lastLogin || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <div style={{padding: 32}}>Please login to view your profile.</div>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await axios.put(`http://localhost:5001/api/users/${user.id}`, {
        name,
        email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      login({ ...user, name: res.data.name, email: res.data.email, lastLogin: res.data.lastLogin }, token);
      setLastLogin(res.data.lastLogin);
      setSuccess(true);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleUpdate}>
        <div><b>Name:</b> <input value={name} onChange={e => setName(e.target.value)} disabled={loading} /></div>
        <div><b>Email:</b> <input value={email} onChange={e => setEmail(e.target.value)} disabled={loading} /></div>
        <div><b>Last Login:</b> <span>{lastLogin ? new Date(lastLogin).toLocaleString() : "-"}</span></div>
        <button type="submit" disabled={loading}>Update Profile</button>
        {success && <div style={{color: 'green', marginTop: 12}}>Profile updated!</div>}
        {error && <div style={{color: 'red', marginTop: 12}}>{error}</div>}
      </form>
    </div>
  );
}

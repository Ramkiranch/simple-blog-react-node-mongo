import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './pages/Login';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

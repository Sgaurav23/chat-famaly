import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://wax-sphenoid-hill.glitch.me/api/auth/login', { username, password });
      const { token, user } = response.data; // Assume the backend returns a token and user info upon successful login
      localStorage.setItem('token', token); // Save the token to local storage
      localStorage.setItem('user', JSON.stringify(user)); // Save the user info to local storage
      alert('User logged in');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error logging in user:', error.response?.data || error.message);
      alert('Error logging in user');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

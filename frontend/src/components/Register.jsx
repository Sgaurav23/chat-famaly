import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://wax-sphenoid-hill.glitch.me/api/auth/register', { username, password, email });
      const { token, user } = response.data; // Assume the backend returns a token and user info upon successful registration
      localStorage.setItem('token', token); // Save the token to local storage
      localStorage.setItem('user', JSON.stringify(user)); // Save the user info to local storage
      alert('User registered');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('Error registering user');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;


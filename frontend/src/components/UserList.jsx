import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './UserList.css'; // Import the CSS file

function UserList({ setSelectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          throw new Error('No token found');
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.get('https://wax-sphenoid-hill.glitch.me/api/auth/users', config); // Ensure this URL matches the endpoint
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h3>Available Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            <button onClick={() => setSelectedUser(user.username)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

UserList.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};

export default UserList;

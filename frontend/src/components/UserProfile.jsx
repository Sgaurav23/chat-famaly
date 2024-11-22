import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './UserProfile.css'; // Import the CSS file

function UserProfile({ user, onUserRemoved }) {
  const handleRemoveUser = async () => {
    try {
      console.log('User object in UserProfile:', user); // Debugging
      const userId = user.id; // Ensure user.id is used correctly
      console.log(`Attempting to remove user with id: ${userId}`); // Debugging
      if (!userId) {
        throw new Error('User ID is undefined');
      }
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`https://wax-sphenoid-hill.glitch.me/api/auth/users/${userId}`, config);
      onUserRemoved(userId); // Call the onUserRemoved callback
    } catch (error) {
      console.error('Error removing user:', error);
      alert('Error removing user');
    }
  };

  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleRemoveUser}>Remove User</button>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  onUserRemoved: PropTypes.func.isRequired,
};

export default UserProfile;

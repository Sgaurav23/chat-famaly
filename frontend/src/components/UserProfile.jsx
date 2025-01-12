// import React from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// // import './UserProfile.css'; // Import the CSS file

// function UserProfile({ user, onUserRemoved }) {
//   const handleRemoveUser = async () => {
//     try {
//       console.log('User object in UserProfile:', user); // Debugging
//       const userId = user.id; // Ensure user.id is used correctly
//       console.log(`Attempting to remove user with id: ${userId}`); // Debugging
//       if (!userId) {
//         throw new Error('User ID is undefined');
//       }
//       const token = localStorage.getItem('token'); // Get token from localStorage
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };
//       await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, config);
//       onUserRemoved(userId); // Call the onUserRemoved callback
//     } catch (error) {
//       console.error('Error removing user:', error);
//       alert('Error removing user');
//     }
//   };

//   return (
//     <div className="user-profile">
//       <h3>User Profile</h3>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <button onClick={handleRemoveUser}>Remove User</button>
//     </div>
//   );
// }

// UserProfile.propTypes = {
//   user: PropTypes.object.isRequired,
//   onUserRemoved: PropTypes.func.isRequired,
// };

// export default UserProfile;














import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './UserProfile.css'; // Import the CSS file

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
    <div className="text-white">
      <h3 className="text-xl font-bold mb-4">User Profile</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">
              {user.username ? user.username[0].toUpperCase() : '?'}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="font-medium">{user.username}</div>
            <div className="text-sm text-gray-300">{user.email}</div>
          </div>
        </div>
  
        <button 
          onClick={handleRemoveUser}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Remove User</span>
        </button>
      </div>
    </div>
  );
  
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  onUserRemoved: PropTypes.func.isRequired,
};

export default UserProfile;

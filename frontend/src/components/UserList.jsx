// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// // import './UserList.css'; // Import the CSS file

// function UserList({ setSelectedUser }) {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from localStorage
//         if (!token) {
//           throw new Error('No token found');
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` }
//         };
//         const { data } = await axios.get('http://localhost:5000/api/auth/users', config); // Ensure this URL matches the endpoint
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="user-list">
//       <h3>Available Users</h3>
//       <ul>
//         {users.map(user => (
//           <li key={user._id}>
//             <strong>Username:</strong> {user.username} <br />
//             <strong>Email:</strong> {user.email} <br />
//             <button onClick={() => setSelectedUser(user.username)}>Chat</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// UserList.propTypes = {
//   setSelectedUser: PropTypes.func.isRequired,
// };

// export default UserList;










import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './UserList.css'; // Import the CSS file

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
    <div className="h-full flex flex-col">
      <h3 className="p-4 text-xl font-bold text-white border-b border-white/20">
        Available Users
      </h3>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-white/10">
          {users.map(user => (
            <li key={user._id} className="p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
  <span className="text-white font-medium">
    {user.username ? user.username[0].toUpperCase() : '?'}
  </span>
</div>

                    <span className="text-white font-medium">{user.username}</span>
                  </div>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
                
                <button 
                  onClick={() => setSelectedUser(user.username)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

UserList.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};

export default UserList;

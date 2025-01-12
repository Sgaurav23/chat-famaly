// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserList from './UserList';
// import Chat from './Chat';
// import UserProfile from './UserProfile';
// import axios from 'axios';
// // import './Dashboard.css'; // Import CSS file for styling

// function Dashboard() {
//   const [selectedUser, setSelectedUser] = useState('');
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true); // Add loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser && storedUser !== 'undefined') {
//           const parsedUser = JSON.parse(storedUser);
//           console.log('Stored User:', parsedUser); // Debugging
//           setUser(parsedUser);
//           setLoading(false); // Data fetching complete
//         } else {
//           const token = localStorage.getItem('token'); // Get token from localStorage
//           if (!token) {
//             throw new Error('No token found');
//           }
//           const config = {
//             headers: { Authorization: `Bearer ${token}` }
//           };
//           const { data } = await axios.get('http://localhost:5000/api/auth/profile', config); 
//           console.log('Fetched User:', data); // Debugging
//           setUser(data);
//           localStorage.setItem('user', JSON.stringify(data)); // Save user data to localStorage
//           setLoading(false); // Data fetching complete
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         navigate('/login');
//       }
//     };

//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from localStorage
//         if (!token) {
//           throw new Error('No token found');
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` }
//         };
//         const { data } = await axios.get('http://localhost:5000/api/auth/users', config); // Fetch list of users
//         console.log('Fetched Users:', data); // Debugging
//         // Save users data to state
//         // setUsers(data); // Uncomment or add this if you need users in Dashboard component
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUser();
//     fetchUsers();
//   }, [navigate]);

//   const handleUserRemoved = (userId) => {
//     if (user.id === userId) { // Use user.id instead of user._id
//       setUser({});
//       localStorage.removeItem('user'); // Remove user data from localStorage
//       setSelectedUser(''); // Clear selected user
//       navigate('/register'); // Redirect to registration page
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display loading indicator while fetching data
//   }

//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>
//       <UserProfile user={user} onUserRemoved={handleUserRemoved} /> 
//       <div className="dashboard-container">
//         <UserList setSelectedUser={setSelectedUser} />
//         {selectedUser && <Chat selectedUser={selectedUser} currentUser={user.username} />} {/* Pass currentUser */}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import Chat from './Chat';
import UserProfile from './UserProfile';
import axios from 'axios';
// import './Dashboard.css'; // Import CSS file for styling

function Dashboard() {
  const [selectedUser, setSelectedUser] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
          const parsedUser = JSON.parse(storedUser);
          console.log('Stored User:', parsedUser); // Debugging
          setUser(parsedUser);
          setLoading(false); // Data fetching complete
        } else {
          const token = localStorage.getItem('token'); // Get token from localStorage
          if (!token) {
            throw new Error('No token found');
          }
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const { data } = await axios.get('https://wax-sphenoid-hill.glitch.me/api/auth/profile', config); 
          console.log('Fetched User:', data); // Debugging
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data)); // Save user data to localStorage
          setLoading(false); // Data fetching complete
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login');
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          throw new Error('No token found');
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.get('https://wax-sphenoid-hill.glitch.me/api/auth/users', config); // Fetch list of users
        console.log('Fetched Users:', data); // Debugging
        // Save users data to state
        // setUsers(data); // Uncomment or add this if you need users in Dashboard component
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUser();
    fetchUsers();
  }, [navigate]);

  const handleUserRemoved = (userId) => {
    if (user.id === userId) { // Use user.id instead of user._id
      setUser({});
      localStorage.removeItem('user'); // Remove user data from localStorage
      setSelectedUser(''); // Clear selected user
      navigate('/register'); // Redirect to registration page
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Mobile Navigation - Fixed */}
      <div className="lg:hidden flex bg-white/20 backdrop-blur-lg">
        <button 
          className={`flex-1 p-4 text-white font-semibold ${!selectedUser ? 'bg-white/20' : ''}`}
          onClick={() => setSelectedUser('')}
        >
          Users
        </button>
        <button 
          className={`flex-1 p-4 text-white font-semibold ${selectedUser ? 'bg-white/20' : ''}`}
          onClick={() => selectedUser && null}
        >
          Chat
        </button>
      </div>
  
      {/* Scrollable Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row p-2 md:p-6 gap-6 overflow-y-auto">
        {/* Left Panel with Scrollable Sections */}
        <div className={`w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-6 min-h-min
          ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>
          {/* Profile Section - Fixed Height */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl">
            <UserProfile user={user} onUserRemoved={handleUserRemoved} />
          </div>
          
          {/* User List Section - Scrollable */}
          <div className="flex-1 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="h-full overflow-y-auto">
              <UserList setSelectedUser={setSelectedUser} />
            </div>
          </div>
        </div>
  
        {/* Right Panel - Chat Area with Scroll */}
        <div className={`flex-1 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden 
          ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>
          {selectedUser ? (
            <Chat 
              selectedUser={selectedUser} 
              currentUser={user.username}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-4 md:p-6">
              <div className="text-center text-white">
                <span className="block text-6xl md:text-7xl mb-4 md:mb-6">👋</span>
                <p className="text-xl md:text-3xl font-bold">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
  
}

export default Dashboard;
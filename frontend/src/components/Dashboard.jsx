import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import Chat from './Chat';
import UserProfile from './UserProfile';
import axios from 'axios';
import './Dashboard.css'; // Import CSS file for styling

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
    <div className="dashboard">
      <h2>Dashboard</h2>
      <UserProfile user={user} onUserRemoved={handleUserRemoved} /> 
      <div className="dashboard-container">
        <UserList setSelectedUser={setSelectedUser} />
        {selectedUser && <Chat selectedUser={selectedUser} currentUser={user.username} />} {/* Pass currentUser */}
      </div>
    </div>
  );
}

export default Dashboard;

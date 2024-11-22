import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import './Chat.css'

const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';

function Chat({ selectedUser, currentUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); // Add socket state

  useEffect(() => {
    // Initialize Socket.IO
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    if (currentUser && selectedUser) {
      const room = [currentUser, selectedUser].sort().join('-');
      newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser });

      // Fetch initial messages for the current user and selected user
      const fetchMessages = async () => {
        const { data } = await axios.get(`https://wax-sphenoid-hill.glitch.me/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
        setMessages(data);
      };
      fetchMessages();

      // Listen for incoming messages
      newSocket.on('receiveMessage', (message) => {
        if ((message.sender === currentUser && message.receiver === selectedUser) || 
            (message.sender === selectedUser && message.receiver === currentUser)) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, currentUser]);

  const sendMessage = () => {
    if (selectedUser && message && socket) { // Ensure socket is defined
      const newMessage = {
        sender: currentUser, // Use current user's username
        receiver: selectedUser,
        content: message,
      };
      socket.emit('sendMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to state
      setMessage('');
    }
  };

  const removeChat = async () => {
    try {
      await axios.delete(`https://wax-sphenoid-hill.glitch.me/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
      setMessages([]); // Clear local messages state
    } catch (error) {
      console.error('Error removing chat:', error);
      alert('Error removing chat');
    }
  };

  return (
    <div className="chat-container">
      <h3 className="chat-header">Chat with {selectedUser}</h3>
      <button className="remove-chat-button" onClick={removeChat}>Remove Chat</button> {/* Add Remove Chat Button */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

Chat.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired, // Add propTypes for currentUser
};

export default Chat;

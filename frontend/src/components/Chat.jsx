// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';
// import './Chat.css'

// const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';

// function Chat({ selectedUser, currentUser }) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null); // Add socket state

//   useEffect(() => {
//     // Initialize Socket.IO
//     const newSocket = socketIOClient(ENDPOINT);
//     setSocket(newSocket);

//     if (currentUser && selectedUser) {
//       const room = [currentUser, selectedUser].sort().join('-');
//       newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser });

//       // Fetch initial messages for the current user and selected user
//       const fetchMessages = async () => {
//         const { data } = await axios.get(`https://wax-sphenoid-hill.glitch.me/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
//         setMessages(data);
//       };
//       fetchMessages();

//       // Listen for incoming messages
//       newSocket.on('receiveMessage', (message) => {
//         if ((message.sender === currentUser && message.receiver === selectedUser) || 
//             (message.sender === selectedUser && message.receiver === currentUser)) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//         }
//       });
//     }

//     // Cleanup on component unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [selectedUser, currentUser]);

//   const sendMessage = () => {
//     if (selectedUser && message && socket) { // Ensure socket is defined
//       const newMessage = {
//         sender: currentUser, // Use current user's username
//         receiver: selectedUser,
//         content: message,
//       };
//       socket.emit('sendMessage', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to state
//       setMessage('');
//     }
//   };

//   const removeChat = async () => {
//     try {
//       await axios.delete(`https://wax-sphenoid-hill.glitch.me/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
//       setMessages([]); // Clear local messages state
//     } catch (error) {
//       console.error('Error removing chat:', error);
//       alert('Error removing chat');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h3 className="chat-header">Chat with {selectedUser}</h3>
//       <button className="remove-chat-button" onClick={removeChat}>Remove Chat</button> {/* Add Remove Chat Button */}
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
//             <strong>{msg.sender}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// Chat.propTypes = {
//   selectedUser: PropTypes.string.isRequired,
//   currentUser: PropTypes.string.isRequired, // Add propTypes for currentUser
// };

// export default Chat;
























// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';

// const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';

// function Chat({ selectedUser, currentUser }) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null); // Add socket state

//   useEffect(() => {
//     // Initialize Socket.IO
//     const newSocket = socketIOClient(ENDPOINT);
//     setSocket(newSocket);

//     if (currentUser && selectedUser) {
//       const room = [currentUser, selectedUser].sort().join('-');
//       newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser });

//       // Fetch initial messages for the current user and selected user
//       const fetchMessages = async () => {
//         const { data } = await axios.get(`https://wax-sphenoid-hill.glitch.me/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
//         setMessages(data);
//       };
//       fetchMessages();

//       // Listen for incoming messages
//       newSocket.on('receiveMessage', (message) => {
//         if ((message.sender === currentUser && message.receiver === selectedUser) || 
//             (message.sender === selectedUser && message.receiver === currentUser)) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//         }
//       });
//     }

//     // Cleanup on component unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [selectedUser, currentUser]);

//   const sendMessage = () => {
//     if (selectedUser && message && socket) { // Ensure socket is defined
//       const newMessage = {
//         sender: currentUser, // Use current user's username
//         receiver: selectedUser,
//         content: message,
//       };
//       socket.emit('sendMessage', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to state
//       setMessage('');
//     }
//   };

//   const removeChat = async () => {
//     try {
//       await axios.delete(`https://wax-sphenoid-hill.glitch.me/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
//       setMessages([]); // Clear local messages state
//     } catch (error) {
//       console.error('Error removing chat:', error);
//       alert('Error removing chat');
//     }
//   };

//   return (
//     <div>
//       <h3>Chat with {selectedUser}</h3>
//       <button onClick={removeChat}>Remove Chat</button> {/* Add Remove Chat Button */}
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
//             <strong>{msg.sender}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// Chat.propTypes = {
//   selectedUser: PropTypes.string.isRequired,
//   currentUser: PropTypes.string.isRequired, // Add propTypes for currentUser
// };

// export default Chat;
































// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';
// // const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';
// const ENDPOINT = 'http://localhost:5000';

// function Chat({ selectedUser, currentUser }) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!selectedUser || !currentUser) return;

//     const newSocket = socketIOClient(ENDPOINT);
//     setSocket(newSocket);

//     const room = [currentUser, selectedUser].sort().join('-');
//     newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser }); // Updated to match server expectations

//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();

//     // Improved message receiving logic
//     newSocket.on('receiveMessage', (newMessage) => {
//       setMessages(prevMessages => {
//         // Check if message already exists to prevent duplicates
//         const messageExists = prevMessages.some(msg => 
//           msg._id === newMessage._id || 
//           (msg.content === newMessage.content && 
//            msg.sender === newMessage.sender && 
//            msg.receiver === newMessage.receiver)
//         );
//         if (!messageExists) {
//           return [...prevMessages, newMessage];
//         }
//         return prevMessages;
//       });
//     });

//     return () => {
//       newSocket.disconnect();
//     };
// }, [selectedUser, currentUser]);


//   const sendMessage = () => {
//     if (selectedUser && message && socket) {
//       const newMessage = {
//         sender: currentUser,
//         receiver: selectedUser,
//         content: message,
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]); // Ensure message state update before emitting
//       socket.emit('sendMessage', newMessage, (error) => {
//         if (error) {
//           console.error('Error sending message:', error);
//           setMessages((prevMessages) => prevMessages.filter(msg => msg !== newMessage)); // Remove from state if there's an error
//         } else {
//           console.log('Message sent:', newMessage); // Debugging
//         }
//       });
//       setMessage('');
//     }
//   };

//   const removeChat = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
//       setMessages([]);
//     } catch (error) {
//       console.error('Error removing chat:', error);
//       alert('Error removing chat');
//     }
//   };

//   return (
//     <div>
//       <h3>Chat with {selectedUser}</h3>
//       <button onClick={removeChat}>Remove Chat</button>
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
//             <strong>{msg.sender}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// Chat.propTypes = {
//   selectedUser: PropTypes.string.isRequired,
//   currentUser: PropTypes.string.isRequired,
// };

// export default Chat;

















// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';
// // const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';
// const ENDPOINT = 'http://localhost:5000';


// function Chat({ selectedUser, currentUser }) {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!selectedUser || !currentUser) return;

//     const newSocket = socketIOClient(ENDPOINT);
//     setSocket(newSocket);

//     const room = [currentUser, selectedUser].sort().join('-');
//     newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser }); // Updated to match server expectations

//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();

//     // Improved message receiving logic
//     newSocket.on('receiveMessage', (newMessage) => {
//       setMessages(prevMessages => {
//         // Check if message already exists to prevent duplicates
//         const messageExists = prevMessages.some(msg => 
//           msg._id === newMessage._id || 
//           (msg.content === newMessage.content && 
//            msg.sender === newMessage.sender && 
//            msg.receiver === newMessage.receiver)
//         );
//         if (!messageExists) {
//           return [...prevMessages, newMessage];
//         }
//         return prevMessages;
//       });
//     });

//     return () => {
//       newSocket.disconnect();
//     };
// }, [selectedUser, currentUser]);


//   const sendMessage = () => {
//     if (selectedUser && message && socket) {
//       const newMessage = {
//         sender: currentUser,
//         receiver: selectedUser,
//         content: message,
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]); // Ensure message state update before emitting
//       socket.emit('sendMessage', newMessage, (error) => {
//         if (error) {
//           console.error('Error sending message:', error);
//           setMessages((prevMessages) => prevMessages.filter(msg => msg !== newMessage)); // Remove from state if there's an error
//         } else {
//           console.log('Message sent:', newMessage); // Debugging
//         }
//       });
//       setMessage('');
//     }
//   };

//   const removeChat = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
//       setMessages([]);
//     } catch (error) {
//       console.error('Error removing chat:', error);
//       alert('Error removing chat');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Header */}
//       <div className="flex items-center justify-between p-4 border-b bg-indigo-600">
//         <h3 className="text-xl font-semibold text-white">Chat with {selectedUser}</h3>
//         <button 
//           onClick={removeChat}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//         >
//           Remove Chat
//         </button>
//       </div>
  
//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-300">
//         {messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
//           >
//             <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
//               msg.sender === currentUser 
//                 ? 'bg-indigo-500 text-white rounded-tr-none' 
//                 : 'bg-gray-200 text-gray-800 rounded-tl-none'
//             }`}>
//               <div className="text-sm font-medium mb-1">{msg.sender}</div>
//               <div className="break-words">{msg.content}</div>
//             </div>
//           </div>
//         ))}
//       </div>
  
//       {/* Message Input */}
//       <div className="p-4 border-t bg-green-300">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button 
//             onClick={sendMessage}
//             className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
  
// }

// Chat.propTypes = {
//   selectedUser: PropTypes.string.isRequired,
//   currentUser: PropTypes.string.isRequired,
// };

// export default Chat;














import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'https://wax-sphenoid-hill.glitch.me';

function Chat({ selectedUser, currentUser, setLastMessageFrom }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    const room = [currentUser, selectedUser].sort().join('-');
    newSocket.emit('joinRoom', { sender: currentUser, receiver: selectedUser });

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`https://wax-sphenoid-hill.glitch.me/api/messages/inbox?user1=${currentUser}&user2=${selectedUser}`);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    newSocket.on('receiveMessage', (newMessage) => {
      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => 
          msg._id === newMessage._id || 
          (msg.content === newMessage.content && 
           msg.sender === newMessage.sender && 
           msg.receiver === newMessage.receiver)
        );
        if (!messageExists) {
          setLastMessageFrom(newMessage.sender);
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, currentUser, setLastMessageFrom]);

  const sendMessage = () => {
    if (selectedUser && message && socket) {
      const newMessage = {
        sender: currentUser,
        receiver: selectedUser,
        content: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage, (error) => {
        if (error) {
          console.error('Error sending message:', error);
          setMessages((prevMessages) => prevMessages.filter(msg => msg !== newMessage));
        }
      });
      setMessage('');
    }
  };

  const removeChat = async () => {
    try {
      await axios.delete(`https://wax-sphenoid-hill.glitch.me/api/messages/remove?sender=${currentUser}&receiver=${selectedUser}`);
      setMessages([]);
    } catch (error) {
      console.error('Error removing chat:', error);
      alert('Error removing chat');
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between p-4 border-b bg-indigo-600">
        <h3 className="text-xl font-semibold text-white">Chat with {selectedUser}</h3>
        <button 
          onClick={removeChat}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Remove Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-300">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
              msg.sender === currentUser 
                ? 'bg-indigo-500 text-white rounded-tr-none' 
                : 'bg-gray-200 text-gray-800 rounded-tl-none'
            }`}>
              <div className="text-sm font-medium mb-1">{msg.sender}</div>
              <div className="break-words">{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full p-4 border-t bg-green-300">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  setLastMessageFrom: PropTypes.func.isRequired,
};

export default Chat;

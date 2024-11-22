const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { User, Message } = require('./schema'); // Import the Message model
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);

// Set server timeout to 2 minutes (120000 milliseconds)
server.setTimeout(120000);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://cluster1:cluster@cluster0.ogz3jqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ sender, receiver }) => {
    const room = [sender, receiver].sort().join('-');
    socket.join(room);
  });

  socket.on('sendMessage', async (message) => {
    try {
      const room = [message.sender, message.receiver].sort().join('-');
      const newMessage = new Message(message);
      await newMessage.save();
      io.to(room).emit('receiveMessage', newMessage); // Emit to specific room
    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Add event listener for 'clientError'
server.on('clientError', (err, socket) => {
  console.error('Client error:', err);
  socket.destroy();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

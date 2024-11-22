const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Message } = require('../schema');
const authenticate = require('../authenticate');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send('Username, password, and email are required'); // Validate presence of all fields
    }

    const newUser = new User({ username, password, email });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error registering user:', error); // Log error
    res.status(400).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log the exact error
    res.status(500).send('Error logging in');
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'username email'); // Adjust as necessary to fetch user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
});

router.get('/users', authenticate, async (req, res) => { // Added authenticate middleware
  try {
    const users = await User.find({}, 'username email'); // Fetch all users, returning only username and email
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

router.delete('/users/:id', authenticate, async (req, res) => { // Added authenticate middleware
  try {
    const userId = req.params.id;
    console.log(`Deleting user with id: ${userId}`); // Debugging

    // Delete user
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      // Delete messages where the user is either the sender or receiver
      await Message.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });

      console.log(`User and their messages deleted: ${userId}`); // Confirm user and message deletion
      res.status(200).send('User and their messages deleted');
    } else {
      console.error(`User not found: ${userId}`); // Log user not found
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error deleting user and their messages:', error);
    res.status(500).send('Error deleting user and their messages');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Message } = require('../schema');

router.post('/send', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).send('Message sent');
  } catch (error) {
    res.status(400).send('Error sending message');
  }
});

router.get('/inbox', async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    await Message.deleteMany({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    });
    res.status(200).send('Chat removed');
  } catch (error) {
    res.status(500).send('Error removing chat');
  }
});

module.exports = router;

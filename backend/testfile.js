const mongoose = require('mongoose');
const { User } = require('./schema'); // Adjust the path if necessary

const mongoURI = 'mongodb+srv://cluster1:cluster@cluster0.ogz3jqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return User.deleteMany({});
  })
  .then(() => {
    console.log('All users have been deleted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });

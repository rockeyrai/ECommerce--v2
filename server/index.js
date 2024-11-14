const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .catch(error => console.error('Connection error:', error));

// Define the schema and model
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {type:String},
  phoneNumber: Number,
  password: String,
  fullName: String,
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Route to create a new user
app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
});

// Route to retrieve all users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving users', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

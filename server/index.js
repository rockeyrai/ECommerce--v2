const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Check for SECRET_KEY
if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));

// Define the schema and model
const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, unique: true },
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
    const emailExist = await User.exists({ email: req.body.email });
    if (emailExist) {
      return res.status(409).send({ msg: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
});

// Route to login a user
app.post('/login', async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ msg: "Invalid Email!!" });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) return res.status(401).send({ msg: "Invalid Password!!" });

  const token = jwt.sign({ email }, process.env.SECRET_KEY);
  res.send({
    token,
    user,
    isLoggedIn: true,
    msg: 'Authorized!!'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

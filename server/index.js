const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

// Check for SECRET_KEY
if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));

// Define the schema and model
const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Authentication Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) return res.status(401).send({ msg: "Access Denied!" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ msg: "Invalid Token!" });
    req.user = user;
    next();
  });
};

// Route to create a new user (Register)
app.post('/register', async (req, res) => {
  try {
    console.log("Request Headers:", req.headers); // Log the request headers for debugging
    console.log("Received data:", req.body);     // Log the received data

    // Check if the email already exists
    const emailExist = await User.exists({ email: req.body.email });
    if (emailExist) {
      return res.status(409).send({ msg: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("Error registering user:", error); // Log detailed error message
    res.status(400).send({ message: 'Error registering user', error });
  }
});

// Route to login a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ msg: "Invalid Email!" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) return res.status(401).send({ msg: "Invalid Password!" });

    // Create a JWT token with a 1-hour expiration time
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Exclude password from the returned user data
    const { password: _, ...userData } = user.toObject();

    res.send({
      token,
      user: userData,
      isLoggedIn: true,
      msg: 'Authorized!',
    });
  } catch (error) {
    console.error("Login error:", error); // Log detailed error message
    res.status(500).send({ msg: 'Login error', error });
  }
});

// Example of a Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  res.send({ msg: 'This is a protected route', user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

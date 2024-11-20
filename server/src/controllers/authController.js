const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modules/user');


// Register User
const registerUser = async (req, res) => {
  try {
    const { email, phoneNumber, password, fullName } = req.body;

    // Check if the email already exists
    const emailExist = await User.exists({ email });
    if (emailExist) {
      return res.status(409).send({ msg: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, phoneNumber, password: hashedPassword, fullName });
    await user.save();

    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).send({ message: 'Error registering user', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ msg: "Invalid Email!" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) return res.status(401).send({ msg: "Invalid Password!" });

    // Create a JWT token
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const { password: _, ...userData } = user.toObject();

    res.send({ token, user: userData, isLoggedIn: true, msg: 'Authorized!' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ msg: 'Login error', error });
  }
};

module.exports = { registerUser, loginUser };

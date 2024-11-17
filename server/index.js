const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { boolean } = require('yup');
require('dotenv').config();

const saltRounds = 10;

// Check for SECRET_KEY
if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
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

//product data and database

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({storage:storage})

//creating upload endpoin for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})

//schema for creatign products
const Product = mongoose.model("Product",{
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  new_price:{
    type:Number,
    required:true
  },
  old_price:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  avilable:{
    type:Boolean,
    default:true
  }
})

//endpoint for the product
app.post('/addproduct',async(req,res)=>{
  const product= new Product({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  })
  console.log(product)
  await product.save()
  res.json({
    success:true,
    name:req.body.name

  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

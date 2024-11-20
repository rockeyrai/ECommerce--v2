const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

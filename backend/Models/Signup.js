const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, //  ensures consistent storage
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Signup", signupSchema);

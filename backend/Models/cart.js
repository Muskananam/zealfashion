const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  productId: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Cart', cartSchema);

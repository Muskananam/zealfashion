const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: String,
  productId: String, // make sure this is String, not ObjectId
  productName: String,
  image: String,
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Cart', cartSchema);

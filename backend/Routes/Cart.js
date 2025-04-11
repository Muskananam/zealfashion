const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');

// Add or Update item in cart
router.post('/', async (req, res) => {
  try {
    let { email, productId, productName, quantity, price, image } = req.body;

    if (!email || !productId || !productName || !quantity || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    email = email.toLowerCase();

    // Check if item already exists in cart
    let existingItem = await Cart.findOne({ email, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Item quantity updated", cartItem: existingItem });
    }

    const cartItem = new Cart({
      email,
      productId,
      productName,
      quantity,
      price,
      image,
    });

    await cartItem.save();
    res.status(201).json({ message: "🛒 Product added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Get all cart items for a user
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const items = await Cart.find({ email });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Delete specific item from cart
router.delete('/:email/:id', async (req, res) => {
  const { email, id } = req.params;

  try {
    const result = await Cart.deleteOne({ email: email.toLowerCase(), _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// Clear cart for a user
router.delete('/clear/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const result = await Cart.deleteMany({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart was already empty or email not found" });
    }

    res.status(200).json({ message: "🗑️ Cart cleared successfully" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;

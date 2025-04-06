require("dotenv").config(); // 🔐 Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Signup = require("./Models/Signup");
const Cart = require("./Models/Cart");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Signup({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });

    console.log("User registered:", newUser.email);
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// ✅ Signin Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "✅ Signin successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

    console.log("User signed in:", user.email);
  } catch (error) {
    console.error("❌ Error during signin:", error);
    res.status(500).json({ error: "Failed to signin" });
  }
});

// ✅ Add or Update Cart Item
app.post("/cart", async (req, res) => {
  try {
    const { email, productId, productName, quantity, price, image } = req.body;

    if (!email || !productId || !productName || !quantity || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let existingItem = await Cart.findOne({ email, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "✅ Item quantity updated", cartItem: existingItem });
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
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// ✅ Get Cart Items by Email
app.get("/cart/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const items = await Cart.find({ email });
    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// ✅ Remove a Cart Item
app.delete("/cart/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    const result = await Cart.findOneAndDelete({
      email,
      $or: [{ productId: id }, { _id: id }],
    });

    if (result) {
      res.json({ message: "🗑️ Item removed from cart" });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (err) {
    console.error("❌ Error removing item from cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// ✅ Clear Cart
app.delete("/cart/clear/:email", async (req, res) => {
  try {
    await Cart.deleteMany({ email: req.params.email });
    res.json({ message: "🧹 Cart cleared" });
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

// ✅ Start the Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
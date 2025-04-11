require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const Signup = require("./Models/Signup");

const app = express();
const port = process.env.PORT || 3000;

// Import modular routes
const orderRoutes = require('./Routes/OrderRoutes');
const cartRoutes = require('./Routes/cart'); // import cart routes

// Middleware
app.use(cors());
app.use(express.json());

// Use modular route files
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes); //  mount cart routes under /api/cart

// ---------------------- AUTH ROUTES ----------------------

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const lowerEmail = email.toLowerCase();
    const existingUser = await Signup.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({ name, email: lowerEmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });

    console.log("User registered:", newUser.email);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Signin Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({
      message: "Signin successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

    console.log("User signed in:", user.email);
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ error: "Failed to signin" });
  }
});

// ---------------------- CONNECT TO MONGODB ----------------------

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// ---------------------- START SERVER ----------------------

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

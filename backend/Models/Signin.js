app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await Signup.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Success response
    res.status(200).json({
      message: "Signin successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

    console.log(" User signed in:", user.email);
  } catch (error) {
    console.error(" Signin error:", error);
    res.status(500).json({ error: "Failed to signin" });
  }
});

app.post("/signin", async (req, res) => {
    const { rollno, password } = req.body;
  
    try {
      const user = await Signup.findOne({ rollno });
  
      if (!user) return res.status(404).send("User not found");
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).send("Invalid password");
  
      res.status(200).json({
        message: "✅ Signin successful",
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      });
  
      console.log("User signed in:", user.email);
    } catch (error) {
      console.error("❌ Error during signin:", error);
      res.status(500).send("Failed to signin");
    }
  });
  
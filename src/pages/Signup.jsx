import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });

      console.log("✅ Signup successful:", response.data);
      alert("Signup successful!");
      navigate("/signin");
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="container my-5">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>

            <div className="text-center mt-3">
              <p>
                Already have an account? <a href="/signin">Sign In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios for backend call
import "./Signin.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });

      // ✅ Save email in localStorage
      localStorage.setItem("userEmail", response.data.user.email);

      console.log("Email:", email, "Password:", password);
      navigate("/");
    } catch (error) {
      console.error("Signin failed:", error.response?.data?.error || error.message);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-page">
      <div className="container my-5">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>

            <div className="text-center mt-3">
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;

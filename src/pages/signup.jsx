import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  const API_URL = process.env.REACT_APP_API_URL;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid Email";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch(`${API_URL}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token for later use
        localStorage.setItem("token", result.token);
        alert(result.message);
        console.log(result.user);
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
}

  };

  return (
    <div className="auth-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <button type="submit">Sign Up</button>
          <p className="login-link">Already have an account? <Link to="/login">Click here</Link></p>
        </form>
      </div>
      <footer className="auth-footer">
        <p>© 2025 Fashion Store</p>
      </footer>
    </div>
  );
};

export default Signup;
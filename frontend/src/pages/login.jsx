import React, { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert(data.message);
        navigate('/');
        window.location.reload();
      } else {
        alert(data.message);
      }
      
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Login</button>
          <p className="signup-link">
            Don’t have an account? <Link style = {{textDecoration: 'none'}} to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
      <footer className="auth-footer">
        <p>© 2025 Fashion Store</p>
      </footer>
    </div>
  );
};

export default Login;

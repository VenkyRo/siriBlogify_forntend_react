import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavScrollExample from "../NavScrollExample";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

//const API_URL ="http://localhost:4000"; // Update this with your backend URL

import {API_URL} from "../../data/ApiPath"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display errors
  const [loading, setLoading] = useState(false); // To show loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("email",email);

        alert("Login successful");
        navigate("/"); // Redirect to the blogs page after successful login
        window.location.reload();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <NavScrollExample />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

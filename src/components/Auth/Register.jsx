import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import NavScrollExample from "../NavScrollExample";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

//const API_URL = "http://localhost:4000"; // Update with your correct backend API URL
import { API_URL } from "../../data/ApiPath";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const [loading, setLoading] = useState(false); // To manage loading state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      

      if (response.ok) {
        console.log(data);
        setUsername(""); // Clear input fields
        setEmail("");
        setPassword("");
        alert("Registration successful!");
        navigate("/login"); // Navigate to login page after successful registration
        
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
                <h3>Register</h3>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
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
                    {loading ? "Registering..." : "Register"}
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

export default Register;

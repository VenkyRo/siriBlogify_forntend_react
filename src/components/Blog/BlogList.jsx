import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import NavScrollExample from "../NavScrollExample";

import { API_URL } from "../../data/ApiPath";
//const API_URL = "http://localhost:4000";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/blogs/all-blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
    
      <div className="container mt-5">
        <h2 className="text-center mb-4">All Blogs</h2>

        {/* Show loading indicator */}
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Show error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Render blog list */}
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="col-md-4 mb-4" key={blog._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={blog.image}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <Link to={`/blog/${blog._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No blogs available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;

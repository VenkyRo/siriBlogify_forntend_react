import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import NavScrollExample from "../NavScrollExample";
import { API_URL } from "../../data/ApiPath";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/blogs/${blogId}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  return (
    <>
      {/* Navigation Bar */}
      <NavScrollExample />

      {/* Main Blog Content */}
      <div className="container mt-5">
        {blog ? (
          <div className="card shadow-sm">
            <div className="card-body">
              {/* Blog Title */}
              <h2 className="card-title text-center text-primary mb-4">
                {blog.title}
              </h2>

              {/* Blog Image */}
              <div className="text-center">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="img-fluid rounded mb-4"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    border: "1px solid #ddd"
                  }}
                />
              </div>

              {/* Blog Content */}
              <div className="blog-content">
                <p
                  className="card-text"
                  style={{
                    textAlign: "justify",
                    lineHeight: "1.8",
                    fontSize: "1.1rem",
                    color: "#333"
                  }}
                >
                  {blog.content}
                </p>
              </div>

              {/* Comment Section */}
              <hr className="my-4" />
              <h4 className="mb-3 text-secondary"></h4>
              <CommentSection blogId={blogId} />
            </div>
          </div>
        ) : (
          // Loading Spinner
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading blog details...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;

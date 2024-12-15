import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavScrollExample from "../NavScrollExample";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import { API_URL } from "../../data/ApiPath";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage

      if (!token) {
        alert("You need to log in to add a blog");
        navigate("/login");
        return;
      }

      // Make API request to add a blog
      const response = await fetch(`${API_URL}/api/blogs/add-blog`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}` // Send token in the Authorization header
          // FormData automatically sets Content-Type to multipart/form-data
        }
      });

      // Log the response to check what the server is sending
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add blog");
      }

      alert("Blog added successfully");
      navigate("/"); // Navigate to the home page after successful submission
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog. Please try again.");
    }
  };

  return (
    <>
      <NavScrollExample />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h3>Add Blog</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddBlog}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Blog Content
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      rows="5"
                      placeholder="Enter blog content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Add Blog
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

export default AddBlog;

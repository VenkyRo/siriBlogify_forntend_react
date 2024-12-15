import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { API_URL } from "../../data/ApiPath";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/comments/${blogId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URL}/api/comments/${blogId}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      {/* Comments Header */}
      <h3 className="mb-4 text-primary">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="commentTextarea"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ height: "100px" }}
            required
          />
          <label htmlFor="commentTextarea">Add a comment</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body">
                <p className="card-text">{comment.text}</p>
                <p className="card-text">{comment.createdAt}</p>
               
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

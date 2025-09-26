import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

const CommentList = ({ comments, postId, onCommentAdded }) => {
  
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // check if user is logged in

  const handleComment = async () => {
    if (!commentBody.trim()) return; 
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/comment/${postId}`,
        { post_id: postId, comment: commentBody },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear input
      setCommentBody("");

      // Optional: callback to parent to refresh comments
      if (onCommentAdded) onCommentAdded(response.data);

    } catch (err) {
      console.error(err);
      setError("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {/* List of comments */}
      {(!comments || comments.length === 0) ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <strong>{comment.users?.name || "Anonymous"}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      )}

      {/* Comment form, only show if logged in */}
      {token && (
        <div className="mt-3">
          <textarea
            className="form-control mb-2"
            placeholder="Write a comment..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            rows={2}
          />
          <button
            className="btn btn-primary"
            onClick={handleComment}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              "Comment"
            )}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default CommentList;

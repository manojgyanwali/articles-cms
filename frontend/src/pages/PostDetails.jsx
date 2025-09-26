import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/CommentList";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:8081/api";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(false);

  // State to toggle comment visibility
  const [showComments, setShowComments] = useState(false);

  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/post/${postId}`);
      setPost(res.data);
      setLikeCount(res.data.data.likes_count || 0);
      setUserLike(res.data.user_like);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (!token) {
      alert("You must be logged in to like posts!");
      return;
    }

    const prevUserLike = userLike;
    const prevLikeCount = likeCount;

    if (userLike) {
      setUserLike(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setUserLike(true);
      setLikeCount((prev) => prev + 1);
    }

    try {
      await axios.get(`${API_URL}/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to like/unlike post.");
      setUserLike(prevUserLike);
      setLikeCount(prevLikeCount);
    }
  };

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container-fluid mt-5">
      <NavBar />

      {/* Error message */}
      {error && <p className="text-center mt-5 text-danger">{error}</p>}

      {/* Post content */}
      <h1 className="mb-4">
        {loading ? "Loading title..." : post?.data?.title || "No title"}
      </h1>

      {post?.data?.image && (
        <img
          src={`http://localhost:8081/storage/${post.data.image}`}
          className="img-fluid mb-4"
          alt={post.data.title}
        />
      )}

      <p>{loading ? "Loading content..." : post?.data?.body || "No content"}</p>

      {/* Like button */}
      <div className="mb-3" style={{ textAlign: "left" }}>
        <button
          className={`btn ${userLike ? "btn-primary text-white" : "btn-outline-primary"}`}
          onClick={handleLikeToggle}
          disabled={loading}
        >
          {userLike ? "Liked" : "Like"}: {likeCount}
        </button>
      </div>

      {/* Comments section toggle */}
      <h3 className="mt-5">
        <span
          style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments ? "Hide Comments" : "View Comments"}
        </span>
      </h3>

     
      {showComments && (
        <CommentList
          comments={post?.data?.comments || []}
          postId={postId}
          onCommentAdded={fetchPost}
        />
      )}
    </div>
  );
};

export default PostDetails;

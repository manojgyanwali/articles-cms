
import axios from "axios";

// Set your backend API base URL
const API_URL = "http://localhost:8081/api"; // change if your Laravel runs on different port

// Fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/post`);
     console.log("API response:", response.data);

     return response.data;

};

// Fetch single post by ID
export const fetchPostById = async (id) => {
  const response = await axios.get(`${API_URL}/post/${id}`);
  console.log(response.data);
  return response.data;
};

// Fetch comments for a post
export const fetchComments = async (postId) => {
  const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};


export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  
  return response.data;
};

// Add a comment to a post
export const addComment = async (postId, commentData, token = null) => {
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await axios.post(
    `${API_URL}/posts/${postId}/comments`,
    commentData,
    { headers }
  );
  return response.data;
};

// Like a post
export const likePost = async (postId, token) => {
  const response = await axios.post(
    `${API_URL}/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Unlike a post
export const unlikePost = async (postId, token) => {
  const response = await axios.post(
    `${API_URL}/posts/${postId}/unlike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

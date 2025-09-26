import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false); // true when fetching

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  // fetch posts function
  const fetchPosts = async (page = 1) => {
    setLoadingPage(true); // start loading
    try {
      const res = await axios.get(`http://localhost:8081/api/post?page=${page}`);
      setPosts(res.data.data.data);
      setFilteredPosts(res.data.data.data);

      setPagination({
        current_page: res.data.data.current_page,
        last_page: res.data.data.last_page,
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoadingPage(false); // stop loading
    }
  };

  useEffect(() => {
    fetchPosts(1); // load first page
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-5">
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center">{loadingPage ? "Loading..." : "No posts available."}</p>
        ) : (
          <div className="row">
            {filteredPosts.map((post) => (
              <div key={post.id} className="col-md-3 mb-4">
                <Link to={`/post/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4 position-relative">
          <nav className={loadingPage ? "pagination-blur" : ""}>
            <ul className="pagination">
              <li className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => fetchPosts(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1 || loadingPage}
                >
                  Previous
                </button>
              </li>

              {[...Array(pagination.last_page)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      pagination.current_page === pageNum ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => fetchPosts(pageNum)}
                      disabled={loadingPage}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}

              <li
                className={`page-item ${
                  pagination.current_page === pagination.last_page ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchPosts(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page || loadingPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* Spinner centered over pagination */}
          {loadingPage && (
            <div className="spinner-overlay position-absolute top-50 start-50 translate-middle">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


import CommentList from './CommentList';

const PostCard = ({ post }) => {
  return (
    <div className="card mb-4 shadow-sm"
      style={{
        height: "350px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      {/* Post Title */}
      <div className="card-header">
        <h4 className="mb-0">{post.title}</h4>
      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={`http://localhost:8081/storage/${post.image}`} // adjust backend URL if needed
          className="card-img-top"
          alt={post.title}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
      
    </div>
  );
};

export default PostCard;

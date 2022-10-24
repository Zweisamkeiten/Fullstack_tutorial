import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  const [isDetial, setIsDetial] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLikes = async (blogid) => {
    try {
      const newlikes = { likes: likes + 1 };
      const response = await blogService.addLikes(blogid, newlikes);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const details = () => {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setIsDetial(!isDetial)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {`likes ${likes}`}
          <button
            onClick={() => {
              handleLikes(blog.id);
              setLikes(likes + 1);
            }}
          >
            like
          </button>{" "}
        </div>
        <div>{blog.author}</div>
      </div>
    );
  };

  return (
    <div>
      {isDetial ? (
        details()
      ) : (
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setIsDetial(!isDetial)}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;

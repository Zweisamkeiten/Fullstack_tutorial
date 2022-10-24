import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  const [isDetial, setIsDetial] = useState(false);

  const details = () => {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setIsDetial(!isDetial)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes}`}
          <button onClick={() => {}}>like</button>{" "}
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

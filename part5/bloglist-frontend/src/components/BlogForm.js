import { useState } from "react";

const BlogForm = ({ createNewBlog }) => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [url, seturl] = useState("");

  const handleCreateNew = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      url: url,
      author: author,
    };

    createNewBlog(blogObject);

    settitle("");
    setauthor("");
    seturl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => settitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setauthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => seturl(target.value)}
          />
        </div>
        <button type="onSubmit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

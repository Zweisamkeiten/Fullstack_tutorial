const BlogForm = ({
  handleCreateNew,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
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
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="onSubmit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

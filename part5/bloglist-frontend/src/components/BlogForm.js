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
        <input type="text" name="url" value={url} onChange={handleUrlChange} />
      </div>
      <button type="onSubmit">create</button>
    </form>
  );
};

export default BlogForm;

// vim: set ft=javascriptreact :
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogServices from "./services/blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(null);
  const [islogged, setislogged] = useState(false);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [url, seturl] = useState("");
  const [message, setmessage] = useState(null);
  const [notifyStatus, setnotifyStatus] = useState("success");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setuser(user);
      blogService.setToken(user.token);
      getAllBlogs();
    }
  }, [islogged]);

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      setuser(user);
      setusername("");
      setpassword("");
      setislogged(!islogged);
    } catch (execption) {
      setnotifyStatus("error");
      setmessage("wrong username or password");
      setTimeout(() => {
        setmessage(null);
      }, 5000);
    }
  };

  const handleCreateNew = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title: title,
        url: url,
        author: author,
      };

      const response = await blogServices.create(blogObject);
      setBlogs(blogs.concat(response));
      settitle("");
      setauthor("");
      seturl("");
      setnotifyStatus("success");
      setmessage(`a new blog ${response.title} by ${response.author}`);
      setTimeout(() => {
        setmessage(null);
      }, 5000);
    } catch (execption) {
      setnotifyStatus("error");
      setmessage("add a new blog failed");
      setTimeout(() => {
        setmessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} notifyStatus={notifyStatus} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setusername(target.value)}
          handlePasswordChange={({ target }) => setpassword(target.value)}
        />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogListUser");
                setuser(null);
                setislogged(!islogged);
              }}
            >
              logout
            </button>
          </div>
          <br />
          <Togglable buttonLabel="new note">
            <BlogForm
              handleCreateNew={handleCreateNew}
              title={title}
              handleTitleChange={({ target }) => settitle(target.value)}
              author={author}
              handleAuthorChange={({ target }) => setauthor(target.value)}
              url={url}
              handleUrlChange={({ target }) => seturl(target.value)}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

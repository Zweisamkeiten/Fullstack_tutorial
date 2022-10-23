// vim: set ft=javascriptreact :
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogServices from "./services/blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

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

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} notifyStatus={notifyStatus} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setusername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setpassword(target.value)}
            />
          </div>
          <button type="onSubmit">login</button>
        </form>
      </div>
    );
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

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <h2>blogs</h2>
      <Notification message={message} notifyStatus={notifyStatus} />
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

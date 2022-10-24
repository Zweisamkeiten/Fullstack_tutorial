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
  const [user, setuser] = useState(null);
  const [islogged, setislogged] = useState(false);
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

  const handleLogin = async (upKVP) => {
    try {
      const user = await loginService.login(upKVP);

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      setuser(user);
      setislogged(!islogged);
    } catch (execption) {
      setnotifyStatus("error");
      setmessage("wrong username or password");
      setTimeout(() => {
        setmessage(null);
      }, 5000);
    }
  };

  const handleCreateNew = async (blogObject) => {
    try {
      const response = await blogServices.create(blogObject);
      setBlogs(blogs.concat(response));
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
        <LoginForm createUPKVP={handleLogin} />
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
          <Togglable buttonLabel="create new blog">
            <BlogForm createNewBlog={handleCreateNew} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;

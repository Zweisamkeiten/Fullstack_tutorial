// vim: set ft=javascriptreact :
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(null);
  const [islogged, setislogged] = useState(false);

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
    console.log(blogs);
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
    } catch (execption) {}
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
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

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <h2>blogs</h2>
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

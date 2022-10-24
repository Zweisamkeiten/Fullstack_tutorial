import { useState } from "react";

const LoginForm = ({ createUPKVP }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const upKVP = { username, password };

    createUPKVP(upKVP);

    setusername("");
    setpassword("");
  };

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

export default LoginForm;

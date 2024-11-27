import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, token, roles} = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    if (token && roles) {
      nav("/admin");
    }
  }, [token, roles, nav]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(username, password);
  };
  return (
    <div className="flex flex-col w-full items-center gap-2 mt-36">
      <strong className="text-3xl">LOGIN</strong>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-4 w-96"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-4 w-96"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex flex-row">
          <button className="bg-blue-500 p-4 rounded-lg w-96" type="submit">
            Login
          </button>
        </div>
      </form>
      <Link
        to={"/register"}
        className="bg-yellow-500 p-4 rounded-lg w-96 text-center"
      >
        Register
      </Link>
    </div>
  );
}

export default Login;

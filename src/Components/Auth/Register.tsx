import React, { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";

function Register() {
  const { registerUser } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roles = ["USER"];
    registerUser(username, password, firstName, lastName, dob, roles);
  };
  return (
    <div className="flex flex-col w-full items-center gap-2 mt-11">
      <strong className="text-3xl">REGISTER</strong>
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
        <input
          type="text"
          placeholder="First name"
          className="border p-4 w-96"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="border p-4 w-96"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of birth"
          className="border p-4 w-96"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <div className="flex flex-row">
          <button className="bg-blue-500 p-4 rounded-lg w-96" type="submit">
            Register
          </button>
        </div>
      </form>
      <Link
        to={"/"}
        className="bg-yellow-500 p-4 rounded-lg w-96 text-center"
      >
        Back
      </Link>
    </div>
  );
}

export default Register;

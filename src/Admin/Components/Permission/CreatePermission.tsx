import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createPermission } from '../../../Services/PermissionService';
import { toast } from 'react-toastify';

function CreatePermission() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDesciption] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPermission(name, description)
      .then((res) => {
        if (res) {
          toast.success("Permission created successfully!");
          navigate("/permission");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  return (
    <div className="flex flex-col w-full items-center gap-2 mt-36">
      <strong className="text-3xl">CREATE ROLE</strong>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="name"
          className="border p-4 w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="description"
          className="border p-4 w-96"
          value={description}
          onChange={(e) => setDesciption(e.target.value)}
          required
        />
        <div className="flex flex-row">
          <button className="bg-blue-500 p-4 rounded-lg w-96" type="submit">
            Submit
          </button>
        </div>
      </form>
      <Link
        to={"/admin"}
        className="bg-yellow-500 p-4 rounded-lg w-96 text-center"
      >
        Back
      </Link>
    </div>
  );
}

export default CreatePermission
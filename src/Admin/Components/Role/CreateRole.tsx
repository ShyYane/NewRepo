import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRole } from "../../../Services/RoleService";
import { toast } from "react-toastify";
import { getAllPermissions } from "../../../Services/PermissionService";
import { Permission } from "../../../modal/PermissionModal";

function CreateRole() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDesciption] = useState<string>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getAllPermissions();
        setPermissions(response);
      } catch (e) {
        console.error("Error fetching permissions:", e);
      }
    };
    fetchPermissions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createRole(name, description, selectedPermissions)
      .then((res) => {
        if (res) {
          toast.success("Role created successfully!");
          navigate("/admin");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };
  const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPermissionName = e.target.value;
    if (
      selectedPermissionName &&
      !selectedPermissions.includes(selectedPermissionName)
    ) {
      setSelectedPermissions([...selectedPermissions, selectedPermissionName]);
    }
  };
  const handleRemovePermission = (permissionname: string) => {
    setSelectedPermissions((prevPermission) =>
      prevPermission.filter((permission) => permission !== permissionname)
    );
  };
  console.log(selectedPermissions);

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

        <select
          className="border p-4 w-96"
          onChange={handlePermissionChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select a permission
          </option>
          {permissions.map((permission) => (
            <option key={permission.name} value={permission.name}>
              {permission.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2 mt-4">
          <strong>Selected Permissions:</strong>
          <ul>
            {selectedPermissions.map((permissionName) => {
              const permission = permissions.find(
                (p) => p.name === permissionName
              );
              return (
                <li key={permissionName}>
                  {permission ? permission.name : "Unknown Permission"}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemovePermission(permissionName)}
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
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

export default CreateRole;

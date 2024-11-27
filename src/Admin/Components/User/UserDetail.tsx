import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../Services/UserService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Role } from "../../../modal/RoleModal";
import { getAllRole } from "../../../Services/RoleService";

function UserDetail() {
  const navigate = useNavigate();
  const { iduser } = useParams<string>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setdob] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);

  const [roleFromApi, setRoleFromApi] = useState<Role[]>([]);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllRole();
        setRoleFromApi(response);
      } catch (e) {
        console.error("Error fetching user roles:", e);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!iduser) return;
      try {
        const response = await getUserById(iduser);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setdob(response.dob);
        const roleNames = response.roles.map((role: Role) => role.name);
      setRoles(roleNames);
      } catch (e) {
        console.error("Error fetching user roles:", e);
      }
    };
    fetchUser();
  }, [iduser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(firstName, lastName, dob, roles);
    if (!iduser) return;
    await updateUser(iduser, firstName, lastName, dob, roles)
      .then((res) => {
        if (res) {
          toast.success("Permission created successfully!");
          navigate("/user");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleName = e.target.value;
    if (selectedRoleName && !roles.includes(selectedRoleName)) {
      setRoles([...roles, selectedRoleName]);
    }
  };
  const handleRemoveRole = (rolename: string) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role !== rolename));
  };

  return (
    <div className="flex flex-col w-full items-center gap-2 mt-36">
      <strong className="text-3xl">Detail</strong>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="border p-4 w-96"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
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
          onChange={(e) => setdob(e.target.value)}
          required
        />
        <select
          className="border p-4 w-96"
          onChange={handleRoleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select a permission
          </option>
          {roleFromApi.map((role) => (
            <option key={role.name} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2 mt-4">
          <strong>Selected Roles:</strong>
          <ul>
            {roles.map((rolename) => {
              const role = roleFromApi.find((p) => p.name === rolename);
              return (
                <li key={rolename} className="flex items-center">
                  <span className="mr-2">
                    {role ? role.name : "Unknown Permission"}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveRole(rolename)}
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

export default UserDetail;

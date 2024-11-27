import React, { useEffect, useState } from "react";
import { getAllRole } from "../../../Services/RoleService";
import { Role } from "../../../modal/RoleModal";
import { Link } from "react-router-dom";

function RoleTable() {
  const [role, setRole] = useState<Role[]>([]);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllRole();
        setRole(response);
      } catch (e) {
        console.error("Error fetching user roles:", e);
      }
    };
    fetchRole();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-6/12 mx-auto mt-4">
        <Link to={"/createrole"} className="bg-blue-500 rounded-lg p-2">
          Create role
        </Link>
      </div>
      <strong className="text-center mt-6">ROLE TABLE</strong>
      <div className="mt-4">
        <table className="border w-6/12 mx-auto">
          <thead className="bg-slate-500">
            <tr>
              <td className="text-center">Name</td>
              <td className="text-center">Description</td>
            </tr>
          </thead>
          <tbody>
            {role.map((items, index) => (
              <tr key={index}>
                <td className="text-center">{items.name}</td>
                <td className="text-center">{items.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoleTable;

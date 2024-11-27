import { useEffect, useState } from "react";
import { User } from "../../../modal/UserModal";
import { getAllUser } from "../../../Services/UserService";
import { Link } from "react-router-dom";

function UserTable() {
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAllUser();
        setUser(response);
      } catch (e) {
        console.error("Error fetching user roles:", e);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <strong className="text-center mt-6">USER TABLE</strong>

      <div className="mt-4">
        <table className="border w-8/12 mx-auto">
          <thead className="bg-slate-500">
            <tr>
              <td className="text-center">ID</td>
              <td className="text-center">Username</td>
              <td className="text-center">First name</td>
              <td className="text-center">Last name</td>
              <td className="text-center">Date of birth</td>
              <td className="text-center"></td>
            </tr>
          </thead>
          <tbody>
            {user.map((items, index) => (
              <tr key={index}>
                <td className="text-center">{items.id}</td>
                <td className="text-center">{items.username}</td>
                <td className="text-center">{items.firstName}</td>
                <td className="text-center">{items.lastName}</td>
                <td className="text-center">{items.dob}</td>
                <td>
                  <Link
                    to={`userdetail/${items.id}`}
                    className="text-center bg-gray-600"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;

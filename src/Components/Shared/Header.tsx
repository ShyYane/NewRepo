import React from "react";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";

function Header() {
  const { logout, token } = useAuth();
  return (
    <div className="bg-red-500 p-4 flex flex-row w-full">
      <span>Header</span>
      <div className="flex flex-row gap-4 ml-20">
        <Link to={"/admin"} className="bg-gray-500 p-2 rounded-lg">
          ROLE
        </Link>
        <Link to={"/user"} className="bg-gray-500 p-2 rounded-lg">
          USER
        </Link>
        <Link to={"/permission"} className="bg-gray-500 p-2 rounded-lg">
          PERMISSION
        </Link>
      </div>

      {token && (
        <button onClick={logout} className="ml-auto">
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;

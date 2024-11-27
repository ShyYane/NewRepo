import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRoleFromToken,
  loginApi,
  registerApi,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import { Role } from "../modal/RoleModal";

type UserContextType = {
  token: string | null;
  registerUser: (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    roles: string[]
  ) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  roles: string[];
};  
type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const response = await getRoleFromToken();
          const userRoles = response.result.roles.map(
            (role: Role) => role.name
          );
          setRoles(userRoles);
        }
      } catch (e) {
        console.error("Error fetching user roles:", e);
      } finally {
        setIsReady(true);
      }
    };
    fetchUser();
  }, [token]);

  const registerUser = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    roles: string[]
  ) => {
    await registerApi(username, password, firstName, lastName, dob, roles)
      .then((res) => {
        if (res) {
          toast.success("Login Success!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginApi(username, password)
      .then(async (res) => {
        if (res) {
          const token = res?.result.token;
          localStorage.setItem("token", token);
          setToken(token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          const response = await getRoleFromToken();
          const userRoles = response.result.roles.map(
            (role: Role) => role.name
          );
          setRoles(userRoles);

          toast.success("Login Success!");
          if (userRoles.includes("ADMIN")) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setRoles([]);
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{ loginUser, token, logout, registerUser, roles }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);

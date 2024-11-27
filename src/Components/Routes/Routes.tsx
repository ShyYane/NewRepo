import { createBrowserRouter} from "react-router-dom";
import App from "../../App";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage";
import RegisterPage from "../../Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

import RolePage from "../../Admin/Pages/RolePage";
import CreateRolePage from "../../Admin/Pages/CreateRolePage";
import PermissionPage from "../../Admin/Pages/PermissionPage";
import CreatePermissionPage from "../../Admin/Pages/CreatePermissionPage";
import UserPage from "../../Admin/Pages/UserPage";
import UserDetail from "../../Admin/Components/User/UserDetail";

const adminRoutes = [
  { path: "admin", element: <RolePage /> },
  { path: "createrole", element: <CreateRolePage /> },
  { path: "permission", element: <PermissionPage /> },
  { path: "createpermission", element: <CreatePermissionPage /> },
  { path: "user", element: <UserPage /> },
  { path: "user/userdetail/:iduser", element: <UserDetail /> },
].map((route) => ({
  ...route,
  element: (
    <ProtectedRoute allowedRoles={["ADMIN"]}>{route.element}</ProtectedRoute>
  ),
}));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "home", element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      ...adminRoutes,
    ],
    
  },
]);

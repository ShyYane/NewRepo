import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = React.PropsWithChildren<{
  allowedRoles: string[];
}>
const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { token, roles } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (roles.length === 0) {
    return <div>Loading...</div>;
  }
  
  const hasAccess = roles.some((role) => allowedRoles.includes(role.trim()));
  if (!hasAccess) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ userRole, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace={true} />;
  }

  if (userRole && userRole.length > 0 && !userRole.includes(user.role)) {
    return <Navigate to="/forbidden" replace={true} />;
  }

  return children;
};

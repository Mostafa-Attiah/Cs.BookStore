import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // role check (admin only)
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

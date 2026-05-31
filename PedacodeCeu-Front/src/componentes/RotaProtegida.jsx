import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RotaProtegida({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

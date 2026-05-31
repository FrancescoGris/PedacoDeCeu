import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaAdmin({ children }) {
  const { token, isAdmin } = useAuth();
  if (!token) return <Navigate to="/adm/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
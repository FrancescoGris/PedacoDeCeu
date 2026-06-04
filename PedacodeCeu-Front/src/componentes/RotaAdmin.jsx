import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaAdmin({ children }) {
  const { token, isAdmin, carregando } = useAuth();
  if (carregando) return null;
  if (!token) return <Navigate to="/adm/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
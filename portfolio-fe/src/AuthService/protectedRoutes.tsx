import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const GuestRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

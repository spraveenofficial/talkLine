import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
};

export const GuestRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/" />
  );
};

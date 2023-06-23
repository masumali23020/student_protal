import { Outlet, Navigate } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const AdminPublicRoutes = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  } else if (isLoggedIn && user?.role === "student") {
    return <Navigate to="/course-player" />;
  } else return <Navigate to="/admin/dashboard" />;
};

export default AdminPublicRoutes;

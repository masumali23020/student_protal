import { useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const AdminPrivateRoutes = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && user?.role === "admin" && pathname !== "/admin") {
    return <Outlet />;
  } else if (isLoggedIn && user?.role === "student")
    return <Navigate to="/course-player" />;
  else {
    return <Navigate to="/admin" />;
  }
};

export default AdminPrivateRoutes;

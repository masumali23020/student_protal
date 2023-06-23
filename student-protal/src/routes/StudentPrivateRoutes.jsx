import { useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const StudentPrivateRoutes = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && user?.role === "student" && pathname !== "/") {
    return <Outlet />;
  } else if (isLoggedIn && user?.role === "admin")
    return <Navigate to="/admin/dashboard" />;
  else {
    return <Navigate to="/" />;
  }
};

export default StudentPrivateRoutes;

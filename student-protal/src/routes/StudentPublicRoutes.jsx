import { Navigate, Outlet } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const StudentPublicRoutes = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  } else if (isLoggedIn && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <Navigate to="/course-player/1" />;
  }
};

export default StudentPublicRoutes;

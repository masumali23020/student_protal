import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// images.
import learningPortal from "../../../assets/images/learningportal.svg";

// RTK actions.
import { userLoggedOut } from "../../../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    navigate("/admin");
  };

  return (
    <nav className="sticky top-0 shadow-md bg-slate-900">
      <div className="flex justify-between px-5 py-3 mx-auto max-w-7xl">
        <Link to="/admin/dashboard">
          <img className="h-10" src={learningPortal} />
        </Link>
        <div className="flex items-center gap-3">
          <h2 className="font-bold">Admin</h2>
          <button
            className="flex items-center gap-2 px-4 py-1 text-sm font-medium transition-all bg-red-600 rounded-full hover:bg-red-700"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
